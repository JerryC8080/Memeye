import Vue from 'vue'
import App from './App.vue'

window.vm = new Vue({
  el: '#app',
  render: h => h(App)
})