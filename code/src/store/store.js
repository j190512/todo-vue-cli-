import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
const isDev = process.env.NODE_ENV === 'development'
export default ()=>{
  const store =   new Vuex.Store({
    strict: isDev,//开发环境下
    state:defaultState,
    mutations,
    actions,
    getters
  })
  if (module.hot) { // 热更新
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
