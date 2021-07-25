<template>
  <div>
    <div class="app-main-layout">
      <main class="app-content">
        <div class="app-page">
          <div>
            <div class="page-title">
              <h3>{{'ProfileTitle'|localize}}</h3>
            </div>

            <form class="form" @submit.prevent="submitHandler">
              <div class="input-field">
                <input id="description" type="text" v-model="name" :class="{invalid: $v.name.$error}"/>
                <label for="description">{{'Name'|localize}}</label>
                <small class="helper-text invalid"
                v-if="$v.name.$dirty&&!$v.name.required">
                {{'Message_EnterName'|localize}}
                </small>
              </div>

              <div class="switch">
                <label>
                  English
                  <input type="checkbox" v-model="isRuLocale"/>
                  <span class="lever"></span>
                  Русский
                </label>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                {{'Update'|localize}}
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
import {required} from 'vuelidate/lib/validators';
import {mapGetters, mapActions} from 'vuex'
import M from 'materialize-css'
export default {
  // Для тайтлов
  metaInfo(){
    return {title:this.$title('ProfileTitle')};
  },
  data(){
    return{
        name: '',
        isRuLocale: true
    }
  },
  validations:{
      name:{required},
  },
  computed:{
      ...mapGetters(['info'])
  },
  mounted(){
    this.isRuLocale = this.info.locale === 'ru-Ru';
    this.name = this.info.name;
    setTimeout(()=>{
      M.updateTextFields();
    }, 1);
  },
  methods:{
    ...mapActions(['updateInfo']),
    async submitHandler(){
      this.$v.$touch();
      if(this.$v.$error){
        return;
      };
      try{
        await this.updateInfo({
          name:this.name,
          locale:this.isRuLocale?'ru-Ru':'en-Us'});
      }catch(e){console.log(e);}
    }
  
  }
}
</script>

<style scoped>
.switch{
  margin-bottom: 2rem;
}
</style>