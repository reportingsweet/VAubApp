<template>
    <div>
    <!-- <div> -->
        <b-card style="max-width: 1000px;margin: 10px auto 0 auto ;">
            <highcharts :options="chartOptions" :data="pVinsArr">                
            </highcharts>            
        </b-card> 
     </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Chart } from 'highcharts-vue'
import { Highcharts, moment } from '@/main'


export default {
    components: {
        highcharts: Chart 
    },
    data () {
        return {
            name: '',
            isImport: 0,
            isOnload: 1,
            chartOptions: {
                
                chart: {
                    zoomType: 'xy',
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 300,
                        depth: 200,
                        beta: 200,
                        viewDistance: 100,
                        frame: {
                            back: {
                                size: 1
                            }
                        }
                    }
                },
                title: {
                    text: 'Face Value by Placement Vintage'
                },
                subtitle: {
                    text: 'All Data'
                },
                xAxis: [{
                    categories: [],
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    
                    labels: {
                        formatter: function (a) {
                                return (a.value)  + "%" 
                        },
                        // format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                     }
                    }, { // Secondary yAxis
                        
                        tickInterval: 1000*1000,
                        title: {
                            text: 'Dollars',
                            style: {
                                // color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            formatter: function (a) {
                                return (a.value)/1000000 + " MM" 
                                },
                            // format: '{value}' + ' MM',
                            style: {
                                // color: Highcharts.getOptions().colors[0]
                            }
                        },
                        opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 20,
                    verticalAlign: 'top',
                    y: 20,
                    floating: true,
                    // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: 'Face Value',
                    type: 'column',
                    yAxis: 1,
                    data: []
                    ,
                    tooltip: {
                        valueSuffix: ' m'
                    }

                }
                , {
                    name: 'RecentRepayPct',
                    type: 'spline',
                    // data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                    data: []
                    ,
                    tooltip: {
                        // pointFormatter: function (a) {
                        //         return (a.value)*100
                        // },
                        valueSuffix: '%'
                    }
                }
                ],
                    credits: {
                        enabled: false
                    }
        
            }
        } 
    },
    
   created() {
        this.$store.dispatch('getAllCases')
    },
    computed: {
        ...mapGetters([
            'allCases'
        ]),
        casesArr() {
            // console.log(this.allCases)
            return Object.values(this.allCases)
        },
        pVinsArr() {
            var t0 = new Date()
            console.log("casesArr", this.casesArr.length > 0,"isOnload", this.isOnload)
            if(this.casesArr && this.isOnload) {
                var cases = this.casesArr
            // console.log(cases)
                var vintages = [... new Set(this.casesArr.map(s => s.date_entered_in_simplicity))]
                var clean = []
                vintages.forEach(vintage => {
                    var date = vintage.split('-')
                    // console.log(date)
                    var y = date[0]
                    var m = date[1]
                    if(m.length<2) m = '0' + m
                    clean.push(y + '-' + m + '-' + '01')
                })                
                var cleanVins = [... new Set(clean)]
                var vins = []
                
                cleanVins.forEach(vintage => {
                    var kpis = []
                    var FileCount = []
                    var OpenFiles = []
                    var ClosedFiles = []
                    var FaceValue = []
                    var RecentPmtFlag = []
                    var SuedCount = []
                    var SuitRate = []
                    var ComplaintSummonsCount = []
                    var ComplaintSentCount = []
                    var ComplaintFiledCount = []

                    var PlacementTillSuit = []
                    var PlacementTillSuitCount = []
                    var ComplaintTillService = []
                    var ComplaintTillServiceCount = []
                    var SuitTillJudgment = []
                    var SuitTillJudgmentCount = []
                    var PlacedTillJudgment = []
                    var PlacedTillJudgmentCount = []

                    var ServedConvRate = []
                    var ServedCount = []
                    var JmtCount = []
                    var JmtRate = []
                    var TotalCollectedCalc = []
                    var TotalOriginalClaimAmt = []
                    var TotalFees = []
                    var Liquidation = []
                    var NetLiquidation = []
                    var UnitYeild = []
                    var ContingencyRate = []

                    cases.forEach(doc => {
                        
                        var date = doc.date_entered_in_simplicity.split('-')
                        var vin_date = date[0] + "-" + date[1] + "-" + '01'
               

                        var today = moment(new Date())
                        var mdate = moment(date)
                        var mcomplaintFiledDate = doc.complaint_filed_date ? moment(doc.complaint_filed_date) : ""
                        var mcomplaint_summons_served_date = doc.complaint_summons_served_date ? moment(doc.complaint_summons_served_date) : ""
                        var mjudgment_entered_date = doc.judgment_entered_date ? moment(doc.judgment_entered_date) : ""
                    

                        if(vin_date == vintage) {
                            FileCount.push(1)
                            doc.is_closed == 'Open' ? OpenFiles.push(1) : ''
                            doc.is_closed == 'Closed' ? ClosedFiles.push(1) : ''                                    

               
                            var balanceDue = doc.current_balance_due ? doc.current_balance_due : 0
                           

                            // isNaN(balanceDue) ? console.log(vintage, doc.current_balance_due, balanceDue) : ''
                            FaceValue.push(isNaN(balanceDue) ? 0 : balanceDue)

                            RecentPmtFlag.push( today.diff(moment(doc.last_payment_date), "days") <= 90 ? 1 : 0)
                            ServedCount.push(doc.complaint_summons_served_date != '' && doc.complaint_summons_served_date ? 1 : 0)
                            SuedCount.push(doc.complaint_filed_date ? 1 : 0)
                            JmtCount.push(doc.judgment_amount ?  1 : 0)

    
                            TotalCollectedCalc.push(doc.total_payments ? doc.total_payments : 0)
                            TotalOriginalClaimAmt.push(doc.original_claim_amount ? doc.original_claim_amount : 0)
                            FaceValue.push(doc.current_balance_due ? doc.current_balance_due : 0)
                            TotalFees.push(doc.current_fees ? doc.current_fees : 0)
                            
                            ComplaintSummonsCount.push(doc.complaint_summons_served_date != '' && doc.complaint_summons_served_date ? 1 : 0)
                            ComplaintSentCount.push(doc.complaint_sent_date != '' ? 1 : 0)

                            ComplaintFiledCount.push(doc.complaint_filed_date != '' ? 1 : 0)


                            PlacementTillSuit.push( mcomplaintFiledDate ? mdate.diff(mcomplaintFiledDate, "days") : 0)
                            PlacementTillSuitCount.push(mcomplaintFiledDate != '' ? 1 : 0)

                            ComplaintTillService.push(mcomplaint_summons_served_date ? mdate.diff(mcomplaint_summons_served_date, "days") : 0)
                            ComplaintTillServiceCount.push(mcomplaint_summons_served_date != '' ? 1 : 0)

                            SuitTillJudgment.push(mcomplaintFiledDate ? mcomplaintFiledDate.diff(mjudgment_entered_date, "days") : 0)
                            SuitTillJudgmentCount.push(mjudgment_entered_date != '' ? 1 : 0)

                        PlacedTillJudgment.push(mjudgment_entered_date ? mjudgment_entered_date.diff(mdate, "days") : 0)
                        PlacedTillJudgmentCount.push(mjudgment_entered_date != '' ? 1 : 0)

                    }

                })

                kpis.Vintage = vintage
                kpis.FileCount = Number(this.sumArray(FileCount)).toLocaleString()
                kpis.OpenFiles = Number(this.sumArray(OpenFiles)).toLocaleString()
                kpis.ClosedFiles = Number(this.sumArray(ClosedFiles)).toLocaleString()

                kpis.FaceValue = Number(this.sumArray(FaceValue))
                
                kpis.RecentPmtPct = Number(this.sumArray(RecentPmtFlag)) / Number(kpis.FileCount)

                kpis.ServedCount = Number(this.sumArray(ServedCount))
                kpis.SuedCount = Number(this.sumArray(SuedCount)).toLocaleString()
                kpis.SuitRate = kpis.FileCount ? kpis.SuedCount / kpis.FileCount : 0

                // kpis.ComplaintSummonsCount = Number(this.sumArray(ComplaintSummonsCount))
                // kpis.ComplaintSentCount =  Number(this.sumArray(ComplaintSentCount))
                
                kpis.ServedConvRate = Number(this.sumArray(ComplaintSummonsCount)) / Number(this.sumArray(ComplaintSentCount))



                kpis.JmtCount = Number(this.sumArray(JmtCount)).toLocaleString()
                
                kpis.JmtRate = ComplaintFiledCount ? kpis.JmtCount / Number(this.sumArray(ComplaintFiledCount)) : 0
                kpis.TotalCollectedCalc = Number(this.sumArray(TotalCollectedCalc))
                kpis.TotalFees = Number(this.sumArray(TotalFees))
                kpis.TotalOriginalClaimAmt = Number(this.sumArray(TotalOriginalClaimAmt))
                kpis.Liquidation = kpis.TotalCollectedCalc / kpis.TotalOriginalClaimAmt
                kpis.NetLiquidation = (kpis.TotalCollectedCalc - kpis.TotalFees) / kpis.TotalOriginalClaimAmt
                kpis.UnitYeild = 'ND'
                kpis.ContingencyRate = 'ND'
                kpis.LocalCounselRate = 'ND'
/*REDFLAG*/
// This is not correct                
                kpis.AvgPlacementTillSuit = Number(this.sumArray(PlacementTillSuit) / Number(this.sumArray(PlacementTillSuitCount)))
                kpis.ComplaintTillService = Number(this.sumArray(ComplaintTillService) / Number(this.sumArray(ComplaintTillServiceCount)))
                kpis.SuitTillJudgment = Number(this.sumArray(SuitTillJudgment) / Number(this.sumArray(SuitTillJudgmentCount)))
                kpis.PlacedTillJudgment = Number(this.sumArray(PlacedTillJudgment) / Number(this.sumArray(PlacedTillJudgmentCount)))

                vins.push(kpis)
            })            

                // console.log("VINS", vins)
                vins.forEach(rec => {
                    
                    this.chartOptions.xAxis[0].categories.push(rec.Vintage)
                    // console.log(rec.FaceValue.replace(",","").replace(",",""))
                    this.chartOptions.series[0].data.push(Number(rec.FaceValue))
                    // console.log(rec.RecentPmtPct.toFixed(2))
                    this.chartOptions.series[1].data.push(rec.RecentPmtPct ? (rec.RecentPmtPct.toFixed(2)*100) : 0 )
                })
                this.$forceUpdate()
                this.isOnload = 0
                var t1 = new Date()
                var time = t1.getTime() - t0.getTime() 
                console.log("Face Value data processing benchmark:", time, "ms")
                return this.chartOptions
            }
            
        }
       
    },
    methods: {
        sumArray (arr) {
            var total = 0
            arr.forEach(a => {
                total += Number(a)
            })
            return total
        }
    },
    watch: {
      allCases: () => {
        // if(!this.allCases) this.$store.dispatch('getAllCases')
      }
    },    
}
</script>

<style scoped>

</style>

