<template>
    <!-- <div :remind="allReminders" :data="filteredData"> -->
    <div :data="filteredData" :input="IDXdbCases">
      <b-col v-if="isLoading" >
            <!-- <p style="text-align:left;" ><img class="loader" src="../assets/img/wait-symbol.jpg" style="height:20px;width:20px;"/></p> -->
            <p><i style="font-size: 20px;" class="fas fa-spinner loader"></i></p> <p>Please wait while data is loading.</p>
      </b-col>
    <!-- <div> -->

        <b-row>
            <!-- <b-col> -->
                 <b-form-group horizontal label="Search" style="font-weight: bold; margin-left: 20px;" class="mb-0">
                    <b-input-group size="sm">
                        <b-form-input v-model="filter" placeholder="Type/Paste to Search" />
                        <b-input-group-append>
                            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>

                <div style="margin-left: 10px;" class="large-12 medium-12 small-12 cell">
                    <label>File
                        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
                    </label>
                </div>
            <!-- </b-col>            -->
        </b-row>
        
        <!-- <b-row> -->
            <b-card style="width: 100%;">
                <b-table 
                        :items="filteredData"
                        :fields="reminderFields"
                        :filter="filter"
                        id="repTable"
                        style="max-width: 100%;min-width: 100%;"
                        fixed
                >
            
                    <template slot="Collector" slot-scope="data">
                        <div @click="data.toggleDetails">
                            <div @click="forceUpdate"><a>{{ data.value }}</a></div>                             
                        </div>
                    </template> 
                    <template slot="AvgDaysPastDue" slot-scope="data">
                        <div @click="data.toggleDetails">
                            <div @click="forceUpdate"><a>{{ data.value }}</a></div>                             
                        </div>
                    </template> 
                    <template slot="PastDueDays" slot-scope="data">
                        <div @click="data.toggleDetails">
                            <div @click="forceUpdate"><a>{{ data.value }}</a></div>                             
                        </div>
                    </template> 
                    <template slot="PastDueDollar" slot-scope="data">
                        <div @click="data.toggleDetails">
                            <div @click="forceUpdate"><a>{{ data.value | currencyFormat }}</a></div>                             
                        </div>                       
                    </template> 
                    <template slot="RemindersPastDueCount" slot-scope="data">
                        <div @click="data.toggleDetails">
                            <div @click="forceUpdate"><a>{{ data.value }}</a></div>                             
                        </div>
                    </template>
                    <template slot="TotalReminders" slot-scope="data">
                        <div @click="data.toggleDetails">
                            <div @click="forceUpdate"><a>{{ data.value }}</a></div>                              
                        </div>
                    </template>

                    <template slot="row-details" slot-scope="row">

                        <h5>Reminders</h5> 
                        <div style="text-align: center; margin: auto;width: 500px;">
                   

                         
                               <a id="toExcelIcon" style="cursor: pointer;float:left; margin: 5px 10px 5px 0; " @click="downloadToExcelHandle(row.item)">Download to Excel</a>
                  
                        
                              <b-form-select :options="excelOptions" v-model="excelReminders" aria-describedby="" style="width:200px;">
                                <!-- <option>(Select All)</option> -->
                                <!-- <option v-for="excelOptions">{{ value }}</option> -->
                              </b-form-select>
                   
                  
                   
                        </div>


                        <b-card>

                            <div id="reminderTable">
                                <table  style="">
                                <!-- <tbody> -->
                                    <div v-for="reminder in pastDueReminders">
                                        <div v-if="reminder.collector==row.item.Collector">
                                            <b-card>
                                                <div style="width: 100%;margin:auto;" class="grid">

                                                    <div style="max-width:300px;min-width:100px;text-align:left;">
                                                        <a style="font-size:14px;font-weight:720;">Account: </a>{{ reminder.account_number }}
                                                    </div>
                                                    <div style="max-width:300px;min-width:100px;text-align:left;">
                                                        <a style="font-size:14px;font-weight:720;">DateDue: </a>{{ reminder.due_datetime | dateTruncate8 }}
                                                    </div>
                                                    <div style="max-width:300px;min-width:100px;text-align:left;">
                                                        <span :title="reminder.tickler_type">
                                                            <a style="font-size:14px;font-weight:720;">Type: </a>{{ reminder.tickler_type | longTruncate }}
                                                        </span>
                                                    </div>
                                                    <div style="max-width:300px;min-width:100px;text-align:left;">
                                                        <span :title="reminder.debtor_name">
                                                            <a style="font-size:14px;font-weight:720;">Debtor: </a>{{ reminder.debtor_name | longTruncate }}
                                                        </span>
                                                    </div>
                                                    
                                                </div>                                
                                            </b-card>
                                        </div>                                    
                                    </div>
                                <!-- </tbody> -->
                                </table>
                            </div>
                            
                            
                    
                        </b-card>


               
                    </template>
                </b-table>
            </b-card>
        <!-- </b-row>      -->
        <!-- {{ importedJSON }} -->
    </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import JsonExcel from 'vue-json-excel'
