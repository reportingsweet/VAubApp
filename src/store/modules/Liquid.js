
// // initial state
// const state = {
//     allPayments: {}
// }

// // getters
// const getters = {
//     allPayments: state => { return state.allPayments }
// }

// // actions
// const actions = {

//   getAllPayments({ state, commit }, payload) {
//     var payments = require('../data/AccountSummaryReport.JSON')
//     // var payments = []
//     if(payload) {
//         payments = payload
//     }
//     commit('SET_ALL_PAYMENTS', { payments })
//   }

// }

// // mutations
// const mutations = {
//   SET_ALL_PAYMENTS: (state, { payments }) => {
//     state.allPayments = payments
//   }
// }

// export default {
//   state,
//   getters,
//   actions,
//   mutations
// }