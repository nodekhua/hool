// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import i18n from './languages/main'
import VueDraggable from 'vuedraggable'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueCookie)
Vue.use(VueDraggable)

if (Vue.config.devtools) {
  Vue.http.headers.common['Authorization'] = `Basic YXBpOnZlcnl2ZXJ5dmVyeWhhcmRwYXNzd29yZA==`
}

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  i18n,
  data: {
    user: {}
  }
})
