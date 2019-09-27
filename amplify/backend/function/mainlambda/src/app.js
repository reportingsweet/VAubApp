/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var compression = require('compression')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

var aurora_config = require('./Aurora/config.js')

// var Base64 = require('js-base64').Base64
const pako = require('pako')
var btoa = require('btoa')

// declare a new express app
var app = express()

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: aurora_config.host,
//     user: aurora_config.user,
//     password: aurora_config.password,
//     database: aurora_config.database,
// });

// import axios from 'axios'
  // or 

// var axios = require('axios')
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }))
app.use(express.static('public'))
app.use(awsServerlessExpressMiddleware.eventContext())

// HAD TO REMOVE compression 9/25/2019
//causing error when data exceeds 1mb
// app.use(compression())

// Enable CORS for all methods
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*")
  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  // res.header("Accept-Encoding: identity")



  next()
});

app.listen(3002, async function() {
  console.log("App started")


  var db_funcs = require('./modules/db_funcs')
  // var tableList = await db_funcs.listTables().then(data => { return data })
  // console.log("Table List", tableList.TableNames)
  var getPVins = await db_funcs.getPlacementVintages()
  console.log("Placement Vintages:", getPVins)

  var data = await [{
        "internal_case_id":"1",
        "account_received_date":"5/8/15",
        "account_type":"COMM",
        "charged_off_date":"1/30/15",
        "client_claim_number":"129505",
        "collector_first_name":"Vinnie",
        "collector_last_name":"Aubrey",
        "date_entered_in_simplicity":"5/10/15",
        "is_closed":"Open",
        "last_work_date":"1/16/19",
        "original_creditor":"CCAS",
        "originated_date":"8/25/14",
        "codebtor_city":"Kennesaw",
        "codebtor_state":"GA",
        "codebtor_zip":"30152",
        "debtor_city":"Kennesaw",
        "debtor_state":"GA",
        "debtor_zip":"30152",
        "current_balance_due":"$77,604.95 ",
        "interest_start_date":"8/24/15",
        "original_claim_amount":"$57,855.00 ",
        "original_claim_interest_rate":"10",
        "total_claim_amount":"$57,855.00 ",
        "creditor":"CCAS",
        "complaint_filed_date":"11/9/17",
        "current_fees":"$0.00 ",
        "client_name":"Short name",
        "lit_or_bk":"Lit",
        "case_number":"2015-0001",
        "current_claim_status":"Late Payment",
        "total_payments":"$0.00 "
      }, 
      {
        "internal_case_id":"2",
        "account_received_date":"5/8/15",
        "account_type":"COMM",
        "charged_off_date":"1/30/15",
        "client_claim_number":"129505",
        "collector_first_name":"Vinnie",
        "collector_last_name":"Aubrey",
        "date_entered_in_simplicity":"5/10/15",
        "is_closed":"Open",
        "last_work_date":"1/16/19",
        "original_creditor":"CCAS",
        "originated_date":"8/25/14",
        "codebtor_city":"Kennesaw",
        "codebtor_state":"GA",
        "codebtor_zip":"30152",
        "debtor_city":"Kennesaw",
        "debtor_state":"GA",
        "debtor_zip":"30152",
        "current_balance_due":"$77,604.95 ",
        "interest_start_date":"8/24/15",
        "original_claim_amount":"$57,855.00 ",
        "original_claim_interest_rate":"10",
        "total_claim_amount":"$57,855.00 ",
        "creditor":"CCAS",
        "complaint_filed_date":"11/9/17",
        "current_fees":"$0.00 ",
        "client_name":"Short name",
        "lit_or_bk":"Lit",
        "case_number":"2015-0001",
        "current_claim_status":"Late Payment",
        "total_payments":"$0.00 "
      },
      {
        "internal_case_id":"4",
        "account_received_date":"5/8/15",
        "account_type":"COMM",
        "charged_off_date":"1/30/15",
        "client_claim_number":"129505",
        "collector_first_name":"Vinnie",
        "collector_last_name":"Aubrey",
        "date_entered_in_simplicity":"5/10/15",
        "is_closed":"Open",
        "last_work_date":"1/16/19",
        "original_creditor":"CCAS",
        "originated_date":"8/25/14",
        "codebtor_city":"Kennesaw",
        "codebtor_state":"GA",
        "codebtor_zip":"30152",
        "debtor_city":"Kennesaw",
        "debtor_state":"GA",
        "debtor_zip":"30152",
        "current_balance_due":"$77,604.95 ",
        "interest_start_date":"8/24/15",
        "original_claim_amount":"$57,855.00 ",
        "original_claim_interest_rate":"10",
        "total_claim_amount":"$57,855.00 ",
        "creditor":"CCAS",
        "complaint_filed_date":"11/9/17",
        "current_fees":"$0.00 ",
        "client_name":"Short name",
        "lit_or_bk":"Lit",
        "case_number":"2015-0001",
        "current_claim_status":"Late Payment",
        "total_payments":"$0.00 "
      },
      {
        "internal_case_id":"5",
        "account_received_date":"5/8/15",
        "account_type":"COMM",
        "charged_off_date":"1/30/15",
        "client_claim_number":"129505",
        "collector_first_name":"Vinnie",
        "collector_last_name":"Aubrey",
        "date_entered_in_simplicity":"5/10/15",
        "is_closed":"Open",
        "last_work_date":"1/16/19",
        "original_creditor":"CCAS",
        "originated_date":"8/25/14",
        "codebtor_city":"Kennesaw",
        "codebtor_state":"GA",
        "codebtor_zip":"30152",
        "debtor_city":"Kennesaw",
        "debtor_state":"GA",
        "debtor_zip":"30152",
        "current_balance_due":"$77,604.95 ",
        "interest_start_date":"8/24/15",
        "original_claim_amount":"$57,855.00 ",
        "original_claim_interest_rate":"10",
        "total_claim_amount":"$57,855.00 ",
        "creditor":"CCAS",
        "complaint_filed_date":"11/9/17",
        "current_fees":"$0.00 ",
        "client_name":"Short name",
        "lit_or_bk":"Lit",
        "case_number":"2015-0001",
        "current_claim_status":"Late Payment",
        "total_payments":"$0.00 "
      },
      {
        "internal_case_id":"6",
        "account_received_date":"5/8/15",
        "account_type":"COMM",
        "charged_off_date":"1/30/15",
        "client_claim_number":"129505",
        "collector_first_name":"Vinnie",
        "collector_last_name":"Aubrey",
        "date_entered_in_simplicity":"5/10/15",
        "is_closed":"Open",
        "last_work_date":"1/16/19",
        "original_creditor":"CCAS",
        "originated_date":"8/25/14",
        "codebtor_city":"Kennesaw",
        "codebtor_state":"GA",
        "codebtor_zip":"30152",
        "debtor_city":"Kennesaw",
        "debtor_state":"GA",
        "debtor_zip":"30152",
        "current_balance_due":"$77,604.95 ",
        "interest_start_date":"8/24/15",
        "original_claim_amount":"$57,855.00 ",
        "original_claim_interest_rate":"10",
        "total_claim_amount":"$57,855.00 ",
        "creditor":"CCAS",
        "complaint_filed_date":"11/9/17",
        "current_fees":"$0.00 ",
        "client_name":"Short name",
        "lit_or_bk":"Lit",
        "case_number":"2015-0001",
        "current_claim_status":"Late Payment",
        "total_payments":"$0.00 "
      },
      {
        "internal_case_id":"7",
        "account_received_date":"5/8/15",
        "account_type":"COMM",
        "charged_off_date":"1/30/15",
        "client_claim_number":"129505",
        "collector_first_name":"Vinnie",
        "collector_last_name":"Aubrey",
        "date_entered_in_simplicity":"5/10/15",
        "is_closed":"Open",
        "last_work_date":"1/16/19",
        "original_creditor":"CCAS",
        "originated_date":"8/25/14",
        "codebtor_city":"Kennesaw",
        "codebtor_state":"GA",
        "codebtor_zip":"30152",
        "debtor_city":"Kennesaw",
        "debtor_state":"GA",
        "debtor_zip":"30152",
        "current_balance_due":"$77,604.95 ",
        "interest_start_date":"8/24/15",
        "original_claim_amount":"$57,855.00 ",
        "original_claim_interest_rate":"10",
        "total_claim_amount":"$57,855.00 ",
        "creditor":"CCAS",
        "complaint_filed_date":"11/9/17",
        "current_fees":"$0.00 ",
        "client_name":"Short name",
        "lit_or_bk":"Lit",
        "case_number":"2015-0001",
        "current_claim_status":"Late Payment",
        "total_payments":"$0.00 "
      },
      {
        "internal_case_id":"8",
        "account_received_date":"5/8/15",
        "account_type":"COMM",
        "charged_off_date":"1/30/15",
        "client_claim_number":"129505",
        "collector_first_name":"Vinnie",
        "collector_last_name":"Aubrey",
        "date_entered_in_simplicity":"5/10/15",
        "is_closed":"Open",
        "last_work_date":"1/16/19",
        "original_creditor":"CCAS",
        "originated_date":"8/25/14",
        "codebtor_city":"Kennesaw",
        "codebtor_state":"GA",
        "codebtor_zip":"30152",
        "debtor_city":"Kennesaw",
        "debtor_state":"GA",
        "debtor_zip":"30152",
        "current_balance_due":"$77,604.95 ",
        "interest_start_date":"8/24/15",
        "original_claim_amount":"$57,855.00 ",
        "original_claim_interest_rate":"10",
        "total_claim_amount":"$57,855.00 ",
        "creditor":"CCAS",
        "complaint_filed_date":"11/9/17",
        "current_fees":"$0.00 ",
        "client_name":"Short name",
        "lit_or_bk":"Lit",
        "case_number":"2015-0001",
        "current_claim_status":"Late Payment",
        "total_payments":"$0.00 "
      },
      {
        "internal_case_id":"9",
        "account_received_date":"5/8/15",
        "account_type":"COMM",
        "charged_off_date":"1/30/15",
        "client_claim_number":"129505",
        "collector_first_name":"Vinnie",
        "collector_last_name":"Aubrey",
        "date_entered_in_simplicity":"5/10/15",
        "is_closed":"Open",
        "last_work_date":"1/16/19",
        "original_creditor":"CCAS",
        "originated_date":"8/25/14",
        "codebtor_city":"Kennesaw",
        "codebtor_state":"GA",
        "codebtor_zip":"30152",
        "debtor_city":"Kennesaw",
        "debtor_state":"GA",
        "debtor_zip":"30152",
        "current_balance_due":"$77,604.95 ",
        "interest_start_date":"8/24/15",
        "original_claim_amount":"$57,855.00 ",
        "original_claim_interest_rate":"10",
        "total_claim_amount":"$57,855.00 ",
        "creditor":"CCAS",
        "complaint_filed_date":"11/9/17",
        "current_fees":"$0.00 ",
        "client_name":"Short name",
        "lit_or_bk":"Lit",
        "case_number":"2015-0001",
        "current_claim_status":"Late Payment",
        "total_payments":"$0.00 "
      }
    ]


    // var preInput = pako.deflate(JSON.stringify(data), { to: 'string' })
    // var input = btoa(preInput)

    // USE THIS TO POST DUMMY DATA
    // rds_funcs.postPlacements(false, false, input)


    // var list = await rds_funcs.listTables() 
    // console.log("app.js list:", list)


  // db_funcs.postDataTable(
  //             { body: { Data: input, DataSource: 'All_Data' }}, false
  //         )

  // console.log("postDataTable", postDataTable)

  // var params = await {
  //   TableName: "PlacementVintages",
  //   Item: {
  //     "Vintage": '2019-01-01',
  //     "UnitYeild": 'a',
  //     "TotalOriginalClaimAmt":'a',
  //     "TotalFees": 'a',
  //     "TotalCollectedCalc": 'a',
  //     "SuitTillJudgment": 'a',
  //     "SuitRate": 'a',
  //     "SuedCount": 'a',
  //     "ServedCount": 'a',
  //     "ServedConvRate": 'a',
  //     "RecentPmtPct": 'a',
  //     "PlacedTillJudgment": 'a',
  //     "OpenFiles": 'a',
  //     "NetLiquidation": 'a',
  //     "LocalCounselRate": 'a',
  //     "Liquidation": 'a',
  //     "JmtRate": 'a',
  //     "JmtCount": 'a',
  //     "FileCount": 'a',
  //     "FaceValue": 'a',
  //     "ContingencyRate": 'a',
  //     "ComplaintTillService": 'a',
  //     "ClosedFiles": 'a',
  //     "AvgPlacementTillSuit": 'a',
  //     "Created": 'a'       
  //   }
  // }

  // var req = { body: { data: JSON.stringify(params.Item) }}
  // var res = false
  // var postPV = db_funcs.postPlacementVintages(req, res)


});



// const AWS = require('aws-sdk')
// const db = new AWS.DynamoDB({apiVersion: '2012-08-10', region: 'us-east-1'})

// const dynamo_config = require('./Dynamo/config.js')


/********************************************************************************************************
* FILE IMPORTS *
********************************************************************************************************/

var db_funcs = require('./modules/db_funcs')
var rds_funcs = require('./modules/rds_funcs')

/********************************************************************************************************
* GET METHODS *
********************************************************************************************************/

app.get('/g/TableList', async function(req, res) {

  try {
    var result = await rds_funcs.listTables() //.then(data => { return data })

    res.send({ error: 0, success: 'TableList call succeeded', url: req.url, result: result })
  } catch (e) {
    res.send({ error: 1, success: 'TableList call Failed', url: req.url, result: e })
  }

})

app.get('/g/PlacementVintages', function(req, res) {

})

app.get('/g/Reminders', async function(req, res) {
  try {
    var result = await rds_funcs.getReminders().then((data) => { return data })
    // console.log("API CALL RESULT:", result)
    res.send({  statusCode: 200,                
                body: JSON.stringify(result),
                isBase64Encoded: true 
      })
  } catch(e) {
    res.send({ error: 1, success: 'Reminders call Failed', url: req.url, result: e })
  }
})

