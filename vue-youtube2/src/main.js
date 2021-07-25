import Vue from "vue";
import Vuelidate from "vuelidate";
import firebase from "firebase";
import Paginate from 'vuejs-paginate'
import VueMeta from "vue-meta";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Loader from './components/app/Loader'
import dateFilter from './filters/date.filter'
import localizeFilter from './filters/localize.filter'
import currencyFilter from './filters/currency.filter'
import msgPlugin from './plugins/msg.plugin'
import titlePlugin from './plugins/title.plugin'
import toolTipDirective from './directives/tooltip.directive';
import 'materialize-css/dist/css/materialize.min.css'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(msgPlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);
Vue.filter('date',dateFilter);  //первый параметр - имя фильтра
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', toolTipDirective);
Vue.component('paginate', Paginate);
Vue.component('Loader', Loader);  //региструруем собственный компонент

const firebaseConfig = {
  apiKey: "AIzaSyBOt91LSYjsd6P9zGLw98Ehr2_ti82koaU",
  authDomain: "vue-c344f.firebaseapp.com",
  projectId: "vue-c344f",
  storageBucket: "vue-c344f.appspot.com",
  messagingSenderId: "605248156803",
  appId: "1:605248156803:web:88d620a5560c2033f597b6",
  measurementId: "G-Y85WTJ1FJ0",
  databaseURL: "https://vue-c344f-default-rtdb.europe-west1.firebasedatabase.app/"
};
firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(()=>{
  
    if(!app)
    app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});