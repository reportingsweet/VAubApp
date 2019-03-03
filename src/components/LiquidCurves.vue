<template>
    <div :data="filteredData" :input="IDXdbCases">
        <div class="grid">
            <div class="col1">
                 <b-form-group horizontal  label="Client" class="mb-0" style="font-weight: bold;padding-top: 4px;">
                    <b-input-group size="sm" style="width: 200px;">
                    <b-form-select v-model="client" aria-describedby="" style="float:left;">
                        <option>(Select All)</option>
                        <option v-for="(value, key, index) in clientDistinct">{{ value }}</option>
                    </b-form-select>
                    <b-input-group-append>
                        <b-btn :disabled="client=='(Select All)'" @click="client='(Select All)'">Clear</b-btn>
                    </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </div>
            <div class="col2">
                 <div style="margin-left: 10px;" class="large-12 medium-12 small-12 cell">
                    <label>File
                        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
                    </label>
                </div>
            </div>
        </div>
       

       

        <b-card style="max-width: 1000px;margin: 10px auto 0 auto ;">
            <highcharts :options="chartOptions" >                
            </highcharts>   
        </b-card> 

    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Chart } from 'highcharts-vue'
import  { Highcharts, moment } from '@/main'

export default {
    components: {
        highcharts: Chart
    },
    data() {
        return {
            name: 'Liquidation Curves',
            isImport: 1,
            isCasesImport: 1,
            client: '(Select All)',
            chartOptions: {
                
                chart: {
                    zoomType: 'xy',
                    type: 'column',
                    events: {
                        load: function() {
                            
                        },
                        addSeries: function(name, type, data) {

                        }
                    }
                   
                },
                title: {
                    text: 'Liquidation Curves'
                },
                subtitle: {
                    text: 'by Placement Vintage'
                },
                xAxis: [{
                    categories: [],
                    crosshair: true
                }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
                , {categories: [], crosshair: true }
              
                ],
                // yAxis: [{}],
                yAxis: [{ // Primary yAxis
                    
                    labels: {
                        formatter: function (a) {
                                return (Math.round(a.value*100))  + "%" 
                        },
                        // format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'Collection Rate',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                     },
                     tickInterval: .01
                    } ],

                tooltip: {
                    shared: true
                },
                legend: {
                    maxHeight: 150,
                    layout: 'vertical',
                    align: 'left',
                    x: 60,
                    verticalAlign: 'top',
                    y: 20,
                    floating: true,
                    // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
                },
                series: [{
                    data: [],
                    type: 'spline',
                    name: '2015-05-01'
                }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                , {data: [],type: 'spline', name: '' }
                ],
                credits: {
                    enabled: false
                }
        
            }
        }
    },
    created () {
        this.$store.dispatch('getAllCases')
        this.$store.dispatch('getAllPayments')
    },
    computed: {
        ...mapGetters([
            'allCases',
            'allPayments'
        ]),
         IDXdbCases () {
            var self = this
            var dbName = 'Cases'
            var version = 1
            var request = indexedDB.open(dbName, version)

            // var cases = []

            if(request) {

                 request.onsuccess = function (event) {
                    console.log("IDXdbCases IDXDB On Success")
                    var db = event.target.result
                    // console.log(db)
                
                    var tx = db.transaction(["Cases"], "readwrite").objectStore("Cases")
                    // console.log(tx)
                    tx.onerror = function (event) {
                        console.log("Transaction Error:", event)
                    }
                
                    var objectStore = tx //.objectStore("Cases")
         
                
                    if(objectStore)  
                        objectStore.get(0).onsuccess = function (event) {
                            self.$store.dispatch('getAllCases', { Cases: event.target.result, isImport: 0 }) 
                        }
                    // db.close()
                }

                request.onupgradeneeded = function (event) {
                    console.log(" onupgradeneeded Create IDX DB", dbName)
                    var db = event.target.result
                    // var tx = db.transaction('Cases', "readwrite")
                    // tx.onerror = function (event) {
                    //     console.log("Transaction Error:", event)
                    // }
                    var objStore = db.createObjectStore("Cases")
                    // db.close()
                    // var objectStore = tx.objectStore("Cases")
                    // objStore.add([], 0)
                }
                
               
            
                request.onerror = function (event ) {
                    console.log("Filtered Data IndexedDB Error:", event)
                    return []
                }
             return []
            }
            
        },
        casesArr() {
            // console.log("this.allCases", this.allCases)
            if(this.allCases) return Object.values(this.allCases)
            return []
        },

        clientDistinct () {
            var creditors = [... new Set(this.casesArr.map(s => s.creditor))].sort()         
            return creditors
        },
        paymentsArr() {

            // if(this.allPayments) return Object.values(this.allPayments)
            if(localStorage.getItem("Payments")) {
              // console.log("localStorage Reminders Used")
              return JSON.parse(localStorage.getItem("Payments"))
            } else {
              // console.log("Imported Data Used")
              return Object.values(this.allPayments)
            }
             return []
        },

        creditorAccountNum () {
            return this.lookUpCreditorAccountNum(this.client)
        },

        filteredData() {

            var t0 = new Date() 

            if(this.client=='(Select All)') { 
                var cases = this.casesArr
                // console.log("cases", this.casesArr)
            } else {

                var cases = this.casesArr.filter(doc => {
                    return doc.creditor == this.client
                })

            }

            if(this.client=='(Select All)') {
                var payments = this.paymentsArr
            } else {

                var payments = this.paymentsArr.filter(doc => { 
                    if(this.isImport) {
                        return doc["Account #"] == this.creditorAccountNum
                    } else {                           
                        return doc["Account #"] == this.creditorAccountNum
                    }                 
                })

            }
            
            // console.log("payments", payments)

            var months = []
            console.log("Liquid Curves Data Check:", "Cases", cases.length > 0, "Payments",  payments.length > 0)
            if(cases.length > 0 && payments.length > 0) {

            // console.log("payments", payments)
            // Process payments data
                payments.forEach(rec => {
                    var account = cases.filter(doc => {
                        if(this.isImport) {        
                            return doc.case_number == rec["Account #"]
                        } else {             
                            return doc.case_number == rec["Account.."]
                        }
                        
                    })
                    if(account[0]) {

/*  REDFLAG */
// IMPORT excel vs read file date issue
                    if(this.isCasesImport) {            
                    // Import Excel
                        var date = account[0].date_entered_in_simplicity.split('/')
                        var y = date[2]
                        var m = date[0]
                        if(m.length<2) m = '0' + m
                        var vinDate = '20' + y + '-' + m + '-' + '01'
                    } else {
                    // Read File
                        var date = account[0].date_entered_in_simplicity.split('-')
                        var vinDate = date[0] + "-" + date[1] + "-" + '01'
                    }                  

                        var vintage_date = moment(vinDate)
                        var paymentDate = moment(rec.Date)

                        rec.Vintage = vinDate
                        rec.VinMo = paymentDate.diff(vintage_date, "months")
                    }

                })

            // Get clean vintages
                var vintages = [... new Set(cases.map(s => s.date_entered_in_simplicity))]
                var clean = []

/*  REDFLAG */
// IMPORT excel vs read file date issue
            if(this.isCasesImport) {   
            // Import Excel
                vintages.forEach(vintage => {
                    var date = vintage.split('/')
                    var y = date[2]
                    var m = date[0]
                    if(m.length<2) m = '0' + m
                    clean.push('20' + y + '-' + m + '-' + '01')
                })
            } else {
            // Read File
                vintages.forEach(vintage => {
                    var date = vintage.split('-')
                    var y = date[0]
                    var m = date[1]
                    clean.push(y + '-' + m + '-' + '01')
                })
            }
            
                var cleanVins = [... new Set(clean)]
                var vins = [] 

            // Get minDate to set VinMos array
                var minDate = cleanVins[0]
                minDate = moment(minDate)
                var today = moment(new Date())
                var vinLength = today.diff(minDate, "months")
                months = vinLength

                cleanVins.forEach(vintage => {

                    var kpis = []
                    var PlacedAmount = []
                    var TotalCollected = []

                    var vinMonths = []
                    vinMonths[vintage] = []



                // Vin Months for each Vintage
                    for(var i = 0; i<vinLength;i++) {
                        vinMonths[vintage][i] = []
            
                    }
                    // console.log(vinMonths)

                    // Get only cases for place vintage
                        var filterCases = cases.filter(item => {

/*  REDFLAG */
// IMPORT excel vs read file date issue
                            if(this.isCasesImport) {
                            // Import Excel
                                var date = item.date_entered_in_simplicity.split('/')
                                var y = date[2]
                                var m = date[0]
                                if(m.length<2) m = '0' + m
                                return '20' + y + "-" + m + "-" + '01' == vintage

                            } else {
                             // Read File
                                var date = item.date_entered_in_simplicity.split('-')
                                return date[0] + "-" + date[1] + "-" + '01' == vintage
                            }
                        })
                        

                        filterCases.forEach(doc => {

                            var mdate = moment(date)


/*  REDFLAG */
// IMPORT excel vs read file date issue
                            if(this.isCasesImport) {  
                            // Import Excel
                                var date = doc.date_entered_in_simplicity.split('/')
                                var y = date[2]
                                var m = date[0]
                                if(m.length<2) m = '0' + m
                                var vin_date = '20' + y + "-" + m + "-" + '01'
                            } else {
                            // Read File
                                var date = doc.date_entered_in_simplicity.split('-')
                                var vin_date = date[0] + "-" + date[1] + "-" + '01'
                            }

                        // Only payments for place vin cases
                            // console.log(payments)
                            var filterPayments = payments.filter(payData => {
                                if(this.isImport) {
                            
                                    return payData["Account #"] == doc.case_number
                                } else {
                           
                                    return payData["Account.."] == doc.case_number
                                
                                }
                                
                            })

                            // console.log(vintage, filterPayments)

                            if(vin_date == vintage) {
                                
                                if(this.isCasesImport) {
                                    TotalCollected.push(doc.total_payments ? (isNaN(doc.total_payments.replace(",","").replace(",","").replace("$","")) ? 0 : doc.total_payments.replace(",","").replace(",","").replace("$","")) : 0)
                                    PlacedAmount.push(doc.original_claim_amount ? (isNaN(doc.original_claim_amount.replace(",","").replace(",","").replace("$","")) ? 0 : doc.original_claim_amount.replace(",","").replace(",","").replace("$","")) : 0)
                                } else {
                                     TotalCollected.push(doc.total_payments ? doc.total_payments : 0)
                                     PlacedAmount.push(doc.original_claim_amount ? doc.original_claim_amount : 0)
                                }
                                

                                // Add payment amount to vintage vin month array
                                if(filterPayments[0]) {
                                    // console.log("FilterPayment present")

                                    if(filterPayments.length > 1) {
                                        // console.log("FilterPayments > 1")

                                        filterPayments.forEach(item => {
    /*REDFLAG*/
    // getting NAN
    // What to do with negative vinMos                                        
                                            // console.log(item)
                                            if(isNaN(item.VinMo) || item.VinMo < 0){} else {
                                                
                                                var itemAmount = item.Amount ? Number(isNaN(item.Amount.replace(",","").replace(",","").replace("$","")) ? 0 : item.Amount.replace(",","").replace(",","").replace("$","")) : 0
                                                // console.log(vinMonths[0][Number(item.VinMo)])
                                                vinMonths[0][Number(item.VinMo)].push(itemAmount)  

                                            }
                                                                        
                                        })

                                    } else if(filterPayments.length > 0) {
                                        // console.log("FilterPayments.length > 0")
    /*REDFLAG*/
    // What to do with negative vinMos
                                        // console.log(filterPayments[0].VinMo)
                                        // console.log(vinMonths)
                                        if(filterPayments[0].VinMo<0){} else {

                                            var fpAmount = filterPayments[0].Amount ? Number(isNaN(filterPayments[0].Amount.replace(",","").replace(",","").replace("$","")) ? 0 : filterPayments[0].Amount.replace(",","").replace(",","").replace("$","")) : 0
                                            // console.log(vinMonths[vintage][filterPayments[0].VinMo])
                                            vinMonths[vintage][filterPayments[0].VinMo].push(fpAmount)  

                                        }
                                        
                                        
                                    }
                                }                   
                            }
                        }) // END cases loop


                    // console.log(vinMonths[vintage].length)

                    

                    // console.log("vintage", vinMonths)

                    // Add KPIs to vintage array
                    kpis.Vintage = vintage

                    kpis.TotalCollected = Number(this.sumArray(TotalCollected))
                    kpis.PlacedAmount = Number(this.sumArray(PlacedAmount))
                    kpis.Rate = []

                    for(var i = 0; i<vinMonths[vintage].length;i++) {

                // Dollars in vinMonth
                    // kpis[i] = vinMonths[vintage][i]
    
                // Percent in vinMonth
                    //    kpis[i] = (isNaN(vinMonths[vintage][i] / kpis.PlacedAmount) ? 0 : vinMonths[vintage][i] / kpis.PlacedAmount)

                // Cummulative Collection Curve
                    kpis[i] = (isNaN(vinMonths[vintage][i] / kpis.PlacedAmount) ? 0 : vinMonths[vintage][i] / kpis.PlacedAmount) + (kpis[i - 1] ? kpis[i - 1] : 0 )
                    kpis.Rate.push((isNaN(vinMonths[vintage][i] / kpis.PlacedAmount) ? 0 : vinMonths[vintage][i] / kpis.PlacedAmount) + (kpis[i - 1] ? kpis[i - 1] : 0 ))

                    }


                    kpis.CollectionRate = kpis.TotalCollected ? kpis.TotalCollected / kpis.PlacedAmount : 0

                    
                    vins.push(kpis) 
                })


                // console.log("vins", vins)


                


                // for(var i = 0; i<months;i++){

                //     this.chartOptions.xAxis[i].categories.push(i)
                //     this.chartOptions.series[0].data.push(vins[0]['Rate'][i]) 

                // }

                // this.chartOptions.series[0].name = "2015-05-01"
                // this.chartOptions.series[0].type = "spline"
            
                // console.log(this.chartOptions.series[0])

                var counter = 0

                // Adding data to charts
                vins.forEach(vin => {
                    // console.log(vin)
                    // this.chartOptions.chart.events.addSeries(() => {
                    if(this.chartOptions.series[counter]) {

                         for(var i = 0; i<months;i++) {

                            // this.chartOptions.xAxis[0].categories.push(i)
                            this.chartOptions.xAxis[counter].categories.push(i)
                            // this.chartOptions.series[counter].data.push(vin['Rate'][i])
                            var num = vin['Rate'][i]
                            
                            this.chartOptions.series[counter].data.push(Math.round((num + 0.00001) * 100) / 100)

                        }

                        // this.chartOptions.series[counter].data.push(vin['Rate'])
                        this.chartOptions.series[counter].name = vin.Vintage
                        this.chartOptions.series[counter].type = "spline"

                        // Chart.redraw()
                    // })
                    }
                    counter +=1
                })

                

                // this.chartOptions.chart.events.redraw()


                this.$forceUpdate()
                    
                var t1 = new Date()
                var time = t1.getTime() - t0.getTime() 
                console.log("Liquid Curves data processing benchmark:", time, "ms")
        
                return []
            }
        },
        
    },
    methods: {

        lookUpCreditorAccountNum (client) {
            return this.casesArr.filter(doc => {return doc.creditor == client }).case_number
        },

         sumArray (arr) {
            var total = 0
            arr.forEach(a => {
                total += Number(a)
            })
            return total
        },

        async handleFileUpload(){

            this.file = this.$refs.file.files[0]
            var newFile = await this.ExcelToJSON(this.file)

        },

        async ExcelToJSON (file) {
                // return 1

                var self = this
                var reader = new FileReader() 

                reader.onload = async function(e) {
                    
                    var data =  e.target.result

                    var workbook =  await XLSX.read(data, {
                        type: 'binary'
                    })

                    await workbook.SheetNames.forEach( async (sheetName) => {

                        var XL_row_object = await XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])

                        self.importedJSON = await XL_row_object
                        // console.log(XL_row_object)
                        // self.remindersArr = await XL_row_object
                        self.$store.dispatch('getAllPayments', XL_row_object)
  
                    })        
                }

                reader.onerror = function(ex) {
                    console.log(ex);
                }
                reader.readAsBinaryString(file)
                
        }
    }
}
</script>

<style>
.grid {
    display: grid;
    grid-template-columns: 300px 400px;
    grid-template-areas: 
        "col1 col2";
    grid-template-rows: 1fr;
}

.col1 {
    display: grid;
    grid-area: col1;
}
.col2{
    grid-area: col2;
}
.col3 {
    grid-area: col3;
}
</style>

