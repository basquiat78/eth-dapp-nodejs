import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3 from 'web3'

Vue.config.productionTip = false

Vue.prototype.$EventBus = new Vue();

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 Load')
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    console.log('web3 not load')
    // 가나슈로...
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
