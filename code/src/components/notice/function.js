import Vue from 'vue'
import component from './notice.vue'
const NoticeConstructor = Vue.extend(component)
const instances = []
const notify = (options) => {
  if(Vue.prototype.$isServer) return
  if(instance){
    console.log('instance exist')
    return;
  }
  const instance = new NoticeConstructor({
    data:options,
  }).$mount()
  document.body.appendChild(instance.$el)
  instances.push(instance)

  Vue.nextTick(()=>{
    instance.visible = true
  })
  delLastInstance()
}
//删除上一次通知
function delLastInstance(){
  if(instances.length>1){
    instances[0].visible = false
    //删除节点
    document.body.removeChild(instances[0].$el)
    instances.splice(0,1)
  }

}
export default notify
