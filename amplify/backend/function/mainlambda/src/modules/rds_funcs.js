var aurora_config = require('../Aurora/config.js') 

var mysql = require('mysql');
// var conn = mysql.createConnection({
//     host: aurora_config.host,
//     user: aurora_config.user,
//     password: aurora_config.password,
//     database: aurora_config.database,
// });
var conn = mysql.createPool({
    connectionLimit: 10,
    host: aurora_config.host,
    user: aurora_config.user,
    password: aurora_config.password,
    database: aurora_config.database,
});

const pako = require('pako')
var atob = require('atob')
var btoa = require('btoa')

/*///////////////////////////////////////////////////////////////////////////////////////////////
  HANDLE FUNCS
///////////////////////////////////////////////////////////////////////////////////////////////*/

var postPlacements = async (req, res, base64Encoded) => {
  var step = 0
  var placementsLength = 0
  var today = new Date()
  try {
    step = 1
    const binData = atob(base64Encoded)
    step = 2
    const strData = await pako.inflate(binData, { to: 'string' })
    step = 3
    const placements = await JSON.parse(strData)
    placementsLength = placements.length
    var query = "INSERT INTO Placements (" +
      "internal_case_id,account_received_date,account_type,charged_off_date,client_business_type,client_claim_number," + 
      "collector_first_name,collector_last_name,date_entered_in_simplicity,first_delinquency_date,is_closed," + 
      "last_work_date,original_creditor,originated_date,purchased_date,referring_attorney_name,codebtor_city,codebtor_state," + 
      "codebtor_zip,debtor_city,debtor_state,debtor_zip,employer_name,current_balance_due,interest_start_date,last_payment_amount," + 
      "last_payment_date,original_claim_amount,original_claim_interest_rate,total_claim_amount,creditor,abstract_recorded_date," + 
      "answer_filed_date,attorney_name,bank_garnish_received_date,bank_garnish_sent_date,complaint_amount,complaint_filed_date," + 
      "complaint_sent_date,complaint_summons_sent_date,complaint_summons_served_date,docket_number,garnish_wages_received_date," + 
      "garnish_wages_sent_date,judgment_amount,judgment_county_name,satisfaction_judgment_sent_date,supplemental_exam_date," + 
      "writ_return_date,writ_sent_date,attorney_fees_awarded,attorney_fees_sought,current_fees,total_attorney_fees," + 
      "client_name,lit_or_bk,case_number,judgment_entered_date,vintage_date,judgment_type,last_payment_netted_amount," + 
      "current_claim_status,payment_plan_amount_1,payment_plan_date_1,frequency,no_of_payments,total_payments, createddate" +
      ") VALUES ?"

    var values = []

    console.dir("QUERY")
    console.log(query)
    console.dir("DATA")
    // console.log("PLACEMENTS", placements)

    placements.forEach(item => {
      values.push(
        [
          item.internal_case_id,item.account_received_date,item.account_type,item.charged_off_date,item.client_business_type,
          item.client_claim_number,item.collector_first_name,item.collector_last_name,item.date_entered_in_simplicity,item.first_delinquency_date,
          item.is_closed,item.last_work_date,item.original_creditor,item.originated_date,item.purchased_date,item.referring_attorney_name,
          item.codebtor_city,item.codebtor_state,item.codebtor_zip,item.debtor_city,item.debtor_state,item.debtor_zip,item.employer_name,
          item.current_balance_due,item.interest_start_date,item.last_payment_amount,item.last_payment_date,item.original_claim_amount,
          item.original_claim_interest_rate,item.total_claim_amount,item.creditor,item.abstract_recorded_date,item.answer_filed_date,item.attorney_name,
          item.bank_garnish_received_date,item.bank_garnish_sent_date,item.complaint_amount,item.complaint_filed_date,item.complaint_sent_date,
          item.complaint_summons_sent_date,item.complaint_summons_served_date,item.docket_number,item.garnish_wages_received_date,
          item.garnish_wages_sent_date,item.judgment_amount,item.judgment_county_name,item.satisfaction_judgment_sent_date,item.supplemental_exam_date,
          item.writ_return_date,item.writ_sent_date,item.attorney_fees_awarded,item.attorney_fees_sought,item.current_fees,item.total_attorney_fees,
          item.client_name,item.lit_or_bk,item.case_number,item.judgment_entered_date,item.vintage_date,item.judgment_type,item.last_payment_netted_amount,
          item.current_claim_status,item.payment_plan_amount_1,item.payment_plan_date_1,item.frequency,item.no_of_payments,item.total_payments, today
        ]
      )
    })
    console.log("VALUES", values)
    var promise = new Promise((resolve, reject) => {
      conn.query(query, [values], (err, result) => {
        // conn.release()
        if (err) {
          console.log("MySQL DB Error:", err)
          resolve(err)
        } else {
          console.log("Placements POST successful!")
          resolve(result)
        }
      })
    }).then((results) => { return results })
    console.log("PROMISE", promise)
    return promise
  } catch(error) {
    console.log("API postPlacements Error:", error)
    return {  error: 1,
              success: 'fail',
              url: req.url,
              message: 'API_SERVER_ERROR: ' + error + 
                      " AT_STEP: " + step + 
                      " placementLength: " + placementsLength 
          }
  }
}

var dateFormatter = (value) => {
  if(!value) return null
  var date = new Date(value)
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  var day = date.getDate()
  var result = year + "-" + month + "-" + day
  return result
}


var postRevenue = async (req, res, base64Encoded) => {

  var step = 0
  var paymentsLength = 0
  var today = new Date()

  try {
    step = 1
    const binData = atob(base64Encoded)
    step = 2
    const strData = await pako.inflate(binData, { to: 'string' })
    step = 3
    const payments = await JSON.parse(strData)
    paymentsLength = payments.length

    var query = "INSERT INTO Revenue (" +
      "Debtor, SSN, AccountNum, ClientClaimNum, Client, PaymentDate," +
      "Description, Collector, Amount, Agency, ClientAmount, CommPerc, CreatedDate" +
      ") VALUES ?"

    var values = []

    console.dir("QUERY")
    console.log(query)
    console.dir("DATA")
    console.log("PAYMENTS", payments)

    payments.forEach(item => {
      var paymentDate = dateFormatter(item.Date)

      var amount = Number(item.Amount.replace(/[^0-9-\.]+/g, ""))
      var agency = Number(item.Agency.replace(/[^0-9-\.]+/g, ""))
      var clientAmount = Number(item.ClientAmount.replace(/[^0-9-\.]+/g, ""))

      var commPerc = item.CommPerc.replace(/[%]+/g, "")

      values.push(

        [
         item.Debtor, item.SSN, item.AccountNum, item.CleintClaimNum, item.Client, paymentDate,
         item.Descripttion, item.Collector, amount, agency, clientAmount, 
         commPerc, today
        ]

      )
    })

    console.log("VALUES", values)
    var promise = new Promise((resolve, reject) => {
      conn.query(query, [values], (err, result) => {
        // conn.release()
        if (err) {
          console.log("MySQL DB Error:", err)
          resolve(err)
        } else {
          console.log("Revenue POST successful!")
          resolve(result)
        }
      })
    }).then((results) => { return results })
    console.log("PROMISE", promise)
    return promise
  } catch(error) {
    console.log("API postRevenue Error:", error)

    return {  error: 1,
              success: 'fail',
              url: req.url,
              message: 'API_SERVER_ERROR: ' + error + 
                      " AT_STEP: " + step + 
                      " paymentsLength: " + paymentsLength,
              result: {}
          }
  }
}


var postReminders = async (req, res, base64Encoded) => {

  var step = 0
  var remindersLength = 0
  var today = new Date()

  try {
    step = 1
    const binData = atob(base64Encoded)
    step = 2
    const strData = await pako.inflate(binData, { to: 'string' })
    step = 3
    const reminders = await JSON.parse(strData)
    remindersLength = reminders.length

    var query = "INSERT INTO Reminders (" +
      "priority, notes, repeats, due_datetime, completion_date, is_user_group," + 
      "debtor_name, tickler_type, collector, account_number, CreatedDate" +
      ") VALUES ?"

    var values = []

    console.dir("QUERY")
    console.log(query)
    console.dir("DATA")
    console.log("REMINDERS", reminders)

    reminders.forEach(item => {
      values.push(
        [
         item.priority, item.notes, item.repeates, item.due_datetime,
         item.completion_date, item.is_user_group, item.debtor_name,
         item.tickler_type, item.collector, item.account_number, today
        ]
      )
    })

    console.log("VALUES", values)
    var promise = new Promise((resolve, reject) => {
      conn.query(query, [values], (err, result) => {
        // conn.release()
        if (err) {
          console.log("MySQL DB Error:", err)
          resolve(err)
        } else {
          console.log("Reminders POST successful!")
          resolve(result)
        }
      })
    }).then((results) => { return results })
    console.log("PROMISE", promise)
    return promise
  } catch(error) {
    console.log("API postReminders Error:", error)

    return {  error: 1,
              success: 'fail',
              url: req.url,
              message: 'API_SERVER_ERROR: ' + error + 
                      " AT_STEP: " + step + 
                      " remindersLength: " + remindersLength,
              result: {}
          }
  }
}


