import { API } from 'aws-amplify'

// initial state
const state = {
  currentUser: ''
}

// getters
const getters = {
  currentUser: state => { return state.currentUser }
}

// actions
const actions = {

  async setCurrentUser({ state, commit, rootState, dispatch }, payload) {
    commit('SET_CURRENT_USER', { currentUser: payload.username })
  },

  async getServerError({ state, commit, rootstate, dispatch }, payload) {
    console.log(payload)
    commit('SET_SERVER_ERROR', payload)
  },


}

// mutations
const mutations = {


  SET_CURRENT_USER: (state, { currentUser }) => {
    state.currentUser = currentUser
  },

  SET_API_RESPONSE: (state, { response }) => {
    state.apiResponse = response
    console.log("API RESPONSE:", response)
  },

  SET_SERVER_ERROR: (state, { error }) => {
    state.serverError = error
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}