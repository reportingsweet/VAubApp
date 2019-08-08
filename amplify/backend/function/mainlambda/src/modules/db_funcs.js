
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB({apiVersion: '2012-08-10', region: 'us-east-1'})

const dynamo_config = require('../Dynamo/config.js')

const pako = require('pako')
const zlib = require('zlib')

var atob = require('atob')


/********************************************************************************************************
* HANDLER FUNCTIONS *
********************************************************************************************************/

var postAllDataTable = async (req, res, data, dataSource) => {
  var placements = await JSON.parse(data)

  console.log("POST TO DYNAMO DB", placements.length)
  
  var today = new Date()
  
  for(var i = 0; i < placements.length; i++) {

      var params = await {
        TableName: 'All_Data',
        Item: {
          "internal_case_id":  { S: String(placements[i].internal_case_id) },
          "account_received_date": { S: String(placements[i].account_received_date) },
          "account_type": { S: String(placements[i].account_type) },
          "charged_off_date": { S: String(placements[i].charged_off_date) },

          "client_claim_number": { S: String(placements[i].client_claim_number) },
          "collector_first_name": { S: String(placements[i].collector_first_name) },
          "collector_last_name": { S: String(placements[i].collector_last_name) },
          "date_entered_in_simplicity": { S: String(placements[i].date_entered_in_simplicity) },
          "is_closed": { S: String(placements[i].is_closed) },
          "last_work_date": { S: String(placements[i].last_work_date) },
          "original_creditor": { S: String(placements[i].original_creditor) },

          "originated_date": { S: String(placements[i].originated_date) },
          "codebtor_city": { S: String(placements[i].codebtor_city) },
          "codebtor_state": { S: String(placements[i].codebtor_state) },
          "codebtor_zip": { S: String(placements[i].codebtor_zip) },
          "debtor_city": { S: String(placements[i].debtor_city) },
          "debtor_state": { S: String(placements[i].debtor_state) },
          "debtor_zip": { S: String(placements[i].debtor_zip) },
          "current_balance_due": { S: String(placements[i].current_balance_due) },
          "interest_start_date": { S: String(placements[i].interest_start_date) },
          "original_claim_amount": { S: String(placements[i].original_claim_amount) },
          "original_claim_interest_rate": { S: String(placements[i].original_claim_interest_rate) },
          "total_claim_amount": { S: String(placements[i].total_claim_amount) },
          "creditor": { S: String(placements[i].creditor) },
          "complaint_filed_date": { S: String(placements[i].complaint_filed_date) },
          "current_fees": { S: String(placements[i].current_fees) },
          "client_name": { S: String(placements[i].client_name) },
          "lit_or_bk": { S: String(placements[i].lit_or_bk) },
          "case_number": { S: String(placements[i].case_number) },
          "current_claim_status": { S: String(placements[i].current_claim_status) },
          "total_payments": { S: String(placements[i].total_payments) },
       
        }
      }

      await db.putItem(params, function(err, data) {
        if(err) {
          console.log(err)
          if(res) res.send({ success: 'fail', message: 'Error: Server Error' + err })
        }
        else { console.log('data', data) }
      })

      if(i == placements.length - 1) {
        if(res) res.send({success: 'post call succeed!', url: req.url , body: JSON.stringify(placements.length)})
      }

  }
}


/********************************************************************************************************
* GET FUNCTIONS *
********************************************************************************************************/



var getPlacementVintages = async (req, res) => {

 const placementVins = [{ Vintage: '2019-01-01', Dollars: '1000000.00' }]
  
 // event, context
 // req.apiGateway.event req.apiGateway.context

 if(res) res.json({success: 'get call succeed!', url: req.url, body: placementVins })
 return placementVins
}


var listTables = async (req, res) => {

  const TABLE_NAME = 'PlacementVintages'

  var params = {
    // ExclusiveStartTableName: TABLE_NAME,
    Limit: 100,
  }

  var list = db.listTables(params, function(err, data) {
    if (err) console.log("LIST TABLES Error: Server Error", err)
    // res.send({ success: 'fail', message: 'DELETE TABLE Error: Server Error' + err})
    else {
      // console.log("LIST OF TABLES:", data)
    }
  }).promise()

  return list

}


/********************************************************************************************************
* POST FUNCTIONS *
********************************************************************************************************/


// import { TextEncoder, TextDecoder } from 'util'

var Zlib = require('zlib')

var postDataTable = async (req, res) => {

  var step = []
  try {

    // const denc = await new TextDecoder()

    await step.push(1)
    var str = await req.body.Data

    if (req.body.DataSource == 'All_Data') {
      var dataSource = "All_Data"
      postAllDataTable(req, res, str, dataSource)
    } else if(req.body.DataSource == 'Tickler_Report') {
      var dataSource = "Tickler_Report"
    } else if(req.body.DataSource == 'Acct_Summary') {
      var dataSource = "Acct_Summary"
    } else {

    }

    // await step.push(2)
    // var charData = await str //.split('').map(function(e) { return e.charCodeAt(0) }) //.split('').map(function(x){return x.charCodeAt(0) })

    // await step.push(3)
    // var binData = await charData //new Uint8Array(charData)

    // await step.push(4)
    // var uncompressed = await zlib.unzip(binData, function(error, result) {
    //   if (error) throw error
    //   return result.toString()
    // })

    // await step.push(5)
    // let decoded = await uncompressed //String.fromCharCode.apply(null, new Uint16Array(uncompressed))
    // let decoded = await denc.decode(uncompressed)

    await step.push(6)
    // let data = await { Data: JSON.stringify(str), DataSource: JSON.stringify(req.body.DataSource) }// JSON.parse(decoded)

    // return dataSource

  } catch (e) {
    return "DATA UNZIP ERROR: " + e + " " + step
  }

}






