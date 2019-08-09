var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var pako = require('pako')
const zlib = require('zlib')

import { API } from 'aws-amplify'

// initial state
const state = {
    allReminders: {},
    allCases: {},
    allCaseIDXs: [],
    allPayments: {},
    testPVins: {},
    tableList: {},

    apiResponse: {},
    serverError: 0,
}

// getters
const getters = {
    allReminders: state => { return state.allReminders },
    allCases: state => { return state.allCases },
    allCaseIDXs: state => { return state.allCaseIDXs },
    allPayments: state => { return state.allPayments },
    testPVins: state => { return state.testPVins },
    tableList: state => { return state.tableList },
    apiResponse: state => { return state.apiResponse },
    serverError: state => { return state.serverError },
}

// actions
const actions = {




  async template ({ state, commit, rootState }, payload) {
    
  },

  
  

  async postDataTable ({ state, commit, rootState }, payload) {

   
    var data = []
    var dataSource = await payload.DataSource

    console.log(payload.Data)

    for(var i = 0; i < payload.Data.length; i++) {
      data.push(payload.Data[i])

      if(i == payload.Data.length-1) {

        console.log("GZIP", data)

        let myInit = {
          body: { Data: JSON.stringify(data), DataSource: dataSource },
          // body: { Data: data },
          // isBase64Encoded: true,
          // headers: {
          //   "Content-Encoding": 'gzip'
          // }
        }

        var dataPost = await API.post('mainappapi', '/p/DataTable', myInit)
          .catch(err => { console.log("postDataTable Error:", err) })

        commit('SET_API_RESPONSE', { response: dataPost })

      }
    }
    // var dataSource = await pako.deflate(unescape(encodeURIComponent(JSON.stringify(payload.DataSource))))
    
    // var data = await btoa(zlib.deflate(JSON.stringify(payload.Data), function(error, result) {
    //   if (error) throw error
    //   return result
    // }))

   

    // // var data = await JSON.stringify(payload.Data)
    


    // data = await atob(data)
    // data = await pako.inflate(data, { to: 'string' })
    // data = await JSON.parse(data)



    // console.log("uncompressed", data)


    // var data = await JSON.stringify(payload.Data)
    // var dataSource = await JSON.stringify(payload.DataSource)
    // var data = await JSON.stringify(payload.Data)
    // console.log("GZIP", data)

    // let myInit = {
    //   body: { Data: data, DataSource: dataSource },
    //   headers: {
    //   }
    // }



    

  },

  async getTableList({ state, commit, rootState }, payload) {
    const list = await API.get('mainappapi', '/g/TableList')
    console.log("TABLE LIST:",list)
    commit('SET_TABLE_LIST', { tableList: list })
  },

  async getPVins({state, commit, rootState }, payload) {
    try {
      const pVins = API.get('mainappapi', '/g/PlacementVintages')
      console.log("pVins FROM AWS", pVins)
      commit('SET_P_VINS', { pVins: pVins })
    } catch(err) {
      console.log(err)
    }
  },

  async postPVins({state, commit, rootState }, payload) {

    try {

      console.log("Data before Stringify", typeof payload.data)
      // let data = payload.data
      let data = []
      for(var i = 0; i<payload.data.length; i++) {
        data.push(
            {
              Vintage: payload.data[i].Vintage, 
              UnitYeild: payload.data[i].UnitYeild,
              TotalOriginalClaimAmt: payload.data[i].TotalOriginalClaimAmt,
              TotalFees: payload.data[i].TotalFees,
              TotalCollectedCalc: payload.data[i].TotalCollectedCalc,
              TotalOriginalClaimAmt: payload.data[i].TotalOriginalClaimAmt,
              SuitTillJudgment: payload.data[i].SuitTillJudgment,
              SuitRate: payload.data[i].SuitRate,
              SuedCount: payload.data[i].SuedCount,
              ServedCount: payload.data[i].ServedCount,
              ServedConvRate: payload.data[i].ServedConvRate,
              RecentPmtPct: payload.data[i].RecentPmtPct,
              PlacedTillJudgment: payload.data[i].PlacedTillJudgment,
              OpenFiles: payload.data[i].OpenFiles,
              NetLiquidation: payload.data[i].NetLiquidation,
              LocalCounselRate: payload.data[i].LocalCounselRate,
              Liquidation: payload.data[i].Liquidation,
              JmtRate: payload.data[i].JmtRate,
              JmtCount: payload.data[i].JmtCount,
              FileCount: payload.data[i].FileCount,
              FaceValue: payload.data[i].FaceValue,
              ContingencyRate: payload.data[i].ContingencyRate,
              ComplaintTillService: payload.data[i].ComplaintTillService,
              ClosedFiles: payload.data[i].ClosedFiles,
              AvgPlacementTillSuit: payload.data[i].AvgPlacementTillSuit
          }
        )
        if(i == payload.data.length-1) {
          data = JSON.stringify(data)
          let myInit = {
            body: { Data: data },
            headers: {}
          }
          const pVins = API.post('mainappapi', '/p/PlacementVintages', myInit)
              .catch(err => { console.log("postPVins Error:", err) })

          commit('SET_API_RESPONSE', { response: pVins })
        }
      }
    } catch(err) {
      console.log(err)
    }
  },

  async deletePVins ({state, commit, rootstate }, paylad) {
    let myInit = {
      body: {},
      headers: {}
    }
    const pVins = API.del('mainappapi', '/d/PlacementVintages', myInit)
    console.log("Delete PlacementVintages", pVins)
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
  },

  async getServerError({ state, commit, rootstate, dispatch }, payload) {
    console.log(payload)
    commit('SET_SERVER_ERROR', payload)
  },
}

// mutations
const mutations = {
  SET_P_VINS: (state, { pVins }) => {
    state.testPVins = pVins
  },
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
  },
  SET_TABLE_LIST: (state, { tableList }) => {
    state.tableList = tableList
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