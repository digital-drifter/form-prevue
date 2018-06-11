import Vue from 'vue'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/themes/material.css'
import '@/assets/app.styl'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store'
import VeeValidate from 'vee-validate'
import App from '@/App.vue'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VeeValidate)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
