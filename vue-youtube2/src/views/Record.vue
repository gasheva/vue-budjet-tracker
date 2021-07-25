<template>
  <div>
    <div class="app-main-layout">
      <main class="app-content">
        <div class="app-page">
          <div>
            <div class="page-title">
              <h3>Новая запись</h3>
            </div>
            <loader v-if="loading"/>
            <p v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую</router-link></p>
            <form v-else class="form" @submit.prevent="submitHandler">
              <div class="input-field">
                <select ref="select" v-model="selected">
                  <option v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id">
                  {{cat.title}}
                  </option>
                </select>
                <label>Выберите категорию</label>
              </div>

              <p>
                <label>
                  <input
                    class="with-gap"
                    name="type"
                    type="radio"
                    value="income"
                    v-model="type"  
                  />
                  <span>Доход</span>
                </label>
              </p>

              <p>
                <label>
                  <input
                    class="with-gap"
                    name="type"
                    type="radio"
                    value="outcome"
                    v-model="type"
                  />
                  <span>Расход</span>
                </label>
              </p>

              <div class="input-field">
                <input id="amount" type="number" v-model.number="amount"
                :class="{invalid: $v.amount.$error}"/>
                <label for="amount">Сумма</label>
                <span class="helper-text invalid" 
                v-if="$v.amount.$dirty && !$v.amount.minValue">
                Количество должно быть больше {{$v.amount.$params.minValue.min}}
                </span>
              </div>

              <div class="input-field">
                <input id="description" type="text" v-model.trim="description"
                :class="{invalid: $v.description.$error}"/>
                <label for="description">Описание</label>
                <span class="helper-text invalid"
                v-if="$v.description.$dirty && !$v.description.required">
                  Введите описание
                  </span>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
              </button>
            </form>
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
import M from 'materialize-css'
import Loader from '../components/app/Loader.vue';
import { minValue, required } from "vuelidate/lib/validators";
import {mapGetters} from 'vuex'
export default {
  components: { Loader },
  name: 'Record',
  data(){
    return{
      select: null,
      loading: true,
      categories: [],
      selected: null,
      type:'outcome',
      amount: 1,
      description: ''
    }
  },
  validations: {
    description: { required },
    amount: { minValue: minValue(1) },
  },
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;   
    if (this.categories.length>0)
      this.selected=this.categories[0].id;

    // обязательно после loading
    // используем setTimiout, чтобы дать время для иницииализации
    setTimeout(()=>{
      this.select = M.FormSelect.init(this.$refs.select);     
      M.updateTextFields();
    }, 1);
  },
  beforeDestroy(){
    if(this.select && this.select.destroy)
        this.select.destroy();
  },
  computed:{
    ...mapGetters(['info']),
    canCreateRecord(){
      if(this.type==='income'){
        return true;
      }
      return this.info.bill>=this.amount;
    }
  },
  methods:{
    async submitHandler(){
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      if(this.canCreateRecord){
        try{
          await this.$store.dispatch('createRecord',{
            catId: this.selected,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          const bill = this.type == 'income'
          ?this.info.bill + this.amount
          :this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill});
          this.$message('Запись успешно обновлена');
          this.$v.$reset();
          this.amount=1;
          this.description='';
          }catch(e){
            console.log(e);
          }
      }else{
        this.$message(`Недостаточно средств на счете ${this.amount-this.info.bill}`);
      }
    }
  }

}
</script>