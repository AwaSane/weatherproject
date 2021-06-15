import Vue from 'vue'
import App from './App.vue'
// import VueGooglePlaces from 'vue-google-places'

Vue.config.productionTip = false
// Vue.use(VueGooglePlaces)
new Vue({
  render: h => h(App),
}).$mount('#app')