import  { moment } from '@/main'
import download from "downloadjs";

export default {
    data () {
        return {
            name: '',
            filter: '',
            collectorToggle: [],
            importedJSON: [],
            pastDueReminders: [],
            isImport: 1,
            isCasesImport: 1,
            isLoading: 0,
            excelReminders: 'All',
            noTouch5days: [],
            noTouch30days: [],
            noTouch60days: [],

            reminderFields: [
                { key: 'Collector', label: 'Collector', sortable: true },
                { key: 'AvgDaysPastDue', label: 'AvgDaysPastDue', sortable: true },
                { key: 'PastDueDays', label: 'PastDueDays', sortable: true },
                { key: 'PastDueDollar', label: 'PastDueDollar', sortable: true },
                { key: 'RemindersPastDueCount', label: 'RemindersPastDue', sortable: true },
                { key: 'TotalReminders', label: 'TotalReminders', sortable: true },
                // { key: 'UnitPercPastDue', label: 'UnitPercPastDue', sortable: true },
               
            ],
            excelOptions: [
              { text: 'All', value: 'All'},
              { text: 'Past Due', value: 'Past Due'},
              { text: 'No Touch - 5 days', value: 'No Touch - 5 days'},
              { text: 'No Touch - 30 days', value: 'No Touch - 30 days'},
              { text: 'No Touch - 60 days', value: 'No Touch - 60 days'},
            ]

        
        }
    },
    created() {
        // this.$store.dispatch('getAllReminders')
/*REDFLAG*/
// This dispatch won't be needed after DEV
        // this.$store.dispatch('getAllCases')
    },
    computed: {
        ...mapGetters([
            'allReminders',
            'allCases'
        ]),
         IDXdbCases () {
            var self = this
            var dbName = 'Cases'
            var version = 1
            var request = indexedDB.open(dbName, version)

/* REDFLAG */
// This needs to be commented out 
            var request  = []

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
                    console.log("onupgradeneeded Create IDX DB", dbName)
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
        remindersArr() {
            console.log("Computing remindersArr")
            // console.log("localStorage.Reminders", localStorage.Reminders)
            if(localStorage.getItem("Reminders")) return JSON.parse(localStorage.getItem("Reminders"))
            if(this.allReminders) return Object.values(this.allReminders)
            return []
        },
        // reminderToggleArr() {
        //     return this.remindersArr.filter(doc => { return this.collectorToggle.includes(doc.collector)})
        // }, 
        casesArr() {
            // console.log(this.allCases)
            if(this.allCases) return Object.values(this.allCases)
          
            return []
        },
        filteredData() {
            this.isLoading = 1
            var t0 = new Date()
            // console.log("localStorage.Reminders", JSON.parse(localStorage.getItem("Reminders")))
            if(localStorage.getItem("Reminders")) {
              console.log("localStorage Reminders Used")
              var reminders = JSON.parse(localStorage.getItem("Reminders"))
              // console.log("reminders", reminders)
            } else {

              console.log("Imported Reminders Used")
              // if(this.remindersArr) {
                var reminders = this.importedJSON ? this.importedJSON : this.remindersArr
              }
              

              // console.log("reminders", reminders)
            // }
            
            // var reminders = this.remindersArr
            // console.log("this.casesArr", this.casesArr)
            var cases = this.casesArr
            console.log("Reminders", reminders.length > 0 , "Cases", cases.length > 0)


            if(reminders.length > 0 && cases.length > 0) {
               this.isLoading = 1
            // if(reminders.length > 0) {
               console.log("Processing Reminders")
            
                // console.log("cases", cases)
                
    /*REDFLAG*/
    // create list of rep cases to show on table toggle         

                var repCases = []
                var repMetrics = []
                
                var reps = [... new Set(reminders.map(s => s.collector))].sort()
                var daysLastTouch = 0
                
    /*REDFLAG*/
    // Remove this filter
                // var reps = reps.filter(rep => { return rep == 'Admin Staff' })

                reps.forEach(rep => {
                    // this.isLoading = 1
                    // if(rep) {
                        var kpis = []
                        var today = moment(new Date())
                        // var today = new Date()
                        var TotalReminders = []
                        
                        var RemindersPastDueCount = []
                        var PastDueDays = []
                        var PastDueDollar = []
                        
                        // var TotalCases = cases.filter(doc => {
                        //                         return rep == (doc.collector_first_name + " " + doc.collector_last_name)
                        //                     })

                
                        var repReminders = reminders.filter(data => {
                            return data.collector == rep
                        })
                        // console.log(rep, repReminders)

                        repReminders.forEach(reminder => {
                        // reminders.forEach(reminder => {
                            reminder.dueDate = moment(reminder.due_datetime)
                            // var dueDate = new Date(reminder.due_datetime)

                            // var caseKey = this.getKeyByValue(this.allCases, reminder.account_number, 'case_number')
                            // var caseMatch = caseKey ? this.allCases[caseKey] : []
                            
                            var caseMatch = cases.filter(doc => {
                                                return doc.case_number == reminder.account_number
                                            })

                            if(caseMatch[0]) {
                                daysLastTouch = today.diff(moment(caseMatch[0].last_work_date), "days" )
                                if( daysLastTouch >= 5 ) { this.noTouch5days.push(reminder) }
                                if( daysLastTouch >= 30 ) { this.noTouch30days.push(reminder) }
                                if( daysLastTouch >= 60 ) { this.noTouch60days.push(reminder) }
                            }
                           
                            // console.log(caseMatch)

                            // var caseMatchIdx = Object.keys(this.allCases).find(key=> this.allCases[key]['case_number'] == reminder.account_number)
                            // var caseMatchIdx = this.allCases.findIndex(x => x.case_number == reminder.account_number)
                            // var caseMatch = this.allCases[caseMatchIdx]

                            if(reminder.collector == rep) {
                                
                                if(reminder.dueDate < today) {

                                    RemindersPastDueCount.push(1)

                                    if(this.isCasesImport) {
                                      // console.log(caseMatch[0])
                                      PastDueDollar.push(caseMatch[0] ? (isNaN(caseMatch[0].current_balance_due.replace(",","").replace(",","").replace("$","")) ? 0 : caseMatch[0].current_balance_due.replace(",","").replace(",","").replace("$","")) : 0)
                                    } else {
                                      PastDueDollar.push(caseMatch[0] ? caseMatch[0].current_balance_due : 0)
                                    }   
                                    
                                    
                                    PastDueDays.push(today.diff(reminder.dueDate, "days"))
                                    this.pastDueReminders.push(reminder)
                                                              
                                }

                                TotalReminders.push(1)

                            }

                        })

                        kpis.Collector = rep
                        kpis.RemindersPastDueCount = Number(this.sumArray(RemindersPastDueCount))
                        kpis.PastDueDollar = Number(this.sumArray(PastDueDollar ? PastDueDollar : 0))
                        // console.log(kpis.PastDueDollar)
                        kpis.PastDueDays = Number(this.sumArray(PastDueDays))
                        kpis.TotalReminders = Number(this.sumArray(TotalReminders))

                        // kpis.TotalCases = TotalCases.length
                        kpis.AvgDaysPastDue = kpis.PastDueDays ? Math.round(kpis.PastDueDays / kpis.RemindersPastDueCount) : 0
                        kpis.DaysSinceLastTouch = daysLastTouch

                        // kpis.UnitPercPastDue = 0

                        repMetrics.push(kpis)
                    // }           
                })
                this.pastDueReminders = this.pastDueReminders.sort((a,b) => { return a.dueDate - b.dueDate }) 
                var t1 = new Date()
                var time = t1.getTime() - t0.getTime() 
                console.log("Reminder data processing benchmark:", time, "ms")
                this.isLoading = 0                
                return repMetrics
            } else {
              this.isLoading = 0
            }
        },
        idName() {
            var now = new Date().getTime();
            return "export_" + now;
        },

        downloadFields() {
            if (this.fields !== undefined) return this.fields;

            if (this.exportFields !== undefined) return this.exportFields;
        }
    },
    watch: {
        allReminders: function () {
            this.filteredData()
        }
    },
    methods: {
        addCollector(collector) {
            this.collectorToggle.push(collector)
            this.$forceUpdate()
        },
        getKeyByValue (object, item, value) {
          return Object.keys(object).find(key => object[key][value] === item)
        },
        forceUpdate() {
            this.$forceUpdate()
        },
         sumArray (arr) {
            var total = 0
            arr.forEach(a => {
                total += Number(a)
            })
            return total
        },

        async downloadToExcelHandle (data) {
            // console.log(data)
            if(this.excelReminders=='Past Due') {
                var reminders = await this.pastDueReminders.filter(doc => {
                                  return doc.collector == data.Collector
                                })
            } else if(this.excelReminders=='All') {
              // console.log("this.excelReminders=='All'")
              // console.log(data)
                var reminders = await this.remindersArr.filter(doc => {
                                  return doc.collector == data.Collector
                                })
              // console.log(reminders)
            } else if(this.excelReminders=='No Touch - 5 days') { 
              var reminders = await this.noTouch5days.filter(doc => {
                                  return doc.collector == data.Collector
                                })
            } else if(this.excelReminders=='No Touch - 30 days') { 
              var reminders = await this.noTouch30days.filter(doc => {
                                  return doc.collector == data.Collector
                                })
            } else if(this.excelReminders=='No Touch - 60 days') {
                var reminders = await this.noTouch60days.filter(doc => {
                                  return doc.collector == data.Collector
                                })
             }
          

            await this.generate(reminders)
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
                        // self.remindersArr = await XL_row_object
                        self.$store.dispatch('getAllReminders', XL_row_object)
  
                    })        
                }

                reader.onerror = function(ex) {
                    console.log(ex);
                }
                reader.readAsBinaryString(file)
                
        },




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Download to Excel ////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    async generate(data) {
        // let data = this.data;
        console.log("generate", data)
        if(typeof this.fetch === 'function' || !data)
            data = await this.fetch()
        if (!data || !data.length) {
            return;
        }
      let json = this.getProcessedJson(data, this.downloadFields)
      if (this.type === "html") {
        // this is mainly for testing
        return this.export(
          this.jsonToXLS(json),
          this.name.replace(".xls", ".html"),
          "text/html"
        );
      } else if (this.type === "csv") {
        return this.export(
          this.jsonToCSV(json),
          this.name.replace(".xls", ".csv"),
          "application/csv"
        );
      }
      return this.export(
        this.jsonToXLS(json),
        this.name,
        "application/vnd.ms-excel"
      )
    },
    /*
		Use downloadjs to generate the download link
		*/
    export(data, filename, mime) {
      let blob = this.base64ToBlob(data, mime)
      download(blob, filename, mime)
    },
    /*
		jsonToXLS
		---------------
		Transform json data into an xml document with MS Excel format, sadly
		it shows a prompt when it opens, that is a default behavior for
		Microsoft office and cannot be avoided. It's recommended to use CSV format instead.
		*/
    jsonToXLS(data) {
      let xlsTemp =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>${table}</table></body></html>';
      let xlsData = "<thead>";
      const colspan = Object.keys(data[0]).length

      //Header
      if (this.title != null) {
        xlsData += this.parseExtraData(
          this.title,
          '<tr><th colspan="' + colspan + '">${data}</th></tr>'
        )
      }

      //Fields
      xlsData += "<tr>";
      for (let key in data[0]) {
        xlsData += "<th>" + key + "</th>"
      }
      xlsData += "</tr>";
      xlsData += "</thead>";

      //Data
      xlsData += "<tbody>";
      data.map(function(item, index) {
        xlsData += "<tr>";
        for (let key in item) {
          xlsData += "<td>" + item[key] + "</td>";
        }
        xlsData += "</tr>";
      });
      xlsData += "</tbody>";

      //Footer
      if (this.footer != null) {
        xlsData += "<tfoot>";
        xlsData += this.parseExtraData(
          this.footer,
          '<tr><td colspan="' + colspan + '">${data}</td></tr>'
        );
        xlsData += "</tfoot>";
      }

      return xlsTemp.replace("${table}", xlsData);
    },
    /*
		jsonToCSV
		---------------
		Transform json data into an CSV file.
		*/
    jsonToCSV(data) {
      var csvData = [];
      //Header
      if (this.title != null) {
        csvData.push(this.parseExtraData(this.title, "${data}\r\n"));
      }
      //Fields
      for (let key in data[0]) {
        csvData.push(key);
        csvData.push(",");
      }
      csvData.pop();
      csvData.push("\r\n");
      //Data
      data.map(function(item) {
        for (let key in item) {
          let escapedCSV = item[key] + ""; // cast Numbers to string
          if (escapedCSV.match(/[,"\n]/)) {
            escapedCSV = '"' + escapedCSV.replace(/\"/g, '""') + '"';
          }
          csvData.push(escapedCSV);
          csvData.push(",");
        }
        csvData.pop();
        csvData.push("\r\n");
      });
      //Footer
      if (this.footer != null) {
        csvData.push(this.parseExtraData(this.footer, "${data}\r\n"));
      }
      return csvData.join("");
    },
    /*
		getProcessedJson
		---------------
		Get only the data to export, if no fields are set return all the data
		*/
    getProcessedJson(data, header) {
      let keys = this.getKeys(data, header);
      let newData = [];
      let _self = this;
      data.map(function(item, index) {
        let newItem = {};
        for (let label in keys) {
          let property = keys[label];
          newItem[label] = _self.getValue(property, item);
        }
        newData.push(newItem);
      });

      return newData;
    },
    getKeys(data, header) {
      if (header) {
        return header;
      }

      let keys = {};
      for (let key in data[0]) {
        keys[key] = key;
      }
      return keys;
    },
    /*
		parseExtraData
		---------------
		Parse title and footer attribute to the csv format
		*/
    parseExtraData(extraData, format) {
      let parseData = "";
      if (Array.isArray(extraData)) {
        for (var i = 0; i < extraData.length; i++) {
          parseData += format.replace("${data}", extraData[i]);
        }
      } else {
        parseData += format.replace("${data}", extraData);
      }
      return parseData;
    },

    getValue(key, item) {
      const field = typeof key   !== "object" ? key : key.field;
      let indexes = typeof field !== "string" ? []  : field.split(".");
      let value   = this.defaultValue;
    
      if (!field)
	      value = item;
      else if( indexes.length > 1 )
        value = this.getValueFromNestedItem(item, indexes);
      else
        value = this.parseValue(item[field]);
      
      if( key.hasOwnProperty('callback'))
        value = this.getValueFromCallback(value, key.callback);
      
      return value;
    },

    getValueFromNestedItem(item, indexes){
      let nestedItem = item;
      for (let index of indexes) {
        if(nestedItem)
          nestedItem = nestedItem[index];
      }
      return this.parseValue(nestedItem);
    },

    getValueFromCallback(item, callback){
      if(typeof callback !== "function")
        return this.defaultValue
      const value = callback(item);
      return this.parseValue(value);
    },
    parseValue(value){
      return value || value === 0 
          ? value
          : this.defaultValue;
    },
    base64ToBlob(data, mime) {
      let base64 = window.btoa(window.unescape(encodeURIComponent(data)));
      let bstr = atob(base64);
      let n = bstr.length;
      let u8arr = new Uint8ClampedArray(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// End Export to Excel //////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        },
        dateTruncateTen(value) {
          // console.log(value)
          if(!value) return ''
          return value.substr(0, 10)
       },
       dateTruncate8(value) {
          // console.log(value)
          if(!value) return ''
          return value.substr(0, 8)
       },
       timeTruncate(value) {
          // console.log(value)
          if(!value) return ''
          var hours = value.substr(11, 2)
          var hoursampm = hours
          var mins = value.substr(14, 2)
          if(hours < 10){
            hours = hours.substr(1,1)
          }
          if(hours > 12) {
            hours = hours % 12
          }
          var timestamp = hours + ":" + mins
          if(hoursampm > 11) {
              timestamp += " pm"
          } else {
              timestamp += " am"
          }
          return timestamp
        },
        longTruncate(value) {
            if(!value) return ''
            if(value.length > 25) return value.substring(0, 20) + "..."
            return value
        }
    },
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
#toExcelIcon:hover {
    text-decoration: underline;
}
#repTable {
    width: 100%; 
}
#reminderTable {
    width: 100%;
    max-height:300px;
    min-height:300px;
    overflow-y: scroll;
}
.loader {
    animation: spin 1.5s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
