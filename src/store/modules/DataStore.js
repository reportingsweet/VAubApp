// initial state
const state = {
    allReminders: {},
    allCases: {},
    allPayments: {}
}

// getters
const getters = {
    allReminders: state => { return state.allReminders },
    allCases: state => { return state.allCases },
    allPayments: state => { return state.allPayments }
}

// actions
const actions = {

  // async getAllReminders ({ state, commit, rootState }, payload) {
   
  //   // var reminders = require('../data/tickler_export.JSON')
  //   var reminders = []
  //   // localStorage.removeItem("Reminders")
  //   if(payload) {

  //     reminders = payload

  //     localStorage.setItem("Reminders", JSON.stringify(payload))

  //   } else {

  //       if(localStorage.getItem("Reminders")) {
  //         reminders = JSON.parse(localStorage.getItem("Reminders"))
  //       }
            
  //   }
    
  //   await commit('SET_ALL_REMINDERS', { reminders })
  // },

  async getAllReminders ({ state, commit, rootState }, payload) {
   
    // var reminders = require('../data/tickler_export.JSON')
    var reminders = []

    if(payload) {

      console.log("getAllReminders")
      reminders = payload.Reminders
      console.log("STORE reminders", reminders)

      if(payload.isImport) {
        var dbName = 'Reminders'
        var version = 1
        var request = indexedDB.open(dbName, version)
      

        request.onsuccess = async function(event) {
            console.log("STORE IndexedDB Success")
            var db = event.target.result
          //   db.createObjectStore(["Cases"], { keyPath: 0})
            console.log("STORE db", db)

            var tx = db.transaction(["Reminders"], "readwrite")

            // console.log(tx)
            tx.onerror = function(event) {
                console.log("STORE Transaction Error:", event)
            }
            console.log("STORE Creating dataStore")

            var objStore = tx.objectStore("Reminders")

            console.log("STORE adding data to store")
            objStore.put(payload.Reminders, 0)
            db.close()
    
          }

        request.onupgradeneeded = async function(event) {
          console.log("STORE onupgradeneeded Create DB", dbName)
          var db = event.target.result
          var objStore = db.createObjectStore("Reminders")
        //   objStore.add(JSON.stringify(payload.Cases), 0)
        }

        request.onerror = function (event ) {
            console.log("STORE IndexedDB Error:", event)
        }
      }
    }
        
    
    commit('SET_ALL_REMINDERS', { reminders })
  },

  getAllCases({ state, commit }, payload) {
    // var cases = require('../data/All_Data.JSON')
    var cases = []


    if(payload) {
      console.log("getAllCases")
      cases = payload.Cases

      if(payload.isImport) {
        var dbName = 'Cases'
        var version = 1
        var request = indexedDB.open(dbName, version)
       

        request.onsuccess = async function(event) {
            console.log("STORE IndexedDB Success")
            var db = event.target.result
          //   db.createObjectStore(["Cases"], { keyPath: 0})
            console.log("STORE db", db)
  
            var tx = db.transaction(["Cases"], "readwrite")
  
            // console.log(tx)
            tx.onerror = function(event) {
                console.log("STORE Transaction Error:", event)
            }
            console.log("STORE Creating dataStore")
  
            var objStore = tx.objectStore("Cases")
  
            console.log("STORE adding data to store")
            objStore.put(payload.Cases, 0)
            db.close()
    
          }
  
        request.onupgradeneeded = async function(event) {
          console.log("STORE onupgradeneeded Create DB", dbName)
          var db = event.target.result
          var objStore = db.createObjectStore("Cases")
        //   objStore.add(JSON.stringify(payload.Cases), 0)
        }
  
        request.onerror = function (event ) {
            console.log("STORE IndexedDB Error:", event)
        }
      }
    }

    commit('SET_ALL_CASES', { cases })
  },




  getAllPayments({ state, commit }, payload) {
    // var payments = require('../data/AccountSummaryReport.JSON')
    var payments = []
    if(payload) {
        payments = payload
        localStorage.setItem("Payments", JSON.stringify(payload))
    }
    commit('SET_ALL_PAYMENTS', { payments })
  }
}

// mutations
const mutations = {
  SET_ALL_REMINDERS: (state, { reminders }) => {
    console.log("Setting All Reminders", reminders)
    state.allReminders = reminders
  },
  SET_ALL_CASES: (state, { cases }) => {
    state.allCases = cases
  },
  SET_ALL_PAYMENTS: (state, { payments }) => {
    state.allPayments = payments
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}