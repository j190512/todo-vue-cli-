import Vue from 'vue'
import Router from 'vue-router'
import Todo from '../views/todo/todo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/app/:id',
      component: Todo,
      meta:{
        requireLogin:true
      }
    },
    {
      path:'/login',
      component:()=>import('../views/login/login.vue')
    },

  ]
})
