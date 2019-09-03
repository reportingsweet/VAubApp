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

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: aurora_config.host,
    user: aurora_config.user,
    password: aurora_config.password,
    database: aurora_config.database,
});

// import axios from 'axios'
  // or 

// var axios = require('axios')


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(compression())

// Enable CORS for all methods
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*")
  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


  next()
});

app.listen(3002, async function() {
  console.log("App started")


  var db_funcs = require('./modules/db_funcs')
  var tableList = await db_funcs.listTables().then(data => { return data })
  console.log("Table List", tableList.TableNames)
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

    // rds_funcs.postPlacements(false, false, data)



  var preInput = pako.deflate(JSON.stringify(data), { to: 'string' })
  var input = btoa(preInput)

  connection.query('show tables', function (error, results, fields) {
    if (error) {
        connection.destroy();
        console.log(error)
        throw error;
    } else {
        // connected!
        console.log(results);
        // callback(error, results);
        connection.end(function (err) { if(err) console.log(err) });
    }
});


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



const AWS = require('aws-sdk')
const db = new AWS.DynamoDB({apiVersion: '2012-08-10', region: 'us-east-1'})

const dynamo_config = require('./Dynamo/config.js')


/********************************************************************************************************
* FILE IMPORTS *
********************************************************************************************************/

var db_funcs = require('./modules/db_funcs')
var rds_funcs = require('./modules/rds_funcs')

/********************************************************************************************************
* GET METHODS *
********************************************************************************************************/


app.get('/g/PlacementVintages', function(req, res) {
  db_funcs.getPlacementVintages(req, res)
})

app.get('/g/TableList', async function(req, res) {
  var list = await db_funcs.listTables().then(data => { return data })
  res.send({ success: 'TableList call succeeded', url: req.url, body: list })
})


/********************************************************************************************************
* WRITE METHODS *
********************************************************************************************************/

// POSTS

app.post('/p/DataTable', async function(req, res) {


  db_funcs.postDataTable(req, res).then(data => { return data })

})

app.post('/p/PlacementVintages', async function(req, res) {
  // db_funcs.postPlacementVintages(req, res)

  const placementVins = await JSON.parse(req.body.Data)
  
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
  }
})


// DELETES

app.delete('/d/DataTable', async function(req, res) {

  db_funcs.deleteDataTable(req, res)
  res.send({ success: 'Delete table call success', url: req.url })

})

app.delete('/d/PlacementVintages', async function(req, res) {

  const TABLE_NAME = 'PlacementVintages'

  var params = {
    // ExclusiveStartTableName: TABLE_NAME,
    Limit: 1
  }

  var createParams = {
    TableName: TABLE_NAME,
    AttributeDefinitions: [{ AttributeName: "Vintage", AttributeType: "S"}],
    KeySchema: [{ AttributeName: "Vintage", KeyType: "HASH"}],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5, 
      WriteCapacityUnits: 5
    }
  }

  var deleteParams = {
    TableName: TABLE_NAME
  }

  db.listTables(params, async function(err, data) {

    if (err) res.send({ success: 'fail', message: 'DELETE TABLE Error: Server Error' + err})
    else {

      if(data.TableNames.includes(TABLE_NAME)) {

        // DELETE TABLE
        await db.deleteTable(deleteParams, function(err, data) {
          if (err) res.send({ success: 'fail', message: 'DELETE TABLE Error: Server Error' + err})
          else {
            // db.createTable(createParams, function(err, data) {
            //   if (err) res.send({ success: 'fail', message: 'CREATE TABLE Error: Server Error' + err})
            //   else { 
                // res.json({success: 'delete table call succeed!', url: req.url})
            
              // }
            // })
          }
        })

        res.json({success: 'delete table call success!', url: req.url, body: data.TableNames })

      } else {

        // CREATE TABLE
        await db.createTable(createParams, function(err, data) {
          if (err) res.send({ success: 'fail', message: 'CREATE TABLE Error: Server Error' + err})
          else { 
            // res.json({success: 'create table call succeed!', url: req.url}) 
          }
        })

        res.json({success: 'create table call success!', url: req.url, body: data })

      }
    }
  })

  // res.json({success: 'delete call succeed!', url: req.url})
})

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call success!', url: req.url});
})




module.exports = app
