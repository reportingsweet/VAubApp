<template>
    <div :input="IDXdbCases">
    <!-- <div> -->
        <div style=" text-align:left; max-width:600px;min-width:600px;" class="grid">            
            <b-col style="max-width:400px;min-width:400px;" class="col1">

                <b-form-group horizontal  label="Client" class="mb-0" style="font-weight: bold;padding-top: 4px;color:#495057 !important;">
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

            </b-col>

            <b-col class="col2">
                 <Json-Excel
                    name = "ByPlacementVin"
                    class = "btn btn-default"
                    :data = "filteredData"
                    :fields = "pVinFields"
                
                  >
                    <a size="sm" style="cursor:pointer;color:#495057 !important;" id="download"><strong>Download to Excel</strong></a>
                </Json-Excel>

            </b-col>
            <b-col class="col3">

                 <div class="container">
                    <div class="large-12 medium-12 small-12 cell">
                        <label>File
                            <input type="file" id="file" ref="file" @change="handleFileUpload()" /> 
                        </label>
                    </div> 
                </div>

            </b-col>            
               
        </div>

        <b-card style="">
            <div style="overflow:hidden;margin-right:16px;" id="headerdiv">
              <table id="headerdtable" class="fixed_header" style="min-width:900px">
                    <thead>
                        <tr>
                            <th>
                                <div class="table-header" style="width: 70px;" @click="changeSortDir">
                                    <div class="header">Vintage</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">File Count</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Open Files</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Closed Files</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Face Value</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Recent Pmt Pct</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Sued Count</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Suit Rate</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 90px;">
                                    <div class="header">Served Conv Rate</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Served Count</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Jmt Count</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Jmt Rate</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 120px;">
                                    <div class="header">Total Collected</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 100px;">
                                    <div class="header">Total Fees</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 100px;">
                                    <div class="header">Liquidation</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 90px;">
                                    <div class="header">Net Liquidation</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 70px;">
                                    <div class="header">Unit Yeild</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 100px;">
                                    <div class="header">Contingency Rate</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 100px;">
                                    <div class="header">Local Counsel Rate</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 100px;">
                                    <div class="header">Avg Placement Till Suit</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 100px;">
                                    <div class="header">Complaint Till Service</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 100px;">
                                    <div class="header">Suit Till Judgment</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                            <th>
                                <div class="table-header" style="width: 110px;">
                                    <div class="header">Placed Till Judgment</div> 
                                    <div class="sort-arrow" v-if="sortDir"><i style="" class="fas fa-arrow-down"></i></div>
                                    <div class="sort-arrow" v-else><i style="" class="fas fa-arrow-up"></i></div>
                                </div>                        
                            </th>
                        </tr>
                    </thead>
                </table>
                </div>
                
                <div style="overflow-y:scroll;max-height:400px;min-height:400px;" 
                    onscroll="document.getElementById('headerdiv').scrollLeft = this.scrollLeft;">
                    <table style="min-width:950px;">
                        <tbody>
                         <tr v-for="item in sortedData" style="margin: auto;">
                            <td class="field-item"> <div style="width: 70px;"> {{ item.Vintage }} </div></td>
                            <td class="field-item"><div style="width: 100px;">{{ item.FileCount }} </div></td>
                            <td class="field-item"><div style="width: 60px;">{{ item.OpenFiles }} </div></td>
                            <td class="field-item"><div style="width: 100px;">{{ item.ClosedFiles }} </div></td>
                            <td class="field-item"><div style="width: 70px;">${{ item.FaceValue }} </div></td>
                            <td class="field-item" ><div style="width: 80px;">{{ item.RecentPmtPct | percFormat  }} </div></td>
                            <td class="field-item"><div style="width: 80px;">{{ item.SuedCount }} </div></td>
                            <td class="field-item" ><div style="width: 70px;">{{ item.SuitRate | percFormat  }} </div></td>
                            <td class="field-item"><div style="width: 120px;">{{ item.ServedConvRate | percFormat  }} </div></td>
                            <td class="field-item"><div style="width: 65px;">{{ item.ServedCount }} </div></td>
                            <td class="field-item"><div style="width: 100px;">{{ item.JmtCount }} </div></td>
                            <td class="field-item"><div style="width: 50px;">{{ item.JmtRate | percFormat  }} </div></td>
                            <td class="field-item"><div style="width: 150px;">{{ item.TotalCollectedCalc | currencyFormat }} </div></td>
                            <td class="field-item"><div style="width: 75px;">{{ item.TotalFees | currencyFormat }} </div></td>
                            <td class="field-item"><div style="width: 155px;">{{ item.Liquidation | percFormat }} </div></td>
                            <td class="field-item"><div style="width: 85px;">{{ item.NetLiquidation | percFormat }} </div></td>
                            <td class="field-item"><div style="width: 90px;">{{ item.UnitYeild }} </div></td>
                            <td class="field-item"><div style="width: 95px;">{{ item.ContingencyRate | percFormat }} </div></td>
                            <td class="field-item"><div style="width: 125px;">{{ item.LocalCounselRate | percFormat }} </div></td>

                            <td class="field-item">
                                <div style="width: 110px;">
                                     <div v-if="item.AvgPlacementTillSuit >= 120" id="overdue">
                                        {{ item.AvgPlacementTillSuit }}
                                    </div>
                                    <div v-else>
                                        {{ item.AvgPlacementTillSuit }} 
                                    </div>      
                                </div>
                            </td>

                            <td class="field-item">
                                <div style="width: 90px;">
                                     <div v-if="item.ComplaintTillService >= 90" id="overdue">
                                        {{ item.ComplaintTillService }}
                                    </div>
                                    <div v-else>
                                        {{ item.ComplaintTillService }}
                                    </div>
                                </div
                            ></td>
                            <td class="field-item">
                                <div style="width: 130px;">
                                    <div v-if="item.SuitTillJudgment >= 180" id="overdue">
                                        {{ item.SuitTillJudgment }}
                                    </div>
                                    <div v-else>
                                        {{ item.SuitTillJudgment }}
                                    </div>
                                </div>
                            </td>
                            <td class="field-item">
                                <div style="width: 115px;">
                                    <div v-if="item.PlacedTillJudgment >= 365" id="overdue" style="width:100%; text-align: center;">
                                        {{ item.PlacedTillJudgment }}
                                    </div>
                                    <div style="width:100%; text-align: center;" v-else>
                                        {{ item.PlacedTillJudgment }}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                
            </table>
        </b-card>

    </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import JsonExcel from 'vue-json-excel'


export default {
    components: {
        JsonExcel
    },
     filters: {
        percFormat (value) {
            if(!value) return ''
            return ((value + 0.00001) * 100).toFixed(2) + '%'
        },
        currencyFormat(value) {
            if(!value) return ''
            var formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2
                })
            return formatter.format(value)
        }
    },
    watch: {
        importedJSON: function(val) {
            // console.log("WATCHER", val)
            
        },
       
         value () {
            this.setWidth()
        }
    },
    data () {
        return {
            name: '',
            isImport: 1,
            client: '(Select All)',
            file: '',
            sortDir: 0,
            importedJSON: [],
            watchIDXdbCases: [],

            pvinsFields: [
                { key: 'Vintage', label: 'VinDate', sortable: true },
                { key: 'FileCount', label: 'FileCount', sortable: true },
                { key: 'OpenFiles', label: 'OpenFiles', sortable: true },
                { key: 'ClosedFiles', label: 'ClosedFiles', sortable: true },
                { key: 'FaceValue', label: 'FaceValue', sortable: true },
                // { key: 'DaysSinceLastPmt', label: 'DaysSinceLastPmt' },
                { key: 'RecentPmtPct', label: 'RecentPmtPct', sortable: true },
                { key: 'SuedCount', label: 'SuedCount', sortable: true },
                { key: 'SuitRate', label: 'SuitRate', sortable: true },
                { key: 'ServedConvRate', label: 'ServedConvRate', sortable: true },
                { key: 'ServedCount', label: 'ServedCount', sortable: true },
                { key: 'JmtCount', label: 'JmtCount', sortable: true },
                { key: 'JmtRate', label: 'JmtRate', sortable: true },
                { key: 'TotalCollectedCalc', label: 'TotalCollectedCalc', sortable: true },
                { key: 'TotalFees', label: 'TotalFees', sortable: true },
                { key: 'Liquidation', label: 'Liquidation', sortable: true },
                { key: 'NetLiquidation', label: 'NetLiquidation', sortable: true },
                { key: 'UnitYeild', label: 'UnitYeild', sortable: true },
                { key: 'ContingencyRate', label: 'ContingencyRate', sortable: true },
                { key: 'LocalCounselRate', label: 'LocalCounselRate', sortable: true },
                { key: 'AvgPlacementTillSuit', label: 'AvgPlacementTillSuit', sortable: true },
                { key: 'ComplaintTillService', label: 'ComplaintTillService', sortable: true },
                { key: 'SuitTillJudgment', label: 'SuitTillJudgment', sortable: true },
                { key: 'PlacedTillJudgment', label: 'PlacedTillJudgment', sortable: true },
            ],
            pVinFields: {
                'Vintage': 'Vintage',
                'FileCount': 'FileCount',
                'OpenFiles': 'OpenFiles',
                'ClosedFiles': 'ClosedFiles',
                'FaceValue': 'FaceValue',
                'RecentPmtPct': 'RecentPmtPct',
                'TotalOrgClaimAmt': 'TotalOrgClaimAmt',
                'DaysSinceLastPmt': 'DaysSinceLastPmt',
                'SuedCount': 'SuedCount',
                // 'complaintSummonsCount': 'complaintSummonsCount',
                // 'complaintFiledCount': 'complaintFiledCount',
                'ServedCount': 'ServedCount',
                'JmtCount': 'JmtCount',
                'JmtRate': 'JmtRate',
                'TotalCollectedCalc': 'TotalCollectedCalc',
                'TotalFees': 'TotalFees',
                'Liquidation': 'Liquidation',
                'NetLiquidation': 'NetLiquidation',
                'UnitYield': 'UnitYield',
                'ContingencyRate': 'ContingencyRate',
                'LocalCounselRate': 'LocalCounselRate',
                'AvgPlacementTillSuit': 'AvgPlacementTillSuit',
                'ComplaintTillService': 'ComplaintTillService',
                'SuitTillJudgment': 'SuitTillJudgment',
                'PlacedTillJudgment': 'PlacedTillJudgment',

            }
        }
    },

    created() {
        this.$store.dispatch('getAllCases', { CallLoc: 'PVinTable.created()'})
        this.$store.dispatch('getTestPVins')
    },
    
    computed: {
        ...mapGetters([
            'allCases'
        ]),

        overdue() {
            return 'overdue'
            
        },

        IDXdbCases () {
            // console.log("UI IDXdbCases this.allCases", this.allCases)
            if(this.allCases) {} else {
 
                var self = this
                var dbName = 'Cases'
                var version = 1
                var request = indexedDB.open(dbName, version)

                // var request = []

                if(request) {

                    request.onsuccess = function (event) {
                        console.log("UI IDXdbCases IDXDB On Success")
                        var db = event.target.result
                        var tx = db.transaction(["Cases", "CaseIDX"], "readwrite")
                        
                        // console.log(tx)
                        tx.onerror = function (event) {
                            console.log("Transaction Error:", event)
                        }
                    
                        var objectStore = tx.objectStore("Cases")
            
                    
                        if(objectStore)  
                            objectStore.get(0).onsuccess = function (event) {
                                self.$store.dispatch('getAllCases', { Cases: event.target.result, isImport: 0, CallLoc: 'PVinTable.IDXdbCases' }) 
                            }
                        db.close()
                

                    }

                    request.onupgradeneeded = function (event) {
                        console.log("onupgradeneeded Create IDX DB", dbName)
                        var db = event.target.result
                        var objStore = db.createObjectStore("Cases")
                        var caseIdxObj = db.createObjectStore("CaseIDX")
                    }

                    request.onerror = function (event ) {
                        console.log("Filtered Data IndexedDB Error:", event)
                        return []
                    }
                return []
                }
            }
            
        },

        casesArr() {
            // console.log(this.allCases)
            // console.log("this.IDXdbCases", this.IDXdbCases)

 
            if(this.allCases) return Object.values(this.allCases)
            
            this.IDXdbCases
            return []
        },

        clientDistinct () {
            var creditors = [... new Set(this.casesArr.map(s => s.client_name))].sort()         
            return creditors
        }

        , sortedData() {
            var sortData = this.filteredData
            // console.log("sortedData", this.sortDir)
            if(this.sortDir) {
                sortData = sortData.sort((a,b) => { return new Date(a.Vintage) - new Date(b.Vintage) })
            } else {
                sortData = sortData.sort((a,b) => { return new Date(b.Vintage) - new Date(a.Vintage) })
            }
            
            return sortData
        }

        , filteredData() {

            var t0 = new Date()
            var vins = []
            var waitTime = 5000
        
            // var cases = this.importedJSON ? this.importedJSON : this.casesArr
            var cases = this.casesArr

// Time processing benchmarks            
            var casesTime = []
            var dateDiffTime = []
            
            // console.log("casesArr cases", cases)

            console.log("Cases", cases.length>0)
            if(cases.length>0) {
                console.log("Processing Cases")
            
                // var cases = this.casesArr
            
                if(this.client=='(Select All)') {} else {
                    cases = cases.filter(doc => {
                        return doc.client_name == this.client
                    })
                }
                // console.log(cases)
                var vintages = [... new Set(cases.map(s => s.date_entered_in_simplicity))]
                // console.log(vintages)

                var clean = []

    /*  REDFLAG */
    // IMPORT excel vs read file date issue
  
            if(this.isImport) {
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
                        // console.log(date)
                        var y = date[0]
                        var m = date[1]
                        if(m.length<2) m = '0' + m
                        clean.push(y + '-' + m + '-' + '01')
                    })
            }
                
            var cleanVins = [... new Set(clean)]
        

                

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
                    
                    var today = new Date()




                    var t0_cases = new Date()
                    cases.forEach(doc => {
 
                        var t0_dateDiffs = new Date()  
 
    /*  REDFLAG */
    // IMPORT excel vs read file date issue
                        if(this.isImport) {
                        // Import Excel
                            var date = doc.date_entered_in_simplicity.split('/')
                            var y = date[2]
                            var m = date[0]
                            var d = date[1]
                            if(m.length<2) m = '0' + m
                            var vin_date = '20' + y + "-" + m + "-" + '01'
                            var simp_date = new Date('20' + y + "-" + m + "-" + d)
                        } else {
                        // Read File
                            var date = doc.date_entered_in_simplicity.split('-')
                            var vin_date = date[0] + "-" + date[1] + "-" + '01'
                            var simp_date = new Date(date[0] + "-" + date[1] + "-" + date[2])
                        }
                    


                        // console.log(mdate)
                        var mcomplaintFiledDate = doc.complaint_filed_date ? new Date(doc.complaint_filed_date) : ""
                        var mcomplaint_summons_served_date = doc.complaint_summons_served_date ? new Date(doc.complaint_summons_served_date) : ""
                        var mjudgment_entered_date = doc.judgment_entered_date ? new Date(doc.judgment_entered_date) : ""
                

                        if(vin_date == vintage) {
                            FileCount.push(1)
                            doc.is_closed == 'Open' ? OpenFiles.push(1) : ''
                            doc.is_closed == 'Closed' ? ClosedFiles.push(1) : ''
                            

                            

                            ServedCount.push(doc.complaint_summons_served_date != '' && doc.complaint_summons_served_date ? 1 : 0)
                            SuedCount.push(doc.complaint_filed_date ? 1 : 0)
                            JmtCount.push(doc.judgment_amount ?  1 : 0)


                                 
                            if(this.isImport) {

                                TotalCollectedCalc.push(doc.total_payments ? doc.total_payments.replace(",","").replace(",","").replace("$","") : 0)

                                TotalOriginalClaimAmt.push(doc.original_claim_amount ? doc.original_claim_amount.replace(",","").replace(",","").replace("$","") : 0)

                                FaceValue.push(doc.current_balance_due ? (isNaN(doc.current_balance_due.replace(",","").replace(",","").replace("$","")) ? 0 : doc.current_balance_due.replace(",","").replace(",","").replace("$","")) : 0)

                                TotalFees.push(doc.current_fees ? doc.current_fees.replace(",","").replace(",","").replace("$","") : 0)

                            } else {

                                TotalCollectedCalc.push(doc.total_payments ? doc.total_payments : 0)
                                TotalOriginalClaimAmt.push(doc.original_claim_amount ? doc.original_claim_amount : 0)
                                FaceValue.push(doc.current_balance_due ? doc.current_balance_due : 0)
                                TotalFees.push(doc.current_fees ? doc.current_fees : 0)

                            }
                            

// 2015-0001 has complaint filed date
                            // if(doc.case_number == '2015-0001') {
                            //     console.log("mdate", simp_date)
                            //     console.log("mcomplaintFiledDate", mcomplaintFiledDate)
                            // }
                            

                            
                            RecentPmtFlag.push( this.dateDiff(today, new Date(doc.last_payment_date)) <= 90 ? 1 : 0)

                            ComplaintSummonsCount.push(doc.complaint_summons_served_date != '' && doc.complaint_summons_served_date ? 1 : 0)
                            ComplaintSentCount.push(doc.complaint_sent_date != '' ? 1 : 0)

                            ComplaintFiledCount.push(doc.complaint_filed_date != '' ? 1 : 0)


                            PlacementTillSuit.push( mcomplaintFiledDate != '' && !isNaN(simp_date) ? (mcomplaintFiledDate < simp_date ? 0 : this.dateDiff(simp_date, mcomplaintFiledDate) ) : 0)
                            PlacementTillSuitCount.push(mcomplaintFiledDate != '' ? 1 : 0)


                            ComplaintTillService.push(mcomplaint_summons_served_date && mcomplaintFiledDate ? (mcomplaint_summons_served_date < mcomplaintFiledDate ? 0 : this.dateDiff(mcomplaintFiledDate, mcomplaint_summons_served_date) ) : 0)
                            ComplaintTillServiceCount.push(mcomplaint_summons_served_date != '' ? 1 : 0)

                            SuitTillJudgment.push(mcomplaintFiledDate && mjudgment_entered_date ? this.dateDiff(mcomplaintFiledDate, mjudgment_entered_date) : 0)
                            SuitTillJudgmentCount.push(mjudgment_entered_date != '' ? 1 : 0)

                            PlacedTillJudgment.push(mjudgment_entered_date != '' ? (mjudgment_entered_date < simp_date ? 0 : this.dateDiff(simp_date, mjudgment_entered_date) ) : 0)
                            PlacedTillJudgmentCount.push(mjudgment_entered_date != '' ? 1 : 0)

                            var t1_dateDiffs = new Date()
                            var time_dateDiffs = t1_dateDiffs.getTime() - t0_dateDiffs.getTime()
                            dateDiffTime.push(time_dateDiffs)

                        }

                    })

                    var t1_cases = new Date()
                    var time_case = t1_cases.getTime() - t0_cases.getTime()
                    casesTime.push(time_case)

                    


                    // Add KPIs to vintage array
                    kpis.Vintage = vintage
                    kpis.FileCount = Number(this.sumArray(FileCount)).toLocaleString()
                    kpis.OpenFiles = Number(this.sumArray(OpenFiles)).toLocaleString()
                    kpis.ClosedFiles = Number(this.sumArray(ClosedFiles)).toLocaleString()
                    kpis.FaceValue = Number(this.sumArray(FaceValue)).toLocaleString()
                    
                    kpis.RecentPmtPct = Number(this.sumArray(RecentPmtFlag).toLocaleString()) / Number(kpis.FileCount)
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
                    // console.log("PlacementTillSuit", vintage, PlacementTillSuit)            
                    // console.log("PlacementTillSuitCount", PlacementTillSuitCount) 

                    kpis.AvgPlacementTillSuit = Math.round(Number(this.sumArray(PlacementTillSuit) / Number(this.sumArray(PlacementTillSuitCount))))
                    kpis.ComplaintTillService = Math.round(Number(this.sumArray(ComplaintTillService) / Number(this.sumArray(ComplaintTillServiceCount))))
                    kpis.SuitTillJudgment = Math.round(Number(this.sumArray(SuitTillJudgment) / Number(this.sumArray(SuitTillJudgmentCount))))
                    kpis.PlacedTillJudgment = Math.round(Number(this.sumArray(PlacedTillJudgment) / Number(this.sumArray(PlacedTillJudgmentCount))))

                    vins.push(kpis)
                })

                // console.log(vins)
                var t1 = new Date()
                var time = t1.getTime() - t0.getTime()

                console.log("Cases processing benchmark:", this.sumArray(casesTime), "ms")
                console.log("Datediff processing benchmark:", this.sumArray(dateDiffTime), "ms")
                console.log("Vintage data processing benchmark:", time, "ms")
            }
            return vins
        }
    },
   
    methods: {
        sumArray (arr) {
            var total = 0
            arr.forEach(a => {
                total += Number(a)
            })
            return total
        },

        dateDiff (a, b) {
            const _MS_PER_DAY = 1000 * 60 * 60 * 24
            return Math.round((b - a)/ _MS_PER_DAY, 0)
            
        },

        changeSortDir() {
            this.sortDir = !this.sortDir
        },
        async handleFileUpload(){
            this.file = this.$refs.file.files[0]
            var newFile = await this.ExcelToJSON(this.file)
        },

        async ExcelToJSON (file) {
                
                var self = this
                var reader = new FileReader()

                reader.onload = await async function(e) {

                    var data =  e.target.result

                    var workbook =  await XLSX.read(data, {
                        type: 'binary'
                    })

                    // console.log(workbook)

                    await workbook.SheetNames.forEach( async (sheetName) => {
                        // Here is your object
                        var XL_row_object = await XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
     
                        // console.log(XL_row_object)

                        self.importedJSON = await XL_row_object
                        // self.casesArr = await XL_row_object
                        self.$store.dispatch('getAllCases', { Cases: XL_row_object, isImport: 1, CallLoc: 'PVinTable.ExcelToJSON' })
                    })
                }

                reader.onerror = function(ex) {
                    console.log(ex);
                }

                // console.log("File", file)

                reader.readAsBinaryString(file)
        },

        pVinColumnCheck(columns) {

        }
    }
    
}
</script>

<style scoped>
/* .md-table-head {
  max-width: 100px !important;
  min-width: 100px !important;
} */
table > tbody {
    overflow-x: scroll !important;
}

.md-content .md-table {
    padding: 30px !important;
    overflow-x: scroll !important;
}

.md-content > .md-table-content {
    padding: 30px !important;
    overflow-x: scroll !important;
}

.md-table-cell {  
  /* max-width: 75px !important;
  min-width: 75px !important; */
  font-size: 12px !important;
}

.md-table-head-label {
    /* width: 25px !important; */
    padding: 0 !important;
    font-size: 6px !important;
}

#download:hover {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}
#b-table{
  font-size: 12px;
}
#overdue{
  background-color: red;
  color: white;
}

/* table, th, td {
  border: 1px solid black;
} */

/* 
.fixed_header{
    width: 400px;
    table-layout: fixed;
    border-collapse: collapse;
}

.fixed_header tbody{
  display:block;
  width: 100%;
  overflow: auto;
  height: 400px;
}

.fixed_header thead tr {
   display: block;
}

.fixed_header thead {
  background: black;
  color:#fff;
}

.fixed_header th, .fixed_header td {
  padding: 5px;
  text-align: left;
  width: 500px;
} */




.grid {
    display: grid;
    grid-template-columns: 1fr 200px 400px;
    grid-template-areas: 
        "col1 col2 col3";
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


.table-header {
    font-size: 14px;
    display: flex;
    margin: 0 5px 0 5px;
    /* width: 70px !important */
}
.header {
    /* width: 80%; */
    float: left;
    font-size: 14px;
}
.sort-arrow {
    display: none;
    width: 5px;
    margin: 0 2px 0 2px;
}
.table-header:hover > .sort-arrow {
    font-size: 14px;
    display: block;
}
.field-item {
    font-size: 10px;
}

</style>

