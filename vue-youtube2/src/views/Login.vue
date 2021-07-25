<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="form.email"/>
        <!-- ($v.form.email.$dirty && (!$v.form.email.required||!$v.form.email.email)) -->
        <label for="email">Login</label>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model.trim="form.password" :class="{invalid:$v.form.password.$error}"/>
        <label for="password">Пароль</label>
        <small v-if="$v.form.password.$dirty && !$v.form.password.required" class="helper-text invalid">Поле пароля не должно быть пустым</small>
        <small v-else-if="$v.form.password.$dirty && !$v.form.password.minLength" class="helper-text invalid">пароль должен быть более{{$v.form.password.$params.minLength.min}} символов</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators';
import messages from '../plugins/messages'
export default {
  name:'login',
  data(){
    return {
      form:{
        email:'',
        password: ''
      }
    }
  },
  validations:{
    form:{
      password: {required, minLength:minLength(6)}
    }

  },
  mounted(){
    if(messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])
    }
  },
  methods:{
    async submitHandler(){
      this.$v.form.$touch();
      if(this.$v.form.$error){
        return;
      };
      const formData = {
        email: this.form.email,
        password: this.form.password
      };
      try{
        await this.$store.dispatch('login', formData);
        // await this.$store.dispatch('fetchInfo');
        // await this.$store.dispatch('fetchRecords');
        // await this.$store.dispatch('fetchCategories');
        this.$router.push({name:'Home'});
      }catch(e){console.log(e);}
    }
  }
}
</script>