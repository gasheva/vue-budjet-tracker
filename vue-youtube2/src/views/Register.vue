<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="form.email" :class="{invalid: $v.form.email.$error}"/>
        <label for="email">Email</label>
        <small v-if="$v.form.email.$dirty && !$v.form.email.required" class="helper-text invalid">Поле email не должно быть пустым</small>
        <small v-else-if="$v.form.email.$dirty && !$v.form.email.email" class="helper-text invalid">Некорректный email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" class="validate" v-model.trim="form.password" :class="{invalid: $v.form.password.$error}"/>
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.form.password.$dirty && !$v.form.password.required">Введите пароль!</small>
        <small class="helper-text invalid" v-else-if="$v.form.password.$dirty && !$v.form.password.minLength">
          Длина должа быть больше {{$v.form.password.minLength.min}}!
        </small>
      </div>
      <div class="input-field">
        <input id="name" type="text" class="validate" v-model.trim="form.name" :class="{invalid: $v.form.name.$error}"/>
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="$v.form.name.$dirty && !$v.form.name.required">Введите имя!</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="form.isAgree" :class="{invalid: $v.form.isAgree.$error}"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link :to="{name: 'Register'}">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {required, email, minLength} from 'vuelidate/lib/validators';
export default {
  data(){
    return {
      form:{
        email:'',
        password: '',
        name: '',
        isAgree: false
      }
    }
  },
  validations:{
    form:{
      email:{email, required},
      password: {required, minLength:minLength(6)},
      name: {required},
      isAgree:{checked: v=>v}
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
        password: this.form.password,
        name: this.form.name
      };
      try{
        await this.$store.dispatch('register', formData);
        this.$router.push({name:'Home'});
      }catch(e){
        console.log(e);
      }
    }
  }
}
</script>