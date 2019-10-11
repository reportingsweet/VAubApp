
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB({apiVersion: '2012-08-10', region: 'us-east-1'})
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})
const dynamo_config = require('../Dynamo/config.js')

var rds_config = require('../RDS/config.js.js')

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: rds_config.host,
    user: rds_config.user,
    password: rds_config.password,
    database: rds_config.database,
});

const pako = require('pako')
const zlib = require('zlib')

var atob = require('atob')

var Base64 = require('js-base64').Base64


/********************************************************************************************************
* HANDLER FUNCTIONS *
********************************************************************************************************/

// DocumentClient Style Item
  // Item: {
  //   internal_case_id: item['internal_case_id'],
  //   account_received_date:item['account_received_date'] ,
  //   account_type:item['account_type'] ,
  //   charged_off_date:item['charged_off_date'],

  //   client_claim_number:item['client_claim_number'] ,
  //   collector_first_name:item['collector_first_name'] ,
  //   collector_last_name:item['collector_last_name'],
  //   date_entered_in_simplicity:item['date_entered_in_simplicity'],
  //   is_closed:item['is_closed'] ,
  //   last_work_date:item['last_work_date'] ,
  //   original_creditor:item['original_creditor'] ,

  //   originated_date:item['originated_date'] ,
  //   codebtor_city:item['codebtor_city'] ,
  //   codebtor_state:item['codebtor_state'],
  //   codebtor_zip:item['codebtor_zip'] ,
  //   debtor_city:item['debtor_city'] ,
  //   debtor_state:item['debtor_state'] ,
  //   debtor_zip:item['debtor_zip'] ,
  //   current_balance_due:item['current_balance_due'],
  //   interest_start_date:item['interest_start_date'],
  //   original_claim_amount:item['original_claim_amount'],
  //   original_claim_interest_rate:item['original_claim_interest_rate'] ,
  //   total_claim_amount:item['total_claim_amount'] ,
  //   creditor:item['creditor'],
  //   complaint_filed_date:item['complaint_filed_date'],
  //   current_fees:item['current_fees'] ,
  //   client_name:item['client_name'] ,
  //   lit_or_bk:item['lit_or_bk'] ,
  //   case_number:item['case_number'],
  //   current_claim_status:item['current_claim_status'],
  //   total_payments:item['total_payments'] ,
  //   Created: String(today)    
  // }

  // DB style Item 
  // Item: {
  //   "internal_case_id":  { S: String(item.internal_case_id) },
  //   "account_received_date": { S: String(item.account_received_date) },
  //   "account_type": { S: String(item.account_type) },
  //   "charged_off_date": { S: String(item.charged_off_date) },

  //   "client_claim_number": { S: String(item.client_claim_number) },
  //   "collector_first_name": { S: String(item.collector_first_name) },
  //   "collector_last_name": { S: String(item.collector_last_name) },
  //   "date_entered_in_simplicity": { S: String(item.date_entered_in_simplicity) },
  //   "is_closed": { S: String(item.is_closed) },
  //   "last_work_date": { S: String(item.last_work_date) },
  //   "original_creditor": { S: String(item.original_creditor) },

  //   "originated_date": { S: String(item.originated_date) },
  //   "codebtor_city": { S: String(item.codebtor_city) },
  //   "codebtor_state": { S: String(item.codebtor_state) },
  //   "codebtor_zip": { S: String(item.codebtor_zip) },
  //   "debtor_city": { S: String(item.debtor_city) },
  //   "debtor_state": { S: String(item.debtor_state) },
  //   "debtor_zip": { S: String(item.debtor_zip) },
  //   "current_balance_due": { S: String(item.current_balance_due) },
  //   "interest_start_date": { S: String(item.interest_start_date) },
  //   "original_claim_amount": { S: String(item.original_claim_amount) },
  //   "original_claim_interest_rate": { S: String(item.original_claim_interest_rate) },
  //   "total_claim_amount": { S: String(item.total_claim_amount) },
  //   "creditor": { S: String(item.creditor) },
  //   "complaint_filed_date": { S: String(item.complaint_filed_date) },
  //   "current_fees": { S: String(item.current_fees) },
  //   "client_name": { S: String(item.client_name) },
  //   "lit_or_bk": { S: String(item.lit_or_bk) },
  //   "case_number": { S: String(item.case_number) },
  //   "current_claim_status": { S: String(item.current_claim_status) },
  //   "total_payments": { S: String(item.total_payments) },
  //   "Created": { S: String(today) }    
  // }

  // BATCH postAll Data Table
  // let postPlacements = []

  // await placements.forEach(item => {
  //   console.log(item)
  //   postPlacements.push({
  //     PutRequest: {
  //       Item: {
  //         "internal_case_id":  { S: String(item.internal_case_id) },
  //         "account_received_date": { S: String(item.account_received_date) },
  //         "account_type": { S: String(item.account_type) },
  //         "charged_off_date": { S: String(item.charged_off_date) },

  //         "client_claim_number": { S: String(item.client_claim_number) },
  //         "collector_first_name": { S: String(item.collector_first_name) },
  //         "collector_last_name": { S: String(item.collector_last_name) },
  //         "date_entered_in_simplicity": { S: String(item.date_entered_in_simplicity) },
  //         "is_closed": { S: String(item.is_closed) },
  //         "last_work_date": { S: String(item.last_work_date) },
  //         "original_creditor": { S: String(item.original_creditor) },

  //         "originated_date": { S: String(item.originated_date) },
  //         "codebtor_city": { S: String(item.codebtor_city) },
  //         "codebtor_state": { S: String(item.codebtor_state) },
  //         "codebtor_zip": { S: String(item.codebtor_zip) },
  //         "debtor_city": { S: String(item.debtor_city) },
  //         "debtor_state": { S: String(item.debtor_state) },
  //         "debtor_zip": { S: String(item.debtor_zip) },
  //         "current_balance_due": { S: String(item.current_balance_due) },
  //         "interest_start_date": { S: String(item.interest_start_date) },
  //         "original_claim_amount": { S: String(item.original_claim_amount) },
  //         "original_claim_interest_rate": { S: String(item.original_claim_interest_rate) },
  //         "total_claim_amount": { S: String(item.total_claim_amount) },
  //         "creditor": { S: String(item.creditor) },
  //         "complaint_filed_date": { S: String(item.complaint_filed_date) },
  //         "current_fees": { S: String(item.current_fees) },
  //         "client_name": { S: String(item.client_name) },
  //         "lit_or_bk": { S: String(item.lit_or_bk) },
  //         "case_number": { S: String(item.case_number) },
  //         "current_claim_status": { S: String(item.current_claim_status) },
  //         "total_payments": { S: String(item.total_payments) },
  //         "Created": { S: String(today) }    
  //       }
  //     }
  //   });
  // });

  // console.log(postPlacements)

  
  // let params = { 
  //   RequestItems: {
  //     'All_Data': postPlacements
  //   }
  // }

  // db.batchWriteItem(params, function(err, data) {
  //   if(err) {
  //     console.log(err)
  //     if(res) res.send({ success: 'fail', message: 'Error: Server Error' + err })
  //   }
  //   else { 
  //     if(res) res.send({success: 'post call succeed!', url: req.url, body: { PlacementsAdded:placements.length } } )
  //   }
  // })

  // res.send({success: 'post call succeed!', url: req.url, body: JSON.stringify(placements[0]) } )

  // SINGLE call postAllDataTable
  // var i = 0 
   
  //   placements.forEach(item => {
  //     var param = {
  //       TableName: 'All_Data',
  //       Item: {
  //         "internal_case_id":  { S: String(item.internal_case_id) },
  //         "account_received_date": { S: String(item.account_received_date) },
  //         "account_type": { S: String(item.account_type) },
  //         "charged_off_date": { S: String(item.charged_off_date) },

  //         "client_claim_number": { S: String(item.client_claim_number) },
  //         "collector_first_name": { S: String(item.collector_first_name) },
  //         "collector_last_name": { S: String(item.collector_last_name) },
  //         "date_entered_in_simplicity": { S: String(item.date_entered_in_simplicity) },
  //         "is_closed": { S: String(item.is_closed) },
  //         "last_work_date": { S: String(item.last_work_date) },
  //         "original_creditor": { S: String(item.original_creditor) },

  //         "originated_date": { S: String(item.originated_date) },
  //         "codebtor_city": { S: String(item.codebtor_city) },
  //         "codebtor_state": { S: String(item.codebtor_state) },
  //         "codebtor_zip": { S: String(item.codebtor_zip) },
  //         "debtor_city": { S: String(item.debtor_city) },
  //         "debtor_state": { S: String(item.debtor_state) },
  //         "debtor_zip": { S: String(item.debtor_zip) },
  //         "current_balance_due": { S: String(item.current_balance_due) },
  //         "interest_start_date": { S: String(item.interest_start_date) },
  //         "original_claim_amount": { S: String(item.original_claim_amount) },
  //         "original_claim_interest_rate": { S: String(item.original_claim_interest_rate) },
  //         "total_claim_amount": { S: String(item.total_claim_amount) },
  //         "creditor": { S: String(item.creditor) },
  //         "complaint_filed_date": { S: String(item.complaint_filed_date) },
  //         "current_fees": { S: String(item.current_fees) },
  //         "client_name": { S: String(item.client_name) },
  //         "lit_or_bk": { S: String(item.lit_or_bk) },
  //         "case_number": { S: String(item.case_number) },
  //         "current_claim_status": { S: String(item.current_claim_status) },
  //         "total_payments": { S: String(item.total_payments) },
  //         "Created": { S: String(today) }        
  //       }
  //     }

  //     // console.log(param)
      
  //     try {
  
  //       db.putItem(param, function(err, data) {
  //         if(err) {
  //           console.log(err)
  //           if(res) res.send({ success: 'fail', message: 'Error: Server Error' + err })
  //         }
  //         else {
  //           console.log('data', data) 
  //         }
          
  //       })
        
  //       if(i == placements.length - 1) {

  //         console.log(param)
  //         if(res) res.send(
  //           JSON.stringify({success: 'post call succeed!', url: req.url , body: placements.length } )
  //         )
            
  //       }

  //     } catch(e) {

  //       console.log(e)
  //       if(res) res.send({ success: 'fail', message: 'Error: Server Error' + e })

  //     }

  //     i += 1


  //   })


var h_DelTable = async (tableName)  => {

  try {

    console.dir("STARTING DELETE TABLE")
    const TABLE_NAME = await tableName

    var deleteParams = await {
      TableName: TABLE_NAME
    }

    await db.deleteTable(deleteParams, function(err, data) {
      if(err) {
        console.log("deleteTable Error:", err) 
        return false
      }
      else {
        console.dir("TABLE DELETED") 
        return true
      }
    })

  } catch(e) {
    console.log("h_DelTable Error:", e)
    return false
  }
  

}

var h_CreateTable = async (tableName) => {
  try {
    const TABLE_NAME = await tableName

    var attributeName = ''

    if(TABLE_NAME=='All_Data') attributeName = "internal_case_id"
    if(TABLE_NAME=='PlacementVintages') attributeName = "Vintage"

    var createParams = {
      TableName: TABLE_NAME,
      AttributeDefinitions: [{ AttributeName: attributeName, AttributeType: "S"}],
      KeySchema: [{ AttributeName: attributeName, KeyType: "HASH"}],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
      }
    }

    var check = false

    await db.createTable(createParams, function(err, data) {
      if (err) {
        console.log("createTable Error:", err)
        check = false
      }
      else {
        console.dir("TABLE CREATED")
        check = true
      }
    })

    return check

  } catch (e) {
    console.log("h_CreateTable Error:", e)
    return false
  }
}


var h_TableCheck = async (tableName) => {
  try {
    console.dir("STARTING TABLE CHECK")
    let params = {
      Limit: 1
    }
    // var check = false

   return db.listTables(params, async function(err, data) {
      if(err) {
        console.log("listTables Error:", err)
        return false
      }
      else {
        if(data.TableNames.includes(tableName)) {
          console.dir("TABLE FOUND")
          return true
        } else {
          console.dir("TABLE NOT FOUND")
          return false
        }
      }
    }, flag => { return true })

  } catch(e) {
    console.log("h_TableCheck Error:", e)
    return false
  }

}

var postAllDataTable = async (req, res, base64Encoded, dataSource) => {

  var step = 0
  var placementsLength = 0

  try {
    step = 1
    const binData = atob(base64Encoded)

    step = 2
    const strData = await pako.inflate(binData, { to: 'string' })

    step = 3
    const placements = await JSON.parse(strData)

    placementsLength = placements.length

    console.log("POST TO DYNAMO DB", placementsLength)
    
    var today = new Date()
    var i = 0 
    
    await placements.forEach(item => {

      var param = {
        TableName: 'All_Data',
        Item: {
          "internal_case_id":  { S: String(item.internal_case_id) },
          "account_received_date": { S: String(item.account_received_date) },
          "account_type": { S: String(item.account_type) },
          "charged_off_date": { S: String(item.charged_off_date) },

          "client_claim_number": { S: String(item.client_claim_number) },
          "collector_first_name": { S: String(item.collector_first_name) },
          "collector_last_name": { S: String(item.collector_last_name) },
          "date_entered_in_simplicity": { S: String(item.date_entered_in_simplicity) },
          "is_closed": { S: String(item.is_closed) },
          "last_work_date": { S: String(item.last_work_date) },
          "original_creditor": { S: String(item.original_creditor) },

          "originated_date": { S: String(item.originated_date) },
          "codebtor_city": { S: String(item.codebtor_city) },
          "codebtor_state": { S: String(item.codebtor_state) },
          "codebtor_zip": { S: String(item.codebtor_zip) },
          "debtor_city": { S: String(item.debtor_city) },
          "debtor_state": { S: String(item.debtor_state) },
          "debtor_zip": { S: String(item.debtor_zip) },
          "current_balance_due": { S: String(item.current_balance_due) },
          "interest_start_date": { S: String(item.interest_start_date) },
          "original_claim_amount": { S: String(item.original_claim_amount) },
          "original_claim_interest_rate": { S: String(item.original_claim_interest_rate) },
          "total_claim_amount": { S: String(item.total_claim_amount) },
          "creditor": { S: String(item.creditor) },
          "complaint_filed_date": { S: String(item.complaint_filed_date) },
          "current_fees": { S: String(item.current_fees) },
          "client_name": { S: String(item.client_name) },
          "lit_or_bk": { S: String(item.lit_or_bk) },
          "case_number": { S: String(item.case_number) },
          "current_claim_status": { S: String(item.current_claim_status) },
          "total_payments": { S: String(item.total_payments) },
          "Created": { S: String(today) }        
        }
      }
      
      db.putItem(param, function(err, data) {
        if(err) {
          console.log(err)
          if(res) res.send({ success: 'fail', message: 'DynamoDB Error:' + err + " AT_STEP: " + step + " " + JSON.stringify(param) })
        }
        else {
          console.log('data', data)            
        }          
      })

      if(i == placements.length - 1) {
        console.log(param)
        if(res) res.send({success: 'post call succeed!', url: req.url , body: placementsLength }  )       
      }
        
      i += 1
    })
  } catch(e) {

    console.log(e)
    if(res) res.send({ 
                        success: 'fail', 
                        message: 'API_SERVER_ERROR: ' + e + 
                                " AT_STEP: " + step + 
                                " placementLength: " + placementsLength 
                    })

  }
      
}



/********************************************************************************************************
* GET FUNCTIONS *
********************************************************************************************************/

var deleteDataTable = async (req, res)  => {

  try {
    const TABLE_NAME = await req.body.DataSource

    var deleteParams = await {
      TableName: TABLE_NAME
    }

    await db.deleteTable(deleteParams, function(err, data) {
      if(err) res.send({ success: 'fail', message: 'DELETE TABLE: ' + TABLE_NAME + ' Error: ' + err + " " + JSON.stringify(req.body) })
      else { }
    })

    res.send({ success: 'Delete table call success', url: req.url, body: TABLE_NAME })
  } catch(e) {
    res.send({ success: 'fail', url: req.url,
               message: 'API_SERVER_ERROR: ' + e  })
  }
  

}




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

      var tableCheck = await h_TableCheck(dataSource)

      console.log("THIS IS THE tableCheck", tableCheck)

      if (tableCheck) {
        var deleted = await h_DelTable(dataSource)
        if(!deleted) if(res) res.send({ success: 'fail', message: "h_DelTable Fail"})
      }
      if(deleted || !tableCheck){
        var createTable = await h_CreateTable(dataSource)
        if(!createTable) if(res) res.send({ success: 'fail', message: "h_CreateTable Fail"})
      } 
      if(createTable) postAllDataTable(req, res, str, dataSource)
      
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
  postDataTable,
  deleteDataTable
}