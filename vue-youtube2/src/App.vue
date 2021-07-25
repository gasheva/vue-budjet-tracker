<template>
  <div id="app">
    <!-- component будет рисовать необходимый эл-т благодаря свойству is -->
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout.vue'
import MainLayout from './layouts/MainLayout.vue'

export default {
  components:{
    EmptyLayout, MainLayout
  },
  computed:{
    layout(){
      // добавляем -layout, поскольку component будет отрисовывать компонент 
      // а в теге либо заглавные, либо через -
      return (this.$route.meta.layout || 'empty')+"-layout";  
    },
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index';
</style>
