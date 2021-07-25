<template>
<div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Создать</h4>
          </div>

          <form @submit.prevent="submitHandler">
            <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="title"
                  :class="{invalid: $v.title.$error}"
              >
              <label for="name">Название</label>
              <span class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required">
                Введите название категории
                </span>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{invalid: $v.limit.$error}"
              >
              <label for="limit">Лимит</label>
              <span class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.minValue"
              >
              Минимальная величина {{$v.limit.$params.minValue.min}}
              </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Создать
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import M from 'materialize-css'
import {minValue, required} from 'vuelidate/lib/validators'
export default {
  data(){
    return{
      title: '',
      limit: 100
    }
  },
  validations:{
    title: {required},
    limit:{minValue:minValue(100)}
  },
  mounted(){
    M.updateTextFields();
  },
  methods:{
    async submitHandler(){
      this.$v.$touch();
      if(this.$v.$error){
        return;
      }
      try{
        const category = await this.$store.dispatch('createCategory',{
        title: this.title,
        limit: this.limit
      })
      console.log('[x]new category');
      console.log(category);
      // очистка формы
        this.title = '';
        this.limit = 100;
        this.$v.$reset();
        this.$message('Категория была создана');
        this.$emit('created', category);
      console.log(category);
      }catch(e){
        console.log(e);
      }
    }
  }
}
</script>