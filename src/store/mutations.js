import * as types from './mutation-types.js'

export default {
  [types.SET_USER_IMAGE] (state, path) {
    state.userImage = path
  }
}