/*///////////////////////////////////////////////////////////////////////////////////////////////
  POST FUNCS
///////////////////////////////////////////////////////////////////////////////////////////////*/

var postDataTable = (req, res) => {
  if (req.body.DataSource == 'All_Data') {
    postPlacements(req, res, req.body.Data)
  } else if (req.body.DataSource == 'Acct_Summary') {
    postRevenue(req, res, req.body.Data) 
  } else if (req.body.DataSource == 'Tickler_Report') {
    postReminders(req, res, req.body.Data)
  } else {
    res.send({ error: 1, 
               success: 'postDataTable Fail',
               url: req.url,
               message: 'DataSource not found', 
               result: {} })
  }
}

var truncateDataTable = async (req, res) => {
  try {
    var dataSource = req.body.DataSource
    if(dataSource == 'All_Data') {
      var query = await "truncate table reportingsweet.Placements"
    } else if(dataSource == 'Tickler_Report') {
      var query = await "truncate table reportingsweet.Reminders"
    } else if (dataSource == 'Acct_Summary') {
      var query = await "truncate table reportingsweet.Revenue"
    } else {
      throw "DataSource not found"
    }
    var promise = new Promise((resolve, reject) => {
      conn.query(query, (error, result) => {
        // conn.release()
        if(error) {
          console.log("MYSQL DB ERROR:", error)
          resolve(error)
        } else {
          // console.log("RESULT", result)
          resolve(result)
        }
      })
    }).then((results) => { return results })
  
    return { result: promise, error: 0 }
  } catch(e) {
    console.log("MYSQL TRUNCATE TABLE ERROR:", e)
    return { result: "MYSQL TRUNCATE TABLE ERROR: " + e, error: 1 }
  }
}

/*///////////////////////////////////////////////////////////////////////////////////////////////
  GET FUNCS
///////////////////////////////////////////////////////////////////////////////////////////////*/

var getReminders = (req, res) => {
  try {
    var query = "select * from reportingsweet.Reminders;"
    var promise = new Promise((resolve, reject) => {
        conn.query(query, (error, results) => {
          // conn.release()
          if(error) {
            console.log("MYSQL DB ERROR:", error)
            resolve(error)
          } else {
            resolve(results)
          }
        })
      }).then((results) => { return results })
    return promise
  } catch(e) {
    console.log("MYSQL SELECT TABLE ERROR:", e)
    return { result: "MYSQL SELECT TABLE ERROR: " + e, error: 1 }
  }
}

var getPlacements = (req, res) => {
  try {
    var query = "select * from reportingsweet.Placements;"
    var promise = new Promise((resolve, reject) => {
        conn.query(query, (error, results) => {
          // conn.release()
          if(error) {
            console.log("MYSQL DB ERROR:", error)
            resolve(error)
          } else {
            resolve(results)
          }
        })
      }).then((results) => { return results })
    return promise
  } catch(e) {
    console.log("MYSQL SELECT TABLE ERROR:", e)
    return { result: "MYSQL SELECT TABLE ERROR: " + e, error: 1 }
  }
}

var getRevenue = (req, res) => {
  try {
    var query = "select * from reportingsweet.Revenue;"
    var promise = new Promise((resolve, reject) => {
        conn.query(query, (error, results) => {
          // conn.release()
          if(error) {
            console.log("MYSQL DB ERROR:", error)
            resolve(error)
          } else {
            resolve(results)
          }
        })
      }).then((results) => { return results })
    return promise
  } catch(e) {
    console.log("MYSQL SELECT TABLE ERROR:", e)
    return { result: "MYSQL SELECT TABLE ERROR: " + e, error: 1 }
  }
}

var listTables = (req, res) => {
  try {
    var promise = new Promise((resolve, reject) => {
      conn.query('show tables', (error, results, fields) => {
        // conn.release()
        if (error) {
            console.log(error)
            resolve(error)
        } else {
            // console.log("INSIDE CONN results:", results);
            resolve(results)
            // conn.end(function (err) { if(err) console.log(err) })
        }
      })
    }).then((results) => { return results})
    return promise
  } catch(e) {
    console.log(e)
    return "MYSQL LIST TABLE ERROR: " + e
  }
}


module.exports = {

  postPlacements,
  postDataTable,
  truncateDataTable,

  getReminders,
  getPlacements,
  getRevenue,

  listTables

}