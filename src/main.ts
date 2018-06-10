import Vue from 'vue'
import Vuep from 'vuep'
import 'vuep/dist/vuep.css'
import '@/assets/app.styl'
import 'flatpickr/dist/flatpickr.min.css'
import 'flatpickr/dist/themes/airbnb.css'
import store from '@/store'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import App from '@/App.vue'
import FormPreview from '@/components/FormPreview.vue'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.component('vuep', Vuep)
Vue.component('form-preview', {
  render: h => h(FormPreview)
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
