<template>
    <div :data="filteredData" :cases="allCases">
        <div class="grid">
            <div class="col1">

                 <!-- <b-form-group horizontal  label="Client" class="mb-0" style="font-weight: bold;padding-top: 4px;">
                    <b-input-group size="sm" style="width: 200px;">
                    <b-form-select v-model="client" aria-describedby="" style="float:left;">
                        <option>(Select All)</option>
                        <option v-for="(value, key, index) in clientDistinct">{{ value }}</option>
                    </b-form-select>
                    <b-input-group-append> 
                        <b-btn :disabled="client=='(Select All)'" @click="client='(Select All)'">Clear</b-btn>
                    </b-input-group-append>
                    </b-input-group>
                </b-form-group> -->

            </div>

            <!-- <div class="col2">
                 <div style="margin-left: 10px;" class="large-12 medium-12 small-12 cell">
                    <label>File 
                        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
                    </label>
                </div>
            </div> -->

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
            isOnload: 1, 
            isImport: 0,
            isCasesImport: 0,
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
        if(this.isEmptyObject(this.allCases)) { this.$store.dispatch('getAllCases') }
        if(this.isEmptyObject(this.allPayments)) { this.$store.dispatch('getAllPayments') }
    },
    computed: {
        ...mapGetters([
            'allCases',
            'allPayments',
            'allCaseIDXs'
        ]),
       
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
            return Object.values(this.allPayments)
        },

        creditorAccountNum () {
            return this.lookUpCreditorAccountNum(this.client)
        },

        filteredData() {

            var t0 = new Date()

            // var vinTime = []
            var filterCasesTime = []
            var casesTime = []
            var cummTime = []
            var IN = 0 
            var OUT = 0

            var caseIDXs = this.allCaseIDXs ? this.allCaseIDXs : []

            if(this.client=='(Select All)') { 
                var cases = this.casesArr
                // console.log("cases", this.casesArr)
            } else {
                var cases = this.casesArr.filter(doc => {
                    return doc.client_name == this.client
                })
            }

            if(this.client=='(Select All)') {
                var payments = this.paymentsArr
            } else {

                var payments = this.paymentsArr.filter(doc => { 
                    return doc["AccountNum"] == this.creditorAccountNum             
                })

            }
            
            // console.log("payments", payments)

            var months = []
            console.log("Liquid Curves Data Check:", "Cases", cases.length > 0, "CaseIDX",  caseIDXs.length > 0, "Payments",  payments.length > 0, "isOnload", this.isOnload)
            
            if(cases.length > 0 && payments.length > 0 && this.isOnload) {

            // console.log("payments", payments)
            // Process payments data
                console.log("Process Payments")
                var t0_pmtProcess = new Date()


                payments.forEach(rec => {

                    var case_number = rec["AccountNum"]
                    var caseKey = caseIDXs[case_number]
                    var account = cases[caseKey]

                    if(account) {

                        var date = account.date_entered_in_simplicity.split('-')
                        var vinDate = date[0] + "-" + date[1] + "-" + '01'
                        var vintage_date = moment(vinDate)

                        var paymentDate = moment(rec.PaymentDate)

                        rec.Vintage = vinDate
                        rec.VinMo = paymentDate.diff(vintage_date, "months")
                    }

                })

                // console.log("PROCESSED PAYMENTS",  payments)
                var t1_pmtProcess = new Date()
                var time_pmtProcess = t1_pmtProcess.getTime() - t0_pmtProcess.getTime()
            // Get clean vintages
                var vintages = [... new Set(cases.map(s => s.date_entered_in_simplicity))]                
                var clean = []


                vintages.forEach(vintage => {
                    var date = vintage.split('-')
                    var y = date[0]
                    var m = date[1]
                    clean.push(y + '-' + m + '-' + '01')
                })

                // console.log("VINTAGES", vintages)            
                var cleanVins = [... new Set(clean)]
                var vins = []
                // console.log("CLEAN VINS", cleanVins)

            // Get minDate to set VinMos array
                var minDate = cleanVins[0]
                minDate = moment(minDate)
                var today = moment(new Date())
                var vinLength = today.diff(minDate, "months")
                months = vinLength

                // console.log("VIN LENGTH", vinLength)


                // console.log("BUILD VINTAGES")       
                cleanVins.forEach(vintage => {

                    var kpis = []
                    var PlacedAmount = []
                    var TotalCollected = []
                    
                    var vinMonths = []

                    // FOR each vintage in clean Vin
                    vinMonths[vintage] = []

                // Vin Months for each Vintage
                    for(var i = 0; i<vinLength;i++) {
                        vinMonths[vintage][i] = []            
                    }
                    // console.log(vinMonths)

                    // Get only cases for place vintage
                        var t0_filtercases = new Date()
                        var filterCases = cases.filter(item => {


                            var date = item.date_entered_in_simplicity.split('-')
                            return date[0] + "-" + date[1] + "-" + '01' == vintage
                       

                        })
                        var t1_filtercases = new Date()
                        var time_filtercases = t1_filtercases.getTime() - t0_filtercases.getTime()
                        filterCasesTime.push(time_filtercases)
                        
                        
                        var t0_cases = new Date() 

                        filterCases.forEach(doc => {
                            var mdate = moment(date)
                            var date = doc.date_entered_in_simplicity.split('-')
                            var vin_date = date[0] + "-" + date[1] + "-" + '01'
                      

                        // Only payments for place vin cases
                            // console.log(payments)
                            var filterPayments = payments.filter(payData => {
                                // console.log(payData["AccountNum"], "==", doc.case_number, payData["AccountNum"] == doc.case_number)
                                return payData["AccountNum"] == doc.case_number         
                            })

                            if(vin_date == vintage) {
                                TotalCollected.push(isNaN(doc.total_payments) ? 0 : doc.total_payments)
                                PlacedAmount.push(isNaN(doc.original_claim_amount) ? 0 : doc.original_claim_amount)
                                // Add payment amount to vintage vin month array
                                if(filterPayments[0]) {
                                    // console.log("FilterPayment present")

                                    if(filterPayments.length > 1) {
                                        // console.log("FilterPayments > 1", filterPayments)

                                        filterPayments.forEach(item => {
    /*REDFLAG*/
    // getting NAN
    // What to do with negative vinMos                                        
                                            // console.log(item)
                                            if(isNaN(item.VinMo) || item.VinMo < 0){} else {
                                                var itemAmount = item.Amount ? Number(isNaN(item.Amount) ? 0 : item.Amount) : 0
                                                // console.log(vinMonths[0][Number(item.VinMo)])
                                                vinMonths[0][Number(item.VinMo)].push(itemAmount)  
                                            }                            
                                        })
                                    } else if(filterPayments.length > 0) {
    /*REDFLAG*/
    // What to do with negative vinMos
                                        if(filterPayments[0].VinMo<0){} else {
                                            var fpAmount = filterPayments[0].Amount ? Number(isNaN(filterPayments[0].Amount) ? 0 : filterPayments[0].Amount) : 0
                                            if(vintage && filterPayments[0].VinMo) {
                                                IN += 1
                                                vinMonths[vintage][filterPayments[0].VinMo-1].push(fpAmount)  
                                            } else {
                                                OUT += 1
                                            }
                                        }  
                                    }
                                }                   
                            }
                        }) // END cases loop

                        var t1_cases = new Date()
                        var time_cases = t1_cases.getTime() - t0_cases.getTime()

                        casesTime.push(time_cases)

                    // console.log(vinMonths[vintage].length)
                    // console.log("vintage", vinMonths)

                    // Add KPIs to vintage array
                    kpis.Vintage = vintage

                    kpis.TotalCollected = Number(this.sumArray(TotalCollected))
                    kpis.PlacedAmount = Number(this.sumArray(PlacedAmount))
                    kpis.Rate = []

            
                    var t0_cummCurve = new Date()

                    // console.log("BUILD CURVE")
                    for(var i = 0; i<vinMonths[vintage].length;i++) {
 
                    // Dollars in vinMonth
                        // kpis[i] = vinMonths[vintage][i]
        
                    // Percent in vinMonth
                        //    kpis[i] = (isNaN(vinMonths[vintage][i] / kpis.PlacedAmount) ? 0 : vinMonths[vintage][i] / kpis.PlacedAmount)

                    // Cummulative Collection Curve
                        // console.log(vinMonths[vintage][i])
                        kpis[i] = (isNaN(vinMonths[vintage][i] / kpis.PlacedAmount) ? 0 : vinMonths[vintage][i] / kpis.PlacedAmount) + (kpis[i - 1] ? kpis[i - 1] : 0 )
                        kpis.Rate.push((isNaN(vinMonths[vintage][i] / kpis.PlacedAmount) ? 0 : vinMonths[vintage][i] / kpis.PlacedAmount) + (kpis[i - 1] ? kpis[i - 1] : 0 ))

                    }

                    var t1_cummCurve = new Date()
                    var time_cummCurve = t1_cummCurve.getTime() - t0_cummCurve.getTime()
                    cummTime.push(time_cummCurve)

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
                
                var t0_vins = new Date()

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

                // console.log("this.chartOptions.series[counter].name", this.chartOptions.series)

                var t1_vins = new Date()
                var time_vins = t1_vins.getTime() - t0_vins.getTime()

                // this.chartOptions.chart.events.redraw()

                this.$forceUpdate()
                    
                var t1 = new Date()
                var time = t1.getTime() - t0.getTime()

                this.isOnload = 0


                console.log("Payment processing benchmark:", time_pmtProcess, "ms")
                console.log("Filter Cases processing benchmark:", this.sumArray(filterCasesTime), "ms")
                console.log("Cases processing benchmark:", this.sumArray(casesTime), "ms")
                console.log("Cummulative Curve processing benchmark:", this.sumArray(cummTime), "ms")
                console.log("Building vintages into the chart processing benchmark:", time_vins, "ms")
                console.log("Liquid Curves data processing benchmark:", time, "ms")
                console.log("IN", IN, "OUT", OUT)
        
                return []
            }
        },
        
    },
    methods: {

         isEmptyObject(object) {
            if ('object' !== typeof object) {
                throw new Error('Object must be specified.');
            }
            if (null === object) {
                return true;
            }
            if ('undefined' !== Object.keys) {
                // Using ECMAScript 5 feature.
                return (0 === Object.keys(object).length);
            } else {
                // Using legacy compatibility mode.
                for (var key in object) {
                    if (object.hasOwnProperty(key)) {
                        return false;
                    }
                }
                return true;
            }
        },

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

        // async ExcelToJSON (file) {
        //         // return 1

        //         var self = this
        //         var reader = new FileReader() 

        //         reader.onload = async function(e) {
                    
        //             var data =  e.target.result

        //             var workbook =  await XLSX.read(data, {
        //                 type: 'binary'
        //             })

        //             await workbook.SheetNames.forEach( async (sheetName) => {

        //                 var XL_row_object = await XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])

        //                 self.importedJSON = await XL_row_object
        //                 // console.log(XL_row_object)
        //                 // self.remindersArr = await XL_row_object
        //                 self.$store.dispatch('getAllPayments', XL_row_object)
  
        //             })        
        //         }

        //         reader.onerror = function(ex) {
        //             console.log(ex);
        //         }
        //         reader.readAsBinaryString(file)
                
        // }
        getCases() {
            console.log("GET CASES")
            // this.$store.dispatch('getAllCases')
        },
        getAllPayments() {
            // this.$store.dispatch('getAllPayments')
        }
    },
    watch: {
      allCases: () => {

      },
      allPayments: () => {

      }
    },
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

