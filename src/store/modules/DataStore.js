var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// initial state
const state = {
    allReminders: {},
    allCases: {},
    allCaseIDXs: [],
    allPayments: {}
}

// getters
const getters = {
    allReminders: state => { return state.allReminders },
    allCases: state => { return state.allCases },
    allCaseIDXs: state => { return state.allCaseIDXs },
    allPayments: state => { return state.allPayments }
}

// actions
const actions = {

  async postCases({ state, commit, rootState }, payload) {

  },

  async getAllReminders ({ state, commit, rootState }, payload) {
   
    // var reminders = require('../data/tickler_export.JSON')
    var reminders = []

    if(payload) {

      console.log("getAllReminders")
      reminders = payload.Reminders
      // console.log("STORE reminders", reminders)

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
            objStore = undefined
            tx = undefined
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

        request = undefined
      }
    }
        
    
    commit('SET_ALL_REMINDERS', { reminders })
  },

  async getAllCases({ state, commit }, payload) {
    // var cases = require('../data/All_Data.JSON')

    console.log("getAllCases Called from:", payload.CallLoc)
    var cases = []
    var caseIdxArr = []

    if(payload) {
      console.log("getAllCases with payload")
      
      console.log("STORE payload", payload)

      if(payload.isImport) {
        var dbName = 'Cases'
        var version = 1
        var request = indexedDB.open(dbName, version)
       

        request.onsuccess = async function(event) {
            console.log("STORE IndexedDB Success")
            var db = event.target.result
          //   db.createObjectStore(["Cases"], { keyPath: 0})
            console.log("STORE db", db)
  
            var tx = db.transaction(["Cases", "CaseIDX"], "readwrite")

            // var tx_caseIdx = db.transaction(["CaseIDX"], "readwrite")
  
            // console.log(tx)
            tx.onerror = function(event) {
                console.log("STORE Transaction Error:", event)
            }
            console.log("STORE Creating dataStore")
  
            var caseTxObj = tx.objectStore("Cases")
            var caseIdxTxObj = tx.objectStore("CaseIDX")
            
            

            Object.keys(payload.Cases)
              .forEach(key => caseIdxArr[payload.Cases[key].case_number] = key)
  
            console.log("STORE adding data to store")            
            caseTxObj.put(payload.Cases, 0)
            caseIdxTxObj.put(caseIdxArr, 0)

            cases = payload.Cases
            // caseIdxArr = caseIdxArr

            commit('SET_ALL_CASES', { cases })
            commit('SET_ALL_CASE_IDXS', { caseIdxArr })

            caseTxObj = undefined
            caseIdxTxObj = undefined
            tx = undefined

            db.close()
    
          }
  
        request.onupgradeneeded = async function(event) {
          console.log("STORE onupgradeneeded Create DB", dbName)
          var db = event.target.result
          var objStore = db.createObjectStore("Cases")
          var caseIdxObj = db.createObjectStore("CaseIDX")
        //   objStore.add(JSON.stringify(payload.Cases), 0)
        }
  
        request.onerror = function (event ) {
            console.log("STORE IndexedDB Error:", event)
        }

        request = undefined

      } else {
        cases = payload.Cases
        caseIdxArr = payload.CaseIDX

        commit('SET_ALL_CASES', { cases })
        commit('SET_ALL_CASE_IDXS', { caseIdxArr })
      }
    }

    
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
    state.allReminders = reminders
  },
  SET_ALL_CASES: (state, { cases }) => {
    state.allCases = cases
  },
  SET_ALL_CASE_IDXS: (state, { caseIdxArr }) => {
    state.allCaseIDXs = caseIdxArr
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