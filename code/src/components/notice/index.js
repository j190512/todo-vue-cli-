import notice from './notice.vue'
import notify from './function'
export default (Vue)=>{
  Vue.component(notice.name,notice)
  Vue.prototype.$notify = notify
}
