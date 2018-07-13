import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import routes from './router'

Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
