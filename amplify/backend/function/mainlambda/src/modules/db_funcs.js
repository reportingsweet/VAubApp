
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB({apiVersion: '2012-08-10', region: 'us-east-1'})

const dynamo_config = require('../Dynamo/config.js')

const pako = require('pako')
const zlib = require('zlib')

var atob = require('atob')


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

var postDataTable = async (req, res) => {

  var step = []
  try {

    // const denc = await new TextDecoder()

    await step.push(1)
    var str = await atob(req.body.Data)

    await step.push(2)
    var charData = await str.split('').map(function(x){return x.charCodeAt(0) })

    await step.push(3)
    var binData = await new Uint8Array(charData)

    await step.push(4)
    var uncompressed = await pako.inflate(binData, { to: 'string' })

    await step.push(5)
    let decoded = await uncompressed //String.fromCharCode.apply(null, new Uint16Array(uncompressed))
    // let decoded = await denc.decode(uncompressed)

    await step.push(6)
    let data = await decoded // JSON.parse(decoded) //JSON.parse(decoded)

    return data

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