import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/global.styl'
import Vuex from 'vuex'
import notice from './components/notice'
import CreateStore from './store/store'
import axios from 'axios'
Vue.prototype.$axios =axios
Vue.use(notice)
Vue.use(Vuex)
const store = new CreateStore()
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.path == '/login'){
    next();
    return;
  }
  if(to.meta.requireLogin&&localStorage.getItem(to.params.id)){
    next();
    return;
  }
  next({
    path:'/login'
  })
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
