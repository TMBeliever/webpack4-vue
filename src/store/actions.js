import * as types from './mutation-types.js'

export default {
  nameAsyn ({ commit }, { age, name }) {
    commit(types.SET_USER_IMAGE, name)
  }
}