app.get('/g/Placements', async function(req, res) {
  try {
    var result = await rds_funcs.getPlacements().then((data) => { return data })
    // console.log("API CALL RESULT:", result)
    res.send({  statusCode: 200,                
                body: JSON.stringify(result),
                isBase64Encoded: true 
      })
  } catch(e) {
    res.send({ error: 1, success: 'Placements call Failed', url: req.url, result: e })
  }
})

app.get('/g/Revenue', async function(req, res) {
  try {
    var result = await rds_funcs.getRevenue().then((data) => { return data })
    // console.log("API CALL RESULT:", result)
    res.send({  statusCode: 200,                
                body: JSON.stringify(result),
                isBase64Encoded: true 
      })
  } catch(e) {
    res.send({ error: 1, success: 'Revenue call Failed', url: req.url, result: e })
  }
})


/********************************************************************************************************
* WRITE METHODS *
********************************************************************************************************/

// POSTS


app.post('/p/DataTable', async function(req, res) {

  try {
    var result = await rds_funcs.postDataTable(req, res) //.then(data => { return data })
    res.send({ error: 0, sucess: "DataTable POST successful", url: req.url, result: result })
  } catch(e) {
    console.log("DataTable post Failed", e)
    res.send({ error: 1, sucess: "DataTable POST Failed", url: req.url, result: e })
  }
})

app.post('/p/PlacementVintages', async function(req, res) {

 
})


// DELETES

app.delete('/d/DataTable', async function(req, res) {

  var result = rds_funcs.truncateDataTable(req, res)

  res.send({ error: result.error, success: "", url: req.url, result: result.result })

})

app.delete('/d/PlacementVintages', async function(req, res) {

 
})

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call success!', url: req.url });
})




module.exports = app
