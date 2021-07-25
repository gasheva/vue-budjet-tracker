<template>
    <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <loader v-if="loading"></loader>
    <div v-else class="row">
      <CategoryCreate @created="addNewCategory"/>
      <!-- Добавляем ключ key для динамического обновления формы -->
      <CategoryEdit
      v-if="categories.length"
      :categories="categories"
      :key="categories.length + updateCount"
      @updated="updateCategory"/>
      <p v-else class="center">Категорий нет</p>
      
    </div>
  </section>
</div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'
export default {
    name:'Categories',
    components:{CategoryCreate, CategoryEdit, Loader},
    data(){
      return{
        categories:[],
        loading: true,
        updateCount: 0
      }
    },
    async mounted(){
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    },
    methods:{
      addNewCategory(category){
        console.log('[x]addNewCategory');
        this.categories.push(category);
      },
      updateCategory(category){
        const idx = this.categories.findIndex(c=>c.id=category.id);
        this.categories[idx].title = category.title;
        this.categories[idx].limit = category.limit;
        this.updateCount++;   // изменяем переменную, кот отслеживается компонентом для его обновления
      }
    }

}
</script>