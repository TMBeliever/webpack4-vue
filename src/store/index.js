import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import * as getters from './getters'
import mutations from './mutations.js'
import actions from './actions.js'
import m1 from './modules/modules_a.js'
import m2 from './modules/modules_b.js'
import createLogger from 'vuex/dist/logger' // 修改日志
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // 开发环境中为true，否则为false
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    m1,
    m2
  },
  plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
})
