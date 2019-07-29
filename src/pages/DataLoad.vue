<template>
  <div class="content">


    <div class="main">


      <div class="parent" style="width: 200px;">
        <div class="child" style="width:130px;margin-top:5px;padding-left:15px;">
          <label for="dataSource">Data Source:</label>
        </div>
        <div class="child"> 
      
          <multiselect id="dataSource" style="min-width:250px;max-width:250px;max-height:31px;min-height:31px;"
                        
                        select-label=""
                        v-model="dataSource"
                        :options="sourceNameOptions"
                        placeholder="Select Source"
                        :multiple="false"
                        :limit="1"
                        >
                      </multiselect>
        </div>
        <b-btn style="max-height:41px;min-height:41px;" class="child" id="filter_btn" 
                    :disabled="dataSource  == '' || loading" @click="clearDropDown('DataSource')"
                      >Clear
                </b-btn> 
      </div>

      <br>

     <div class="parent" style="width: 200px;">
        <div class="child" style="width:130px;margin-top:5px;padding-left:15px;">
          <label for="action">Action:</label>
        </div>
        <div class="child"> 
      
          <multiselect id="action" style="min-width:250px;max-width:250px;max-height:31px;min-height:31px;"
                        
                        select-label=""
                        v-model="action"
                        :options="actionOptions"
                        placeholder="Select Action"
                        :multiple="false"
                        :limit="1"
                        >
                      </multiselect>
        </div>
        <b-btn style="max-height:41px;min-height:41px;" class="child" id="filter_btn" 
                    :disabled="action == '' || loading" @click="clearDropDown('Action')"
                      >Clear
                </b-btn> 
      </div>

      <div v-if="action=='Insert'||action=='Update'">

        <br>

        <div class="parent" style="width: 200px;">
          <div class="child" style="width:130px;margin-top:5px;padding-left:15px;">
            <label for="file">File</label>
          </div>
          <div class="child">

          </div>
          <input type="file" id="file" ref="file" @change="handleFileUpload()" /> 
        </div>           
    
      </div>

      <br>

      <div class="parent" style="width: 200px;">
        <div class="child" style="width:130px;margin-top:5px;padding-left:15px;">
          <label for=""></label>
        </div>
        <div class="child">

        </div>
        <b-btn style="max-height:41px;min-height:41px;width: 130px;" id="submit_btn" 
                    :disabled="action == '' || dataSource == '' || loading || noFile" @click="submitAction()"
                      >Submit Action
        </b-btn>
      </div>

    </div>

    <div v-if="action=='Insert'||action=='Update'">
      <div>LOADED DATA:</div>
      <br>
      <div v-if="loadedData.length>0" style="width: 1000px; height: 500px;overflow: scroll;margin: auto;">
         {{ this.loadedData }}
      </div>
    </div>

    


  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  data () {
    return {

      loading: false,

      dataSource: '',
      action: '',

      loadedData: [],
      noFile: true,

      sourceNameOptions: ['All_Data', 'Tickler_Report', 'Acct_Summary'],
      actionOptions: ['Remove', 'Insert', 'Update']

    }
  },
  created() {
    this.$store.dispatch('getTableList')
  },
  components: {
    Multiselect
  },
  computed: {
    ...mapGetters([
      'tableList'
    ])
  },
  methods: {
    async submitAction() {

      await this.$store.dispatch('postDataTable', { Data: this.loadedData[0], DataSource: this.dataSource })
      this.loadedData = []
    },
    clearDropDown (dropDown) {
      if(dropDown=='DataSource') this.dataSource = ''
      if(dropDown=='Action') this.action = ''
    },
    async handleFileUpload(){
          
          this.file = this.$refs.file.files[0]
          var newFile = await this.ExcelToJSON(this.file)
      },

    async ExcelToJSON (file) {
      
            
      var self = this
      self.loading = true
      var reader = new FileReader()

      reader.onload = await async function(e) {

          var data =  e.target.result

          var workbook =  await XLSX.read(data, {
              type: 'binary'
          })

          await workbook.SheetNames.forEach( async (sheetName) => {
              // Here is your object
              var XL_row_object = await XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
              self.loadedData = await XL_row_object
              self.noFile = false
              self.loading = false
          })
      }

      reader.onerror = function(ex) {
          console.log(ex);
      }

      // console.log("File", file)

      reader.readAsBinaryString(file)
    },
  }
}
</script>


<style scoped>

.main {
  height: 100%;
}
.parent {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .search-parent {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 5fr;
  } 

  .child {
    display: inline;
  }

</style>
