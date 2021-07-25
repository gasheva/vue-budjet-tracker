<template>
  <ul class="sidenav app-sidenav" :class="{open:value}" style="width:200px">

    <!-- router-link содержащий список эл-в -->
      <router-link
      v-for="link in links"
      :key="link.url"
      active-class="active"
      :to="link.url"
      custom
      v-slot="{href, navigate}">
      <li>
      <a :href=href, @click=navigate class="waves-effect waves-orange pointer">{{link.title}}</a>
      </li>
      </router-link>
    
  </ul>
</template>

<script>
import localize from '@/filters/localize.filter'
export default {
    props:['value'],
    data(){
        return{
            links:[
                {title:"Счет", url:"/"},
                {title: localize('Menu_History'), url:"/history"},
                {title:"Планирование", url:"/planning"},
                {title:"Новая запись", url:"/record"},
                {title:"Категории", url:"/categories"}
            ]
        }
    }
}
</script>