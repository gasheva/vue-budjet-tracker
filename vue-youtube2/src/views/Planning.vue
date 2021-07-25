<template>
  <div>
    <div class="app-main-layout">

      <main class="app-content">
        <div class="app-page">
          <div>
            <div class="page-title">
              <h3>Планирование</h3>
              <h4>{{info.bill | currency('RUB')}}</h4>
            </div>

            <loader v-if="loading"/>
            <p v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую</router-link></p>
            <section v-else>
              <div v-for="cat in categories"
              :key="cat.id">
                <p>
                  <strong>{{cat.title}}</strong>
                  {{cat.spend | currency}} из {{cat.limit|currency}}
                </p>
                <div class="progress" v-tooltip="cat.tooltip">
                  <div class="determinate" :class="[cat.progressColor]" :style="{width: cat.progressPercent+'%'}"></div>
                </div>
              </div>
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
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
export default {
  components: { Loader },
  data(){
    return{
      loading: true,
      categories: []
    }
  },
  async mounted(){
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories'); 

    this.categories = categories.map(cat=>{
        const spend = records.length ? records.reduce((sum,x)=> 
        x.catId==cat.id && x.type=='outcome'
        ?sum + (+x.amount)
        :sum, 0)
        : 0;
        const percent = 100 * spend / cat.limit;
        const progressPercent = percent>100?100:percent;
        const progressColor = percent<60?'green':percent<100?'yellow':'red';
        const tooltipValue = cat.limit - spend;
        const tooltip = `${tooltipValue<0? 'Превышение на ':'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`;
        return {...cat, progressPercent, progressColor, spend, tooltip};
    });


    this.loading = false;
  },
  computed:{
    ...mapGetters(['info'])
  }
}
</script>