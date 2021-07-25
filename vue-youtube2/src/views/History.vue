<template>
  <div>
    <div class="app-main-layout">
      <main class="app-content">
        <div class="app-page">
          <div>
            <div class="page-title">
              <h3>История записей</h3>
            </div>

            <div class="history-chart">
              <canvas></canvas>
            </div>

            <loader v-if="loading"/>
            <p v-else-if="!records.length"></p>
            <section v-else>
              <history-table :records="items"/>
              <paginate
              v-model="page"
              :page-count="pageCount"
              :click-handler="pageChangeHandler"
              :prev-text="'Назад'"
              :next-text="'Вперед'"
              :container-class="'pagination'"
              :page-class="'waves-effect'"/>
            </section>
          </div>
        </div>
      </main>

      <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue';
import HistoryTable from '../components/HistoryTable.vue'
import pagenationMixin from '../mixins/paginate.mixins'
export default {
  name: 'history',
  components:{
    HistoryTable,
    Loader
  },
  mixins:[pagenationMixin],
  data(){
    return{
      loading: true,
      records: []
    }
  },
  async mounted(){
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setup(categories);
    this.loading=false;
  },
  methods:{
    setup(categories){    
    this.setupPagination(this.records.map(record=>{return{
      ...record, 
      categoryName: categories.find(c=>c.id==record.catId).title,
      typeClass: record.type==='income'? 'green': 'red',
      typeText: record.type==='income'? 'Доход': 'Расход',
      }}));
    }
  }
}
</script>