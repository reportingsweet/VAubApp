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
app.use(bodyParser.json({ limit: '200mb', type: 'application/json' }))
app.use(express.static('public'))
app.use(awsServerlessExpressMiddleware.eventContext())

// HAD TO REMOVE compression 9/25/2019
//causing error when data exceeds 1mb
// app.use(compression())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.listen(3002, async function() {
  console.log("App started")
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
    var result = await rds_funcs.getReminders().then((response) => { return response })
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
  app.use(compression())
  try {
    var result = await rds_funcs.getPlacements().then((response) => { return response })
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
    var result = await rds_funcs.getRevenue().then((response) => { return response })
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
    var result = await rds_funcs.postDataTable(req, res).then(response => { return response })
    res.send({ statusCode: 200, 
               body: result, 
               isBase64Encoded: false,
               error: 0
    })
  } catch(e) {
    console.log("DataTable post Failed", e)
    res.send({ error: 1, sucess: "DataTable POST Failed", body: e })
  }
})

app.post('/p/PlacementVintages', async function(req, res) {

 
})


// DELETES

app.delete('/d/DataTable', async function(req, res) {
  try {
    var result = await rds_funcs.truncateDataTable(req, res).then((response) => { return response })
    res.send({ statusCode: 200, body: result, isBase64Encoded: false, error: 0 })
  } catch(e) {
    console.log(req.url + " Failed", e)
    res.send({ error: 1, sucess: "DataTable TRUNCATE Failed", body: e })
  }
})

app.delete('/d/PlacementVintages', async function(req, res) {

 
})

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call success!', url: req.url });
})




module.exports = app