var postPlacementVintages = async (req, res) => {

  // console.log(req)
  const placementVins = await JSON.parse(req.body.data)
  
  var today = new Date()
  
  for(var i = 0; i < placementVins.length; i++) {

      var params = await {
        TableName: 'PlacementVintages',
        Item: {
          "Vintage":  { S: String(placementVins[i].Vintage) },
          "UnitYeild": { S: String(placementVins[i].UnitYeild) },
          "TotalOriginalClaimAmt": { S: String(placementVins[i].TotalOriginalClaimAmt) },
          "TotalFees": { S: String(placementVins[i].TotalFees) },
          "TotalCollectedCalc": { S: String(placementVins[i].TotalCollectedCalc) },
          "SuitTillJudgment": { S: String(placementVins[i].SuitTillJudgment) },
          "SuitRate": { S: String(placementVins[i].SuitRate) },
          "SuedCount": { S: String(placementVins[i].SuedCount) },
          "ServedCount": { S: String(placementVins[i].ServedCount) },
          "ServedConvRate": { S: String(placementVins[i].ServedConvRate) },
          "RecentPmtPct": { S: String(placementVins[i].RecentPmtPct) },
          "PlacedTillJudgment": { S: String(placementVins[i].PlacedTillJudgment) },
          "OpenFiles": { S: String(placementVins[i].OpenFiles) },
          "NetLiquidation": { S: String(placementVins[i].NetLiquidation) },
          "LocalCounselRate": { S: String(placementVins[i].LocalCounselRate) },
          "Liquidation": { S: String(placementVins[i].Liquidation) },
          "JmtRate": { S: String(placementVins[i].JmtRate) },
          "JmtCount": { S: String(placementVins[i].JmtCount) },
          "FileCount": { S: String(placementVins[i].FileCount) },
          "FaceValue": { S: String(placementVins[i].FaceValue) },
          "ContingencyRate": { S: String(placementVins[i].ContingencyRate) },
          "ComplaintTillService": { S: String(placementVins[i].ComplaintTillService) },
          "ClosedFiles": { S: String(placementVins[i].ClosedFiles) },
          "AvgPlacementTillSuit": { S: String(placementVins[i].AvgPlacementTillSuit) },
          "Created": { S: String(today) }       
        }
      }

      db.putItem(params, function(err, data) {
        if(err) if(res) res.send({ success: 'fail', message: 'Error: Server Error' + err })
        else { console.log('data', data) }
      })

      if(i == placementVins.length - 1) {
        if(res) res.send({success: 'post call succeed!', url: req.url })
      }

      /* BATCH LOGIC */
    // await placementVinArr.push({
    //   PutRequest: { 
    //     Item: {
    //       "Vintage":  { S: placementVins[i].Vintage },
    //       "UnitYeild": { S: placementVins[i].UnitYeild},
    //       "TotalOriginalClaimAmt": { S: placementVins[i].TotalOriginalClaimAmt},
    //       "TotalFees": { S: placementVins[i].TotalFees},
    //       "TotalCollectedCalc": { S: placementVins[i].TotalCollectedCalc},
    //       "SuitTillJudgment": { S: placementVins[i].SuitTillJudgment},
    //       "SuitRate": { S: placementVins[i].SuitRate},
    //       "SuedCount": { S: placementVins[i].SuedCount},
    //       "ServedCount": { S: placementVins[i].ServedCount},
    //       "ServedConvRate": { S: placementVins[i].ServedConvRate},
    //       "RecentPmtPct": { S: placementVins[i].RecentPmtPct},
    //       "PlacedTillJudgment": { S: placementVins[i].PlacedTillJudgment},
    //       "OpenFiles": { S: placementVins[i].OpenFiles},
    //       "NetLiquidation": { S: placementVins[i].NetLiquidation},
    //       "LocalCounselRate": { S: placementVins[i].LocalCounselRate},
    //       "Liquidation": { S: placementVins[i].Liquidation},
    //       "JmtRate": { S: placementVins[i].JmtRate},
    //       "JmtCount": { S: placementVins[i].JmtCount},
    //       "FileCount": { S: placementVins[i].FileCount},
    //       "FaceValue": { S: placementVins[i].FaceValue},
    //       "ContingencyRate": { S: placementVins[i].ContingencyRate},
    //       "ComplaintTillService": { S: placementVins[i].ComplaintTillService},
    //       "ClosedFiles": { S: placementVins[i].ClosedFiles},
    //       "AvgPlacementTillSuit": { S: placementVins[i].AvgPlacementTillSuit}            
    //     }
    //   } 
    // })

    // if (i == placementVins.length-1) {


    //   var params = await {
    //     RequestItems: { "PlacementVintages": { placementVinArr } }
    //   }


    //   //  db.batchWriteItem(params, function(err, data) {
    //   //   if(err) {
    //   //     res.send({ success: 'fail', message: 'Error: Server Error' + err })
    //   //   } else {
    //   //     console.log('data', data)

    //   //     res.json({success: 'post call succeed!', url: req.url, body: params })
    //   //   }
    //   // })

    //   res.json({success: 'post call succeed!', url: req.url, body: params })
    // }

  }
}


module.exports = {
  listTables,
  getPlacementVintages,
  postPlacementVintages,
  postDataTable
}