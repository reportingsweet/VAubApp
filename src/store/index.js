import Vue from 'vue'
import Vuex from 'vuex'
import PlaceVin from './modules/PlaceVin'
import Reminders from './modules/Reminders'
import Liquid from './modules/Liquid'
import DataStore from './modules/DataStore'
import Auth from './modules/Auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    PlaceVin,
    Reminders,
    Liquid,
    DataStore,
    Auth
  },
  state: {

  },
  mutations: {},
  actions: {},
  getters: {}
})
