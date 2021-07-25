<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line"
        v-for="cur in currency"
        :key="cur">
          <span>{{getCurrency(cur) | currency(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['rates'],
  data(){
    return{
      currency: ['RUB', 'EUR', 'USD']
    }
  },
  computed:{
    base(){
      return this.$store.getters.info.bill / (this.rates['RUB']/ this.rates['EUR']);
    }
  },
  async created(){
      await this.$store.dispatch('fetchInfo');
  },
  methods:{
    getCurrency(currency){
      return Math.floor(this.base * this.rates[currency]);
    }
  }
}
</script>