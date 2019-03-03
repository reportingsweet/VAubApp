
// import { $ } from '@/main'

// // initial state
// const state = {
//     allReminderss: {}
// }

// // getters
// const getters = {
//     allReminders: state => { return state.allReminders }
// }

// // actions
// const actions = {

//   async getAllReminders ({ state, commit, rootState }, payload) {
   
//     // var reminders = require('../data/tickler_export.JSON')
//     var reminders = []
//     if(payload) {
//       reminders = payload
//     }
    
//     await commit('SET_ALL_REMINDERS', { reminders })
//   }
// }

// // mutations
// const mutations = {
//     SET_ALL_REMINDERS: (state, { reminders }) => {
//       // console.log("Setting All Reminders", reminders)
//       state.allReminders = reminders
//   }
// }

// export default {
//   state,
//   getters,
//   actions,
//   mutations
// }