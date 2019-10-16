var pako = require('pako')
const zlib = require('zlib')

var Base64 = require('js-base64').Base64

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

  async postDataTable ({ state, commit, rootState }, payload) {
    var data = []
    var dataSource = await payload.DataSource
    // console.log("payload.Data", payload.Data)
    for(var i = 0; i < payload.Data.length; i++) {
      data.push(payload.Data[i])
      if(i == payload.Data.length-1) {
        var str = JSON.stringify(data)
        // console.log(str)
        var deflate = pako.deflate(str, { to: 'string' })
        // console.log(deflate)
        var sendPayload = btoa(deflate)
        // console.log(sendPayload)
        let myInit = {
          body: { Data: sendPayload, DataSource: dataSource },
          isBase64Encoded: true,
          // headers: {
          //   "Content-Encoding": 'gzip'
          // }
        }
        var dataPost = await API.post('mainappapi2', '/p/DataTable', myInit)
          .catch(err => { console.log("postDataTable call Error:", err) })
        commit('SET_API_RESPONSE', { response: dataPost })
      }
    }
  },


  async truncateDataTable ({state, commit, rootState}, payload) {
    console.log(payload)

    var dataSource = payload.DataSource
    let myInit = {
      body: { DataSource: dataSource },
    }
    var truncTable = API.del('mainappapi2', '/d/DataTable', myInit)
      .catch(err => { console.log("truncateDataTable call Error:", err)})

    commit('SET_API_RESPONSE', { response: truncTable})
  },


  async getTableList({ state, commit, rootState }, payload) {
    try {
      const list = await API.get('mainappapi2', '/g/TableList')
      console.log("TABLE LIST CALL RESPONSE:",list)
      var tables = []
      if(list) {
        console.log(list)
        list.result.forEach(table => {
          tables.push(table.Tables_in_reportingsweet)
        })
        console.log("TABLES", tables)
        commit('SET_TABLE_LIST', { tableList: tables })
      }
    } catch(error) {
      console.log("STORE getTableList Error:", error)
    }
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
              // TotalOriginalClaimAmt: payload.data[i].TotalOriginalClaimAmt,
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

    console.log("********************************** STORE getAll REMINDERS **********************************")

    var result = API.get('mainappapi2', '/g/Reminders')
      .catch(err => { console.log("getAllReminders Error:", err)})
      result.then(async response => {
      if(response) {
        var parsed = await JSON.parse(response.body)
        commit('SET_ALL_REMINDERS', { reminders: parsed })
      }
    }, error => { console.log(error) })
  },




  async getAllCases ({ state, commit, rootState }, payload) {

    console.log("********************************** STORE getAll CASES **********************************")


    var result = API.get('mainappapi2', '/g/Placements')
      .catch(err => { console.log("getAllCases Error:", err)})


    result.then(async response => {
      if(response) {
        var binData = atob(JSON.parse(response.body))
        var strData = pako.inflate(binData, { to: 'string' })
        var cases = JSON.parse(strData)
        // console.log("getAllCases cases:", cases)

        var caseIdxArr = []
        Object.keys(cases).forEach(key => caseIdxArr[cases[key].case_number] = key)

        commit('SET_ALL_CASE_IDXS', { caseIdxArr })
        commit('SET_ALL_CASES', { cases: cases })

        
      }
    }, error => { console.log(error) })
  },





  async getAllPayments ({ state, commit, rootState }, payload) {

    console.log("********************************** STORE getAll PAYMENTS **********************************")

    var result = API.get('mainappapi2', '/g/Revenue')
      .catch(err => { console.log("getAllPayments Error:", err)})
    result.then(async response => {
      if(response) {
        var parsed = await JSON.parse(response.body)
        // console.log("getAllPayments payments", parsed)
        commit('SET_ALL_PAYMENTS', { payments: parsed })
      }
    }, error => { console.log(error) })
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