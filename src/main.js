import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueProgressBar from 'vue-progressbar'
import OnLoad from 'vue-onload'
import VTooltip from 'v-tooltip'

require('./assets/css/theme.css')

Vue.config.productionTip = false

const options = {
  color: '#d94a64',
  failedColor: '#874b4b'
}

Vue.use(VueProgressBar, options)
Vue.use(OnLoad)
Vue.use(VTooltip)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
