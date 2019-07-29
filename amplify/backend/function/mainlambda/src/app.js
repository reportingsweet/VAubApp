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

// declare a new express app
var app = express()

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


var db_funcs = require('./modules/db_funcs')





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
* POST METHODS *
********************************************************************************************************/



app.post('/p/DataTable', async function(req, res) {


  var response = await db_funcs.postDataTable(req, res).then(data => { return data })

  var success = await response.includes('ERROR') ? false : true



  res.send({success: success, url: req.url, body: response })


})








app.post('/p/PlacementVintages', async function(req, res) {
  // db_funcs.postPlacementVintages(req, res)

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
        if(res) res.send({success: 'post call succeed!', url: req.url, body: JSON.stringify(placementVins) })
      }
  }
})


/****************************
* Example delete method *
****************************/

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

        res.json({success: 'delete table call succeed!', url: req.url, body: data.TableNames })

      } else {

        // CREATE TABLE
        await db.createTable(createParams, function(err, data) {
          if (err) res.send({ success: 'fail', message: 'CREATE TABLE Error: Server Error' + err})
          else { 
            // res.json({success: 'create table call succeed!', url: req.url}) 
          }
        })

        res.json({success: 'create table call succeed!', url: req.url, body: data })

      }
    }
  })

  // res.json({success: 'delete call succeed!', url: req.url})
})

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
})




module.exports = app
