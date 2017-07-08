import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  developer: undefined
}

const mutations = {
  setDeveloper (state, developer) {
    state.developer = developer
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
