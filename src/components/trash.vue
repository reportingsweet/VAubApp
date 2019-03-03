<template>
  <div class="main">
    <b-row style="text-align:left;margin-top:-20px;" >
      <b-col md="8" sm="8" style="min-width:500px;">
        <img src="../assets/apts_star_grn.png" style="margin:4px 5px 30px 0;height:50px;width:50px;"></img>
        <p class="headertitle" style="display:inline-block;"> <strong>MLS Portfolio</strong></p>
      </b-col>
    </b-row>

    <b-row style="margin:0px 0px 25px 10px;" v-show="loading">
      <p style="text-align:left;" ><img class="loader" src="../assets/apts_star_grn.png" style="height:20px;width:20px;"/> Data is loading...</p>
    </b-row>

<!-- START FILTER GROUP -->
    <b-row style="margin-top:-20px;" >

      <b-col md="7" sm="7" class="my-0"
            style="min-width:1200px; font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif;
                   text-align: center;"
            >
        <b-row v-if="!filterHide">
        <!-- <b-row> -->
          <b-col style="min-width:370px; max-width:370px; margin-left:10px;">

            <b-form-group horizontal label="Search" style="font-weight: bold;" class="mb-0">
                  <b-input-group size="sm">
                    <b-form-input v-model="filter" placeholder="Type/Paste to Search" />
                    <b-input-group-append>
                      <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                    </b-input-group-append>
                  </b-input-group>
            </b-form-group>

            <b-form-group horizontal label="Stage" class="mb-0" style="font-weight: bold;">
                  <b-input-group size="sm">
                    <b-form-select v-model="stage" aria-describedby="" :selected-link="stageFilter">
                      <option>(Select All)</option>
                      <option v-for="(value, key, index) in stagesDistinct">{{ value.StageDesc }}</option>
                    </b-form-select>
                    <b-input-group-append>
                      <b-btn :disabled="stage=='(Select All)'" @click="clearStage">Clear</b-btn>
                    </b-input-group-append>
                  </b-input-group>
            </b-form-group>

          <b-form-group horizontal label="Rep" class="mb-0" style="font-weight: bold;">
                  <b-input-group size="sm">
                    <b-form-select v-model="assignedRep" aria-describedby="">
                      <option>(Select All)</option>
                      <option v-for="(value, key, index) in allFBUsers">{{ value.First }} {{ value.Last }}</option>
                    </b-form-select>
                    <b-input-group-append>
                      <b-btn :disabled="assignedRep=='(Select All)'" @click="clearAssignedRep">Clear</b-btn>
                    </b-input-group-append>
                  </b-input-group>
            </b-form-group>

          </b-col>

          <b-col style="min-width:480px; max-width:480px; margin-left:10px;">
            <b-form-group horizontal label="Sales Territory" class="mb-0" style="font-weight: bold;">
                  <b-input-group size="sm">
                    <b-form-select v-model="salesTerritory" aria-describedby="">
                      <!-- <option v-for="(value, key, index) in regionDistinct">{{ value }}</option> -->
                      <option>(Select All)</option>
                      <option v-for="(value, key, index) in allSalesTerritories">{{ value }}</option>
                    </b-form-select>
                    <b-input-group-append>
                      <b-btn :disabled="salesTerritory=='(Select All)'" @click="clearSalesTerritory">Clear</b-btn>
                    </b-input-group-append>
                  </b-input-group>
            </b-form-group>

            <b-form-group horizontal label="Status" class="mb-0" style="font-weight: bold;">
                  <b-input-group size="sm">
                    <b-form-select v-model="status" aria-describedby="">
                      <option>(Select All)</option>
                      <option v-for="(value, key, index) in statusesDistinct">{{ value.StatusDesc }}</option>
                    </b-form-select>
                    <b-input-group-append>
                      <b-btn :disabled="status=='(Select All)'" @click="clearStatus">Clear</b-btn>
                    </b-input-group-append>
                  </b-input-group>
            </b-form-group>

            <b-form-group horizontal label="Priority" class="mb-0" style="font-weight: bold;">
              <b-input-group size="sm">
                <b-form-select :options="priorityOptions" v-model="priorityHQ" aria-describedby="">

                </b-form-select>
                <b-input-group-append>
                  <b-btn :disabled="priorityHQ=='(Select All)'" @click="clearPriority">Clear</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>

          </b-col>

          <b-col style="min-width:300px; max-width:300px; margin-left:10px;">

            <b-form-group horizontal label="State" class="mb-0" style="font-weight: bold;width:275px;">
                  <b-input-group size="sm">
                    <b-form-select v-model="state" aria-describedby="">
                      <option>(Select All)</option>
                      <option v-for="(value, key, index) in allStates">{{ value }}</option>
                    </b-form-select>
                    <b-input-group-append>
                      <b-btn :disabled="state=='(Select All)'" @click="clearState">Clear</b-btn>
                    </b-input-group-append>
                  </b-input-group>
            </b-form-group>

            <b-form-group horizontal label="Pipeline" class="mb-0" style="font-weight: bold;width:275px;">
                  <b-input-group size="sm">
                    <b-form-select v-model="pipeline" aria-describedby="">
                      <option>(Select All)</option>
                      <option></option>
                      <option v-for="(value, key, index) in pipelinesModal">{{ value.Pipeline }}</option>
                    </b-form-select>
                    <b-input-group-append>
                      <b-btn :disabled="pipeline=='(Select All)'" @click="clearPipeline">Clear</b-btn>
                    </b-input-group-append>
                  </b-input-group>
            </b-form-group>


          </b-col>

         </b-row>
        </b-col>
      </b-row>
<!-- END FILTER GROUP -->
<!-- Mini Dash GROUP -->
      <br>
      <b-row v-if="!infoHide">
        <b-col style="min-width:2000px;max-width:2000px;" class="my-0">
          <b-row>
            <b-col md="2" sm="2" style="min-width:300px;">
              <b-card header="MLS Research"
                      style="width:300px;
                             height:200px;
                             ">
                  <p style="text-align:left;font-weight:bold;margin-bottom:0;">Instructions:</p>
                  <p style="text-align:left;font-size:14px;">Click on the HQLocationID to display contacts and offices.</p>
              </b-card>
            </b-col>

            <b-col md="3" sm="3" style="display:center;min-width:470px;">
              <b-card header="Activity Types"
                      style="width:470px;
                             height:200px;
                             ">
                  <div class="activityInfoTble">
                    <table>
                        <tr>
                          <th colspan="2">Action:</th>
                          <th style="text-align:left;padding-left:50px;">Description:</th>
                          <th class="scrollbarhead" />
                        </tr>
                        <tr><td><i style="color: #77b800;margin: 0 5px 0 5px;" class="fas fa-pencil-alt"></i></td><td>Update MLS</td><td style="text-align:left;padding-left:20px">Update MLS Status</td></tr>
                        <tr><td><i style="color: #77b800;margin: 0 5px 0 5px;" class="far fa-calendar-alt"></i></td><td>Set Appointment</td><td style="text-align:left;padding-left:20px">Set appointments for MLS HQ</td></tr>
                        <tr><td><i style="color: #77b800;margin: 0 5px 0 5px;" class="fas fa-rss-square"></i></td><td>Update Vendor</td><td style="text-align:left;padding-left:20px">Update Vendor</td></tr>
                    </table>
                  </div>
              </b-card>
            </b-col>

            <b-col md="6" sm="6" style="min-width:1050px;">
              <b-card header="MLS Portfolio Activity"
                      style="width:auto;
                             height:200px;
                             ">
                    <div class="">

                      <app-MLSKPIcard
                          :allKPIs="allKPIs"
                        >
                      </app-MLSKPIcard>

                    </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
<!-- END Mini Dash GROUP -->
        <br>

<!-- Toolbar Group-->
        <b-row style="min-width:1180px;max-width:1180px;font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif;">

          <b-col style="margin-left:30px;min-width:100px;" id="per-page">
            <b-form-group horizontal label="PerPage" class="mb-0" style="font-weight:bold;width:300px;">
              <b-input-group size="sm" style="width:57px;margin-left:30px;">
                <b-form-select :options="pageOptions" v-model="perPage"/>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col>
            <b-pagination size="sm" id="bpagination" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
          <b-col style="text-align:left;width:100px;">
            <h5 style="margin-left:0px;margin:5px 0 0 0;"> <strong>Total:</strong> {{ totalRows }} </h5>
          </b-col>
          <b-col>
            <h5 style="margin:5px 0 0 0;" id="hide-filters" @click="makeFilterShowHide"><strong>{{ filterShowHide }}</strong></h5>
          </b-col>
          <b-col>
            <h5 style="margin:5px 0 0 0;" id="hide-filters" @click="makeInfoShowHide"><strong>{{ infoShowHide }}</strong></h5>
          </b-col>
          <b-col style="text-align:center;">

            <Json-Excel
                name = "MLS_Portfolio"
                class = "btn btn-default"
                :data = "mlsDataToExcel"
                :fields = "location_fields"
                >
                <h5 style="margin:-2px 0 0 0;" id="hide-filters"><strong>Download to Excel</strong></h5>
            </Json-Excel>

          </b-col>
        </b-row>
<!-- END Toolbar GROUP-->

  <b-table striped
           :fields="locationFields"
           :items="filteredData"
           :filter="filter"
           :per-page="perPage"
           :current-page="currentPage"
           @filtered="onFiltered"
           style="overflow-x:hidden;width:1875px; font-size:13px;"
           class="btable"
           id="btable"
          >

        <template slot="HQLocationID" slot-scope="data">
          <div @click="data.toggleDetails" id="hqLocationID" style="width:90px;text-align:left;">
            <div @click="toggleLocations(data.value)">
              <div @click="bootToggleContacts(data.value)">
                <span title="See Details" ><i id="actionIcons" class="far fa-eye" style="float:left;margin-top:3px;"></i>{{ data.value }}</span>
              </div>
            </div>
          </div>
        </template>

        <template slot="LocationName" slot-scope="data">
          <div style="width:300px;">
            <span title="Go to Location URL" >
              <a href="" @click="getLocationHRef(data.item.LocationURL)" target="_blank" style="color:#1f3b6e;" id="AptsStyle">
                {{ data.value }}
              </a>
            </span>
          </div>
        </template>

        <template slot="links" slot-scope="row">
          <div style="width:75px;">
            <span title="Go to Location URL" id="AptsStyle">
            <a href="" @click="getLocationHRef(row.item.LocationURL)" id="actionIcons" target="_blank" style="color:#1f3b6e;">
              <img src="../assets/cos_t_rgb_blu_pos_star.png" style="margin-top:-4px;width:16px;height:16px;color:#1f3b6e" ></img>
            </a>
          </span>
          <span title="Go to Activity URL" id="AptsStyle">
            <a href="" @click="getActivityHRef(row.item.ActivityURL)" id="actionIcons"  target="_blank" style="color:#1f3b6e;">
              <i class="far fa-chart-bar" style="font-size:17px;"></i>
            </a>
          </span>
          </div>          
        </template>

        <template slot="actions" slot-scope="row">
          <div style="width:100px;" @mouseenter="setBrokerLocationDataKey(row.item)">
            <span title="Update MLS Status">
                <i v-b-modal.mlsUpdateModal  @click="setActiveRecord(row.item)" id="actionIcons" class="fas fa-pencil-alt"></i>
            </span>
            <span title="Create Appointment">
                <i v-b-modal.appointmentModal @click="setActiveRecord(row.item)" id="actionIcons" class="far fa-calendar-alt"></i>
            </span>
            <span v-if="row.item.FeedProviderID!==null&&row.item.FeedProviderID" :title="row.item.Vendor">
                <i  v-b-modal.vendorModal @click="setActiveRecord2(row.item)" id="actionIcons" class="fas fa-rss-square"></i>
            </span>
            <span v-else-if="row.item.FeedProviderID==null||!row.item.FeedProviderID" title="Un-Mapped">
                <i v-b-modal.vendorModal @click="setActiveRecord2(row.item)" id="nullIcons" class="fas fa-rss-square"></i>
            </span>            
              <Json-Excel
                        :name = "row.item.LocationName + '_ListHubBrokers'"
                        worksheetname = "ListHubBrokers"
                        class = "btn btn-default"
                        :data = "mlsAgentsToExcel"
                        :fields = "mlsAgent_fields"
                        style="padding:0;border-spacing:0;font-size:13px;margin-top:-0.3em;"                 
                        >
                  <span title="Download Agents to Excel" @mouseenter="setBrokerLocationDataKey(row.item)" v-if="brokerLocationDataKeys.includes(row.item.LocationDataKey)">
                    <i  id="actionIcons" class="fas fa-file-download" style="margin-right:1px;" ></i>
                  </span>
                  <span title="No Data" @mouseenter="setBrokerLocationDataKey(row.item)" v-else>
                    <i  id="nullIcons" class="fas fa-file-download" style="margin-right:1px;" ></i>
                  </span>
              </Json-Excel>                                         
          </div>   
        </template>

        <template slot="Stage" slot-scope="data">
          <div style="width:150px;">
            {{ data.value }}
          </div>
        </template>

        <template slot="Status" slot-scope="data">
          <div style="width:250px;">
            {{ data.value }}
          </div>
        </template>

        <template slot="City" slot-scope="data">
          <div style="width:120px;">
            {{ data.value }}
          </div>
        </template>
        <template slot="State" slot-scope="data">
          <div style="width:75px;">
            {{ data.value }}
          </div>
        </template>
        <template slot="EstListings" slot-scope="data">
          <div style="width:85px;">
            {{ data.value }}
          </div>
        </template>
        <template slot="ActiveListings" slot-scope="data">
          <div style="width:100px;">
            {{ data.value }}
          </div>
        </template>

        <template slot="row-details" slot-scope="data" style="">
          <b-col style="">
            <b-row>
              <b-card style="width:100%;text-align:left;">
                <span title="Offices">
                    <h3 @click="toggleOfficeTable(data.item.LocationID)" style="color:#77b800;" id="actionIcons">
                      Offices
                    </h3>
                </span>
                  <table >
                    <div  v-for="(location, key1) in sortedAllLocationDetails">
                      <div v-if="location.HQLocationID==data.item.HQLocationID">
                          <table id="officesTable" style="font-size:12px;">
                            <tr style="background-color:white;border:1px solid lightgray;margin:1px;">
                              <td style="width:90px;">
                                <div style="margin-top:2px;">
                                  <span title="Go to Location URL" id="AptsStyle">
                                    <a href="" @click="getLocationHRef(location.LocationURL)" id="actionIcons" target="_blank" style="color:#1f3b6e;">
                                      <img src="../assets/cos_t_rgb_blu_pos_star.png" style="margin-top:-5px;width:17px;height:17px;color:#1f3b6e" ></img>
                                    </a>
                                  </span>

                                  <span title="Go to Activity URL" id="AptsStyle">
                                    <a href="" @click="getActivityHRef(location.ActivityURL)" id="actionIcons"  target="_blank" style="color:#1f3b6e;">
                                      <i class="far fa-chart-bar" style="font-size:17px;"></i>
                                    </a>
                                  </span>
                                </div>
                              </td>
                              <td style="width:130px;">
                                <strong>Location: </strong>
                                <a style="font-size:16px;">
                                    {{ location.LocationID }}
                                </a>
                              </td>

                              <td style="width:325px;">
                                <a style="font-size:16px;">           
                                  {{ location.LocationName }}
                                </a>
                              </td>
                              <td style="width:160px;"><strong>City: </strong><a style="font-size:16px;">{{ location.City }}</a></td>
                              <td style="width:100px;"><strong>State: </strong><a style="font-size:16px;">{{ location.State }}</a></td>
                              <td style="width:120px;"><strong>TotalMeetings: </strong><a style="font-size:16px;">{{ location.TotalMeetings }}</a></td>
                              <td style="width:190px;"><strong>LastMeetingDate: </strong><a style="font-size:16px;">{{ location.LastMeetingDate }}</a></td>
                              <td style="width:190px;"><strong>LastEmailDate: </strong><a style="font-size:16px;">{{ location.LastEmailDate }}</a></td>
                              <td style="width:190px;"><strong>LastPhoneDate: </strong><a style="font-size:16px;">{{ location.LastPhoneDate }}</a></td>
                            </tr>
                          </table>
                          <div style="text-align: left;margin-top: 10px;" v-show="opened.includes(key1)">
                            <a @click="toggleContacts(key1, location.LocationID)" id="AptsStyle"><i class="fas fa-arrow-up"></i> Collapse Contacts</a>
                          </div>

                      </div>
                    </div>
                </table>
              </b-card>
            </b-row>
            <div style="text-align: left;margin-top: 10px;">
              <a @click="data.toggleDetails" id="AptsStyle"><i class="fas fa-arrow-up"></i> Collapse Location</a>
            </div>
          </b-col>

        </template>
      <!-- </div> -->

  </b-table>

  <b-modal ref="mlsUpdateModal"
           id="mlsUpdateModal"
           title="MLS Update"
           @ok="handleOk"
           @show="showClearMLSModal"
           style='font-family:"Roboto", "Helvetica", "Arial", sans-serif;'
  >
      <b-card style="border:none;" fluid>
        <b-row style="margin-top:-30px" class="mb-1 text-center">
          <b-col cols="4"> </b-col>
          <b-col></b-col>
        </b-row>

        <b-row class="mb-1" style="padding-bottom:5px;">
          <b-col cols="6" class="card__label" style="margin-bottom:-10px;">HQLocationID:</b-col>
          <b-col style="margin-bottom:-10px;">
            {{ mlsModal.hqlocationid }}
          </b-col>
        </b-row>

        <b-row class="mb-1" style="padding-bottom:5px;">
          <b-col cols="6" class="card__label" style="margin-bottom:-10px;">HQLocation Name:</b-col>
          <b-col style="margin-bottom:-10px;">
            {{ mlsModal.locationname }}
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Pipeline:</b-col>
          <b-col style="margin-bottom:-10px;">
            <b-form-select v-model="mlsModal.pipeline" class="mb-3 no__border">
              <option v-for="(value, key, index) in pipelinesModal">{{ value.Pipeline }}</option>
            </b-form-select>
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Est Listings:</b-col>
          <b-col style="margin-bottom:-10px;">
            <b-form-input v-model="mlsModal.estlistings" class="mb-3 no__border" />
          </b-col>
        </b-row>

        <div class="div__radio">
          <input value="1" type="checkbox" id="isResidentialRadio" v-model="mlsModal.isresidential"/>
          <label for="isResidentialRadio">isResidential</label>
        </div>

        <b-row class="mb-1">
          <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Stage:</b-col>
          <b-col style="margin-bottom:-10px;">
            <b-form-select v-model="mlsModal.stage" class="mb-3 no__border">
              <option v-for="(value, key, index) in stagesModal">{{ value.StageDesc }}</option>
            </b-form-select>
          </b-col>
        </b-row>

        <b-row>
          <div class="container">
            <b-form-group label="" v-if="stageIDLookup(mlsModal.stage)=='2'||stageIDLookup(mlsModal.stage)=='3'">
            <p>Contract Internal/External:</p>
              <b-form-radio-group id="isInternalRadio" v-model="mlsModal.isinternal" name="radioSubComponent">
                <b-form-radio value="0">External</b-form-radio>
                <b-form-radio value="1">Internal</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>
        </b-row>


        <b-row class="mb-1">
          <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Status:</b-col>
          <b-col style="margin-bottom:-10px;">
            <b-form-select v-model="mlsModal.status" class="mb-3 no__border">
              <option v-for="(value, key, index) in statusesModal">{{ value.StatusDesc }}</option>
            </b-form-select>
          </b-col>
        </b-row>


        <div v-if="mlsModal.RecentFollowUpStatus == 'pending'">
          <p style="color:orange;margin:0;">*There is a pending follow up on this status.</p>
          <p>{{ currentLocation.RecentFollowUp.ScheduledDate | dateTruncate }} @ {{ currentLocation.RecentFollowUp.ScheduledDate | timeTruncate }} - {{ currentLocation.RecentFollowUp.Title }}</p>
        </div>

      </b-card>
  </b-modal>

  <b-modal ref="vendorModal"
           id="vendorModal"
           @show="showClearVendorModal"
           @ok="handleOk"
           title="Vendor Update"
           style='font-family:"Roboto", "Helvetica", "Arial", sans-serif;'
  >

      <b-row class="mb-1" style="padding-bottom:5px;">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">HQLocationID:</b-col>
        <b-col style="margin-bottom:-10px;">
          {{ vendorModal.hqlocationid }}
        </b-col>
      </b-row>

      <b-row class="mb-1" style="padding-bottom:5px;">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">HQLocation Name:</b-col>
        <b-col style="margin-bottom:-10px;">
          {{ vendorModal.locationname }}
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">IsMapped:</b-col>
        <b-col style="margin-bottom:-10px;">
          <b-form-select v-model="vendorModal.ismapped" :options="vendorIsMappedOptions" class="mb-3 no__border">

          </b-form-select>
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Vendor:</b-col>
        <b-col style="margin-bottom:-10px;">
          <b-form-select v-model="vendorModal.vendor" class="mb-3 no__border">
            <option v-for="vendor in allVendorsModal">{{ vendor }}</option>
          </b-form-select>
        </b-col>
      </b-row>
  </b-modal>

  <b-modal ref="fakeModal">
    <b-row class="mb-1">
      <b-col cols="6" class="card__label" style="margin-bottom:-10px;">AssignedRep:</b-col>
      <b-col style="margin-bottom:-10px;">
        <b-form-select v-model="followUpModal.assignedrep" type="text" class="mb-3 no__border">
            <option v-for="user in getUsers">{{ user.First }} {{ user.Last }}</option>
        </b-form-select>
      </b-col>
    </b-row>
  </b-modal>

  <b-modal ref="followUpModal"
           id="followUpModal"
           @show="showClearFollowUpModal"
           @ok="followUpSubmit"
           title="Follow Up"
           style='font-family:"Roboto", "Helvetica", "Arial", sans-serif;'
           >

      <b-row class="mb-1" style="padding-bottom:5px;">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">HQLocationID:</b-col>
        <b-col style="margin-bottom:-10px;">
          {{ followUpModal.hqlocationid }}
        </b-col>
      </b-row>

      <b-row class="mb-1" style="padding-bottom:5px;">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">HQLocation Name:</b-col>
        <b-col style="margin-bottom:-10px;">
          {{ followUpModal.locationname }}
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">AssignedRep:</b-col>
        <b-col style="margin-bottom:-10px;">
          <b-form-select v-model="followUpModal.assignedrep" type="text" class="mb-3 no__border">
              <option v-for="user in allFBUsers">{{ user.First }} {{ user.Last }}</option>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Title:</b-col>
        <b-col style="margin-bottom:-10px;">
          <b-form-input v-model="followUpModal.title" type="text" class="mb-3 no__border">
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Follow Up:</b-col>
        <b-col style="margin-bottom:-10px;">
          <date-picker v-model="followUpModal.followupdate" :config="datePickOptions" class="mb-3 no__border">
          </date-picker>
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Follow Up Note:</b-col>
        <b-col style="margin-bottom:-10px;">
          <b-form-textarea :rows="4" v-model="followUpModal.followupnote" class="mb-3 no__border" />
        </b-col>
      </b-row>

  </b-modal>

  <b-modal ref="appointmentModal"
           id="appointmentModal"
           @show="showClearAppointmentModal"
           @ok="appointmentSubmit"
           title="Appointment"
           style='font-family:"Roboto", "Helvetica", "Arial", sans-serif;'
           >

      <b-row class="mb-1" style="padding-bottom:5px;">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">HQLocationID:</b-col>
        <b-col style="margin-bottom:-10px;">
          {{ appointmentModal.hqlocationid }}
        </b-col>
      </b-row>

      <b-row class="mb-1" style="padding-bottom:5px;">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">HQLocation Name:</b-col>
        <b-col style="margin-bottom:-10px;">
          {{ appointmentModal.locationname }}
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">AssignedRep:</b-col>
        <b-col style="margin-bottom:-10px;">
          <b-form-select v-model="appointmentModal.assignedrep" type="text" class="mb-3 no__border">
              <option v-for="user in allFBUsers">{{ user.First }} {{ user.Last }}</option>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Title:</b-col>
        <b-col style="margin-bottom:-10px;">
          <b-form-input v-model="appointmentModal.title" type="text" class="mb-3 no__border">
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;" >Appointment Date:</b-col>
        <b-col style="margin-bottom:-10px;">

          <date-picker v-model="appointmentModal.appointmentdate" :config="datePickOptions" class="mb-3 no__border">
          </date-picker>

        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="6" class="card__label" style="margin-bottom:-10px;">Appointment Note:</b-col>
        <b-col style="margin-bottom:-10px;">
          <b-form-textarea :rows="4" v-model="appointmentModal.appointmentnote" class="mb-3 no__border" />
        </b-col>
      </b-row>

  </b-modal>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import  { firebase, db, moment, $ } from '@/main'

import JsonExcel from 'vue-json-excel'

import MLS_KPI_card from './MLS_KPI_card.vue'

export default {
  data () {
    return {
        name: 'MLS'
      , region: '(Select All)'
      , stage: '(Select All)'
      , top100: ''
      , status: '(Select All)'
      , state: '(Select All)'
      , hadMeeting: ''
      , salesTerritory: '(Select All)'
      , pipeline: '(Select All)'
      , assignedRep: '(Select All)'
      , priorityHQ: '(Select All)'
      , pageOptions: [ 5, 10, 15, 25, 50, 100 ]
      , perPage: 25
      , totalRows: 0
      , filterShowHide: 'Hide Filters'
      , filterHide: false
      , filter: null
      , infoShowHide: 'Hide Info'
      , infoHide: false
      , loading: true
      , currentPage: 1
      , currentHQLocationKey: ''
      , currentHQLocation: ''
      , currentLocation: ''
      , currentLocationData: ''
      , locationStatusRef: ''
      , allFBUsers: ''
      , locationDetailRef: ''
      , brokerLocationKey: ''
      , contactLocationids: []
      , opened: []

      , openLastActivity: []
      , hqLocationIDs: []
      , locationLocationids: []
      , bootcontactLocationids: []
      , contactTableids: []
      , officeTableids: []
      , mlsJSONData: []
      , followUpDate: ''
      , brokerLocationDataKeys: []

      , isVendorSubmit: 0
      , isFollowUpModal: 0

      , datePickOptions: {
          // format: 'DD/MM/YYYY',
          useCurrent: true,
          minDate: new Date()
        }

      , mlsModal: {
          hqlocationid: ''
        , locationname: ''
        , locationid: ''
        , stage: ''
        , status: ''
        , isresidential: ''
        , isinternal: ''
        , estlistings: ''
        , locationHRef: ''
        , pipeline: ''

        , activelistings: ''
        , brokercount: ''
        , phoneactivities: ''
        , phonecontacted: ''
        , phonevoicemail: ''
        , emailsent: ''
        , meetings: ''
        , notes: ''
        , RecentFollowUpStatus: ''
      }

      , vendorModal: {
          hqlocationid: ''
        , locationid: ''
        , locationName: ''
        , vendor: ''
        , ismapped: '(Select All)'
      }
      , followUpModal: {
          hqlocationid: ''
        , locationname: ''
        , assignedrep: ''
        , followupdate: ''
        , followupnote: ''
        , title: ''

      }
      , appointmentModal: {
          hqlocationid: ''
        , locationname: ''
        , assignedrep: ''
        , appointmentdate: ''
        , appointmentnote: ''
        , title: ''

      }
      , priorityOptions: [
          { text: '(Select All)', value: '(Select All)' }
        , { text: 'ListHub MLS', value: 1 }
        , { text: 'Secondary MLS', value: 0 }
      ]
      , stageOptions: [
          { text: '(Select All)', value: '(Select All)' }
        , { text: 'Business Development', value: 'Business Development' }
        , { text: 'Meetings', value: 'Meetings' }
        , { text: 'Contract', value: 'Contract' }
        , { text: 'Procurement', value: 'Procurement' }
        , { text: 'Feed Integration', value: 'Feed Integration' }
        , { text: 'Live in Production', value: 'Live in Production' }
        , { text: 'Incompatible', value: 'Incompatible' }
      ]
      , stageOptionsModal: [
          { text: 'Business Development', value: 'Business Development' }
        , { text: 'Meetings', value: 'Meetings' }
        , { text: 'Contract', value: 'Contract' }
        , { text: 'Procurement', value: 'Procurement' }
        , { text: 'Feed Integration', value: 'Feed Integration' }
        , { text: 'Live in Production', value: 'Live in Production' }
        , { text: 'Incompatible', value: 'Incompatible' }
      ]
      , yesNoOptions: [
         { text: 'NA', value: 'NA'}
       , { text: 'Yes', value: 'Yes'}
       , { text: 'No', value: 'No'}
      ]
      , vendorIsMappedOptions: [
          { text: '(Select All)', value: '(Select All)' }
        , { text: 'Not mapped', value: '0' }
        , { text: 'Mapped', value: '1' }
      ]
      , locationFields: [
          { key: 'HQLocationID', label: 'HQLocationID', sortable: true}
        , { key: 'LocationName', label: 'HQLocation', sortable: true}
        , { key: 'links', label: 'Links' }
        , { key: 'actions', label: 'Actions' }
        , { key: 'Stage',  label: 'Stage', sortable: true }
        , { key: 'Status', label: 'Status', sortable: true }

        , { key: 'EstListings', label: 'Est Listings', sortable: true }
        , { key: 'ActiveListings', label: 'Active Listings', sortable: true }
        // , { key: 'Broker Count', label: 'Broker Count' }
        , { key: 'City', label: 'City', sortable: true }
        , { key: 'State', label: 'State', sortable: true }
        , { key: 'Met90Days', label: 'Met90Days', sortable: true }
        , { key: 'TotalMeetings', label: 'TotalMeetings', sortable: true }
        , { key: 'LastMeetingDate', label: 'LastMeetingDate', sortable: true }
        , { key: 'LastEmailDate', label: 'LastEmailDate', sortable: true }
        , { key: 'LastPhoneDate', label: 'LastPhoneDate', sortable: true }
      ]

    , officeFields: [
      { key: 'OfficeName', label: 'Office Name'}
    ],
    json_fields2: {
          'Complete name': 'name',
          'City': 'city',
          'Telephone': 'phone.mobile',
          'Telephone 2' : {
              field: 'phone.landline',
              callback: (value) => {
                  return `Landline Phone - ${value}`;
              }
          },
      },
      location_fields: {
          'Territory': 'Territory',
          'Employee': 'Employee',
          'HQLocationID': 'HQLocationID',
          'LocationID': 'LocationID',
          'LocationName': 'LocationName',
          'ActiveListings': 'ActiveListings',
          'Address': 'Address',
          'City': 'City',
          'State': 'State',
          'Stage': 'Stage',
          'Status': 'Status',
          'Pipeline': 'Pipeline',
          'Vendor': 'Vendor',
          'IsHQ': 'IsHQ',
          'IsDivHQ': 'IsDivHQ',
          'EstListings': 'EstListings',
          'DaysSinceLastMeeting': 'DaysSinceLastMeeting',
          'Met30Days': 'Met30Days',
          'Met60Days': 'Met60Days',
          'Met90Days': 'Met90Days',
          'Met180Days': 'Met180Days',
          'TotalMeetings': 'TotalMeetings',
          'LastMeetingDate': 'LastMeetingDate',
          'LastPhoneDate': 'LastPhoneDate',
          'LastEmailDate': 'LastEmailDate',
          'LocationURL': 'LocationURL',
          'ActivityURL': 'ActivityURL',
          'TimeZone': 'TimeZone',
          'UpdatedDate': 'Updated',
          'UpdatedBy': 'UpdatedBy',
          'SortOrder': 'SortOrder'
        },
      mlsAgent_fields: {
          'LocationID': ' LocationID',
          'LocationName': ' LocationName',
          'LocationPhone': ' LocationPhone',
          'ContactName': ' ContactName',
          'ContactPhone': ' ContactPhone',
          'ContactWebsite': ' ContactWebsite',
          'EmailAddress': ' EmailAddress',
          'Address': ' Address',
          'City': ' City',
          'State': ' State',
          'Zip': ' Zip',
          'Listings2016': ' Listings2016',
          'Listings2017': ' Listings2017',
          'Listings2018': ' Listings2018'          
      },
      json_meta: [
          [
              {
                  'key': 'charset',
                  'value': 'utf-8'
              }
          ]
      ],
    }
  }
  ,  mounted() {
      // $(document).ready(function(){
        $('.modal-dialog').draggable({
          handle: ".modal-header"
        });

        $('#bbtn--survey').click(function() {
          // reset modal if it isn't visible
          if (!($('.modal.in').length)) {
            $('.modal-dialog').css({
              top: 0,
              left: 0
            });
          }
        });

      // });
    }
    , filters: {
        dateTruncate(value) {
          // console.log(value)
          if(!value) return ''
          return value.substr(0, 10)
      }
      , timeTruncate(value) {
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
        }
    }
  , created () {
      // this.$store.dispatch('getAllUsers')
      // this.$store.dispatch('getCurrentFullName')
      this.$store.dispatch('getAllLocations')
      this.$store.dispatch('getAllLocation_Data')
      // this.$store.dispatch('getAllContacts')
      this.$store.dispatch('getAllDataPlatforms')
      this.$store.dispatch('getAllStages')
      this.$store.dispatch('getAllStatuses')
      this.$store.dispatch('getAllVendors')
      this.$store.dispatch('getAllFollowUps')
      this.$store.dispatch('getAllPipelines')
      this.$store.dispatch('getAllBrokerLocations')

      

  }
  , components: {
        appMLSKPIcard: MLS_KPI_card
      , JsonExcel
  }
  , props: ['allUsers', 'allCurrentUser']
  , computed: {
    ...mapGetters([
          'allLocations'
        , 'allLocation_Data'
        , 'allDataPlatforms'
        , 'allStages'
        , 'allStatuses'
        , 'allRegions'
        , 'allSalesTerritories'
        , 'allStates'
        , 'allVendors'
        , 'allFollowUps'
        , 'allPipelines'
        , 'allBrokerLocations'
        // , 'allCurrentUser.ContactID'
        // , 'allCurrentUser.FullName'
        // , 'allUsers'
    ])
    , stagesArr () {
        return Object.values(this.allStages)
    }
    , statusesArr () {
        return Object.values(this.allStatuses)
    }
    , locationsArr () {
        return Object.values(this.allLocations)
    }
    , fuDateState () {
        return this.followUpModal.followupdate == null || this.followUpModal.followupdate == '' ? false : true
    }
    , apptDateState () {
        return this.appointmentModal.appointmentdate == null || this.appointmentModal.appointmentdate == '' ? false : true
    }
    , brokerLocationsArr () {
        var brokerLocations = Object.values(this.allBrokerLocations)
        var brokerLocationsU = [...new Set(brokerLocations.map(s => s.LocationDataKey))]
        this.brokerLocationDataKeys = brokerLocationsU
        // console.log(this.brokerLocationDataKeys)
        this.$forceUpdate()
        return brokerLocations
    }
    , filteredData () {
        this.hqLocationIDs = []
        if(Object.keys(this.allLocations).length===0&&this.allLocations.constructor===Object) {} else {

          var filterData = this.locationsArr
          filterData = filterData.filter( item => { return (item.IsHQ == '1') })
          // console.log(this.allLocation_Data)

          filterData.forEach((location) => {
            if(location.CurrentDataKey !== null && this.allLocation_Data[location.CurrentDataKey]) {
              var locationData = this.allLocation_Data[location.CurrentDataKey]
              if(location.RecentFollowUpKey !== null && this.allFollowUps[location.RecentFollowUpKey]  ) {
                location.RecentFollowUp = this.allFollowUps[location.RecentFollowUpKey]
              } else {
                location.RecentFollowUp = {}
              }
              if(location.RecentAppointmentKey !== null && this.allFollowUps[location.RecentAppointmentKey]  ) {
                location.RecentAppointment = this.allFollowUps[location.RecentAppointmentKey]
              } else {
                location.RecentAppointment = {}
              }
              location.EstListings = locationData.EstListings
              location.IsResidential = locationData.IsResidential

              location.Stage = locationData.StageDesc
              location.Status = locationData.StatusDesc
              location.Vendor = locationData.Vendor
              location.Pipeline = locationData.Pipeline
              location.FeedProviderID = locationData.FeedProviderID

              location.LocationDataKey = this.getKeyByFBID(this.allLocations, location.FBID)

            }
          })
          if(this.stage==='(Select All)'||!this.stage){}else{
            filterData = filterData.filter(data => {
              return data.Stage===this.stage
            })
          }
          if(this.status==='(Select All)'||!this.status){}else{
            filterData = filterData.filter(data => {
              return data.Status===this.status
            })
          }
          if(this.salesTerritory==='(Select All)'||!this.salesTerritory){}else{
            filterData = filterData.filter(data => {
              return data.Territory===this.salesTerritory
            })
          }
          if(this.subregion==='(Select All)'||!this.subregion){}else{
            filterData = filterData.filter(data => {
              return data.SubRegion===this.subregion
            })
          }
          if(this.state==='(Select All)'||!this.state){}else{
            filterData = filterData.filter(data => {
              return data.State===this.state
            })
          }
          if(this.pipeline==='(Select All)'){}else{
            filterData = filterData.filter(data => {
              return data.Pipeline===this.pipeline
            })
          }
          if(this.priorityHQ==='(Select All)'){}else{
            filterData = filterData.filter(data => {
              return data.PriorityHQ===this.priorityHQ
            })
          }
          if(this.assignedRep==='(Select All)'){}else{
            filterData = filterData.filter(data => {
              return data.RecentFollowUp.AssignedRep===this.assignedRep||data.RecentAppointment.AssignedRep===this.assignedRep
            })
          }
          if(this.filter==null||this.filter==''||this.filterData){}else{
            filterData = filterData.filter(data => {
              data = Object.values(data).toString().toLowerCase()
              return data.includes(this.filter.toLowerCase())
            })
          }
          filterData.forEach(data => {
            this.hqLocationIDs.push(data.HQLocationID)
          })
          //console.log(this.hqLocationIDs)
          this.loading = false
          return filterData
        }
    }

    , stagesDistinct () {
        // console.log('Compute salesRepDistinct')
        let list
        var Stages = this.stagesArr
        // if((!this.surveyRep&&!this.timeZone)||!this.filteredData){
        //   list = this.allSalesReps
        // } else{
        list = Stages.sort((a,b) => { return a.SortOrder - b.SortOrder })
        // }
        return list
    }

    , statusesDistinct () {
        // console.log('Compute salesRepDistinct')
        let list
        var filterList = []
        var Statuses = this.statusesArr
        var Stages = this.stagesArr
        // console.log("this.stage=", this.stage)
        if(this.stage=='(Select All)'){
          list = Statuses.sort((a,b) => { return a.SortOrder - b.SortOrder })
          // console.log("list=", list)
          return list
        }
        if(this.stage){
          var StageID = Stages.find(a => a.StageDesc == this.stage).StageID
          // console.log("StageID =", StageID)
          Statuses.forEach((status) => {
            if(StageID==status.StageID){
              filterList.push(status)
            }
          })
          filterList.sort((a,b) => { return a.SortOrder - b.SortOrder })
          // console.log("list =",list)
          return filterList
        }
        list = Statuses.map((a,b) => { return a['StatusDesc'] })
        return list
    }

    , sortedAllLocationDetails () {
      // console.log("sortedAllLocations")
      if(this.allLocations) {
        var locations = this.locationsArr
        locations.filter(data => {
          // console.log(this.locationLocationids.includes(data.HQLocationID))
          return this.locationLocationids.includes(data.HQLocationID)
          // return this.officeTableids.includes(data.HQLocationID)
        })

        return locations
      }
    }
    // , bootAllContacts () {
    //      if(this.allContacts){
    //         var allContacts = Object.values(this.allContacts)
    //           allContacts = allContacts.filter(data => {
    //           return this.bootcontactLocationids.includes(data.LocationID)
    //        })
    //        return allContacts
    //     }
    // }

    , stagesModal () {
        if(this.allStages) {
          var allStages = this.stagesArr
          allStages = allStages.sort((a,b) => { return a.SortOrder - b.SortOrder })
          return allStages
        }
    }

    , allVendorsModal () {
        var allVendors = Object.values(this.allVendors)
        if (this.vendorModal.ismapped=='(Select All)'){} else {

              allVendors = allVendors.filter(data => {
                return data.IsMapped==this.vendorModal.ismapped
              })
        }
        // allVendors = allVendors.sort((a,b) => { return b.Vendor - a.Vendor }).Vendor
        allVendors = allVendors.map(a => { return a.Vendor }).sort()
        return allVendors
    }

    , pipelinesModal () {
        if(this.allPipelines) {
          var allPipelines = Object.values(this.allPipelines)
          allPipelines = allPipelines.sort((a,b) => { return a.SortOrder - b.SortOrder })
          return allPipelines
        }
    }
    // , sortedAllContacts () {
    //      if(this.allContacts){
    //        var allContacts = Object.values(this.allContacts)
    //        allContacts = allContacts.filter(data => {
    //          return this.contactLocationids.includes(data.LocationID)
    //        })
    //        return allContacts
    //     }
    // }

    , statusesModal () {
        var Statuses = this.statusesArr
        var Stages = this.stagesArr
        var filterList = []

        if(this.mlsModal.stage){
          var StageID = Stages.find(a => a.StageDesc == this.mlsModal.stage).StageID
          // console.log("StageID =", StageID)
          Statuses.forEach((status) => {
            if(StageID==status.StageID){
              filterList.push(status)
            }
          })
          filterList.sort((a,b) => { return a.SortOrder - b.SortOrder })
          // console.log("filterList =", filterList)
          return filterList
        }
    }
    , getUsers () {
        if (this.allUsers) {
          var allUsers = []
          allUsers = Object.values(this.allUsers)
          // console.log("MLS getUsers", allUsers)
          this.allFBUsers = allUsers
          return this.allUsers
        }
    }
    , allKPIs () {
        var kpis = []
        if (this.filteredData&&this.filterData!==null) {
          var a = this.filteredData
          var activeListingsArr = []
          var met7DaysArr = []
          var met30DaysArr = []
          var met60DaysArr = []
          var met90DaysArr = []
          var met180DaysArr = []
          var met2018Arr = []
          var partnersArr = []
          var totalMetArr = []

          var fourfiveDaysArr = []
          var fournineDaysArr = []
          var nineplusDaysArr = []
          var prospectsMetArr = []
          var unknownArr = []

          var hqLocations = a.filter(a => a.IsHQ == '1')

          var today = new Date()

          hqLocations.forEach(mls => {
            var LastMeetingDate = new Date(mls.LastMeetingDate)

            LastMeetingDate.getFullYear() == '2018' ? met2018Arr.push(1) : ''

            mls.ActiveListings ? activeListingsArr.push(mls.ActiveListings) : ''
            Math.round((today-LastMeetingDate)/(1000*60*60*24)) <= 7 ? met7DaysArr.push(1) : ''
            mls.Met30Days == '1' ? met30DaysArr.push(mls.Met30Days) : ''
            mls.Met60Days == '1' ? met60DaysArr.push(mls.Met60Days) : ''
            mls.Met90Days == '1' ? met90DaysArr.push(mls.Met90Days) : ''
            mls.Met180Days == '1' ? met180DaysArr.push(mls.Met180Days) : ''

            mls.TotalMeetings > 0 ? totalMetArr.push(mls.TotalMeetings) : ''

            mls.Pipeline == '<45 Days' && mls.Stage !== 'Production' ? fourfiveDaysArr.push(1) : ''
            mls.Pipeline == '45-90 Days' && mls.Stage !== 'Production' ? fournineDaysArr.push(mls.ActiveListings) : ''
            mls.Pipeline == '90+ Days' && mls.Stage !== 'Production' ? nineplusDaysArr.push(mls.ActiveListings) : ''
            mls.Pipeline == '' && mls.Stage !== 'Production' ? unknownArr.push(mls.ActiveListings) : ''

            mls.Stage == 'Production' ? partnersArr.push(mls.ActiveListings) : ''
            mls.Stage !== 'Production' && mls.TotalMeetings > 0 ? prospectsMetArr.push(1) : ''

          })

          kpis.met7DaysTotal = met7DaysArr==null ? 0 : Number(this.sumArray(met7DaysArr)).toLocaleString()
          kpis.met30DaysTotal = met30DaysArr==null ? 0 : Number(this.sumArray(met30DaysArr)).toLocaleString()
          kpis.met60DaysTotal = met60DaysArr==null ? 0 : Number(this.sumArray(met60DaysArr)).toLocaleString()
          kpis.met90DaysTotal = met90DaysArr==null ? 0 : Number(this.sumArray(met90DaysArr)).toLocaleString()
          kpis.met180DaysTotal = met180DaysArr==null ? 0 : Number(this.sumArray(met180DaysArr)).toLocaleString()

          kpis.met2018Perc = this.totalRows == 0 ? 0 : (met2018Arr==null ? 0 : Number(this.sumArray(met2018Arr)) / Number(this.totalRows))
          kpis.met2018Perc = Math.floor(kpis.met2018Perc*100)

          kpis.countMLS = Number(hqLocations.length).toLocaleString()
          kpis.countListings = activeListingsArr==null ? 0 : Number(this.sumArray(activeListingsArr)).toLocaleString()

          kpis.countFourFiveDays = Number(fourfiveDaysArr.length).toLocaleString()
          kpis.percFourFiveDays = this.totalRows == 0 ? 0 : (kpis.countFourFiveDays==null ? 0 : Math.floor(Number(kpis.countFourFiveDays) / Number(this.totalRows)*100))

          kpis.countFourNineDays = Number(fournineDaysArr.length).toLocaleString()
          kpis.percFourNineDays = this.totalRows == 0 ? 0 : (kpis.countFourNineDays==null ? 0 : Math.floor(Number(kpis.countFourNineDays) / Number(this.totalRows)*100))

          kpis.countNinePlusDays = Number(nineplusDaysArr.length).toLocaleString()
          kpis.percNinePlusDays = this.totalRows == 0 ? 0 : (kpis.countNinePlusDays==null ? 0 : Math.floor(Number(kpis.countNinePlusDays) / Number(this.totalRows)*100))

          kpis.countUnknown = Number(unknownArr.length).toLocaleString()
          kpis.percUnknown = this.totalRows == 0 ? 0 : (kpis.countUnknown==null ? 0 : Math.floor(Number(kpis.countUnknown) / Number(this.totalRows)*100))

          kpis.countPartners = Number(partnersArr.length).toLocaleString()
          kpis.percPartners = this.totalRows == 0 ? 0 : (kpis.countPartners==null ? 0 : Math.floor(Number(kpis.countPartners) / Number(this.totalRows)*100))

          kpis.listPartners = partnersArr==null ? 0 : Number(this.sumArray(partnersArr)).toLocaleString()
          kpis.prospects = this.totalRows == 0 ? 0 : this.totalRows - kpis.countPartners
          kpis.progress = this.totalRows == 0 ? 0 : Math.floor((kpis.countPartners / Number(this.totalRows)) * 100)
          kpis.prospectsMet = Number(this.sumArray(prospectsMetArr))
          kpis.percProspectsMet = kpis.prospects == 0 ? 0 : Math.floor( (kpis.prospectsMet / kpis.prospects ) * 100 )
          kpis.totalMLSs = this.totalRows
          kpis.totalMeetings = totalMetArr==null ? 0 : Number(this.sumArray(totalMetArr)).toLocaleString()
          kpis.countTotalMeetings = Number(totalMetArr.length).toLocaleString()
          kpis.percTotalMet = this.totalRows == 0 ? 0 : Math.floor(( kpis.countTotalMeetings / this.totalRows ) * 100)

          return kpis
        } else {

          kpis.met30DaysTotal = ''
          kpis.met60DaysTotal = ''
          kpis.met90DaysTotal = ''
          kpis.met180DaysTotal = ''
          kpis.countMLS = ''
          kpis.countListings = ''
          kpis.progress = ''
          return kpis
        }
    }
    , stageFilter () {
        this.clearStatus()

    }
    , mlsDataToExcel () {
        // This is fed by filteredData()
        var locations = this.locationsArr
        locations = locations.filter(data => {
          return this.hqLocationIDs.includes(data.HQLocationID) && data.IsActive == 1
        })
        //console.log(locations[0])
        return locations
    }
    , mlsAgentsToExcel () {
        var locations = this.brokerLocationsArr
        // console.log(this.brokerLocationKey)
        locations = locations.filter(data => {
          return this.brokerLocationKey == data.LocationDataKey
        })
        // console.log("mlsAgentsToExcel() locations", locations)
        return locations
    }
  }
  , methods: {
    
     sumArray (arr) {
      var total = 0
      arr.forEach(a => {
        total += Number(a)
      })
      return total
    }
    , getLocationHRef(data) {
        this.locationHRef = data
        // window.location.href = data
        window.open(this.locationHRef, '_blank')
        // console.log(this.locationHRef)
        return false
    }
    , getActivityHRef(data) {
        this.ActivityHRef = data
        // window.location.href = data
        window.open(this.ActivityHRef, '_blank')
        // console.log(this.locationHRef)
        return false
    }

    , onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
    }
   , handleOk (evt) {
       // Prevent modal from closing
      if (this.allCurrentUser.Roles.Editor==0) {
        evt.preventDefault()
        alert('You do not have the necessary permissions to change this data.')
      } else {
        if(this.isVendorSubmit==0) {
          if( this.currentLocationData.StatusDesc != this.mlsModal.status  ) {
            //ONLY if the STATUS changes check pending
            if(this.currentHQLocation.Location.RecentFollowUp.Status == 'pending' ) {
                //NO-UPDATE
                evt.preventDefault()
                alert("There is a pending follow up on this location.")
                // AUTO CANCEL PENDING FOLLOW UP LOGIC HERE
              // }
            } else {
              //NOT PENDING
              if(this.mlsModal.stage=='Production') {
                //console.log(this.allCurrentUser.Roles)
                if(this.allCurrentUser.Roles.Manager==1||this.allCurrentUser.Roles.Admin==1) {
                  this.locationDataSubmit()
                } else {
                  evt.preventDefault()
                  alert('You do not have the necessary permissions to change the Stage to Production.')
                }
              } else {
                  this.locationDataSubmit()
              }
            }
          } else {
            this.locationDataSubmit()
          }
        // VENDOR UPDATE
        } else {
            this.vendorUpdateSubmit()
        }
      }
    }

   , locationDataSubmit() {
       var insertDateTime = moment().format('YYYY-MM-DD kk:mm:ss.SSS')
       // console.log('FIREBASE CALL customerEditHandleSubmit')
       var newLocDataRef = db.collection('Location_Details').doc()
       this.locationDetailRef = newLocDataRef.id
       this.locationStatusRef = this.mlsModal.status
       var currentLocData = this.allLocation_Data[this.currentLocation.CurrentDataKey]
       // console.log(newCustDataKey)
       JSON.parse(JSON.stringify(this.mlsModal))
       // console.log("currentLocData =",currentLocData)
       newLocDataRef.set(
         {
           FBID: this.generateFBID(),
           HQLocationID: currentLocData.HQLocationID,
           LocationID: currentLocData.LocationID,
           //LocationName: currentLocData.LocationName,
           LocationKey: currentLocData.LocationKey,
           StageID: this.stageIDLookup(this.mlsModal.stage),
           StageDesc: this.mlsModal.stage,
           StatusID:  this.statusIDLookup(this.mlsModal.status),
           StatusDesc: this.mlsModal.status,
           IsResidential:  this.mlsModal.isresidential == true ? '1' : '0',
           InternalContract: this.mlsModal.isinternal == true ? '1' : '0',
           EstListings:  this.mlsModal.estlistings,
           Pipeline: !this.mlsModal.pipeline ? '' : this.mlsModal.pipeline,
           PipelineID: !this.mlsModal.pipeline ? '' : this.pipelineIDLookup(this.mlsModal.pipeline),
           DataPlatformID: currentLocData.DataPlatformID,
           FeedProviderID: currentLocData.FeedProviderID,
           Vendor: currentLocData.Vendor,
           Notes: '',
           IsActive: '1',
           Created: insertDateTime,
           CreatedBy: !this.allCurrentUser.ContactID ? '' : this.allCurrentUser.ContactID,
           Updated: insertDateTime,
           UpdatedBy: this.allCurrentUser.ContactID
         }
       )
       .then(
         db.collection('Location_Details').doc(this.currentLocation.CurrentDataKey).update(
           {
             IsActive: '0',
             Updated: insertDateTime,
             UpdatedBy: this.allCurrentUser.ContactID
           }
         ).catch((err) => {
           console.log("There was an error:", err)
           alert('There was an issue with the update.')
         })
       )
       .then(
        db.collection('Locations').doc(this.currentLocationData.LocationKey).update(
          {
            CurrentDataKey: newLocDataRef.id,
            Updated: insertDateTime,
            UpdatedBy: this.allCurrentUser.ContactID
          }
        ).catch((err) => {
          console.log("There was an error:", err)
          alert('There was an issue with the update.')
        })
       )
       .then(async a => {        
         if(this.mlsModal.stage == 'Production') {
             this.mlsProdPost(this.currentLocationData.LocationKey)
         } else if (this.mlsModal.stage != 'Production' && this.currentLocationData.StageDesc == 'Production') {
            //  console.log("Switch current MLS_Production IsActive = 0")
             this.mlsProdRemoveActive(this.currentLocationData.LocationKey)
         }
       }).catch((err) => {
         console.log("There was an error:", err)
         alert('There was an issue with the update.')
       })
       if(this.mlsModal.stage=='Business Development' || this.currentLocationData.StatusDesc == this.mlsModal.status ) {
       } else {
         this.isFollowUpModal = 1
         // this.LocationDataRef =
         this.$refs.followUpModal.show()
       }
   }

  , async mlsProdRemoveActive (locationKey) {
      var insertDateTime = moment().format('YYYY-MM-DD kk:mm:ss.SSS')
      await db.collection('MLS_Production')
        .where('LocationKey', '==', locationKey)
        .where('IsActive', '==', 1)
        .get()
        .then(doc => {
          if(doc.exists) {
            doc.ref.update(
              {
                IsActive: 0,
                Updated: insertDateTime,
                UpdatedBy: this.allCurrentUser.ContactID
              }
            ).catch(e => { console.log(e) })
          }
        })
  }

  , async mlsProdPost (locationKey) {
      var insertDateTime = moment().format('YYYY-MM-DD kk:mm:ss.SSS')
      // var locationKey = '4wVxtfB6fAFR2YTU5Zu6'
      var currentLocData = this.currentLocationData
      var newMLSPRODRef = await db.collection('MLS_Production').doc()
      var currentMLSProdKey = '' 
      var fulfillmentDate = ''

      await db.collection('MLS_Production')
              .where('LocationKey', '==', locationKey)
              .where('IsActive', '==', 1)
              .get()
              .then(snap => {
                  snap.forEach(doc => {
                      currentMLSProdKey = doc.id
                  })                
                  //console.log(currentMLSProdKey)
              })

       await db.collection('Location_Details')
                .where('LocationKey', '==', locationKey)
                .where('StageDesc', '==', 'Fulfillment')
                .where('Created', '>', '0')
                .orderBy('Created', 'asc')
                .limit(1)
                .get()
                .then(snap => {
                    snap.forEach(doc => {
                        fulfillmentDate = doc.data().Created
                    })
                }).catch(e => { console.log(e) })

      await newMLSPRODRef.set(
          {
              FBID: this.generateFBID(),
              HQLocationID: currentLocData.HQLocationID,
              LocationID: currentLocData.LocationID,
              LocationKey: locationKey,
              LocationName: this.currentLocation.LocationName,
              IsActive: 1,
              SentBy: this.allCurrentUser.ContactID,
              StageID: this.stageIDLookup(this.mlsModal.stage),
              StageDesc: this.mlsModal.stage,
              StatusID:  this.statusIDLookup(this.mlsModal.status),
              StatusDesc: this.mlsModal.status,
              AssignedRep: '',
              SecondaryRep: '',
              FulfillmentDate: fulfillmentDate ? fulfillmentDate : '',
              Created: insertDateTime,
              CreatedBy: this.allCurrentUser.ContactID,
              Updated: insertDateTime,
              UpdatedBy: this.allCurrentUser.ContactID
          }
      )
      .then(b => {
          if(currentMLSProdKey) {
              db.collection('MLS_Production').doc(currentMLSProdKey).get().then(doc => {
                  //console.log(doc)
                  if(doc.exists) {
                      doc.ref.update(
                          {
                              IsActive: 0,
                              Updated: insertDateTime,
                              UpdatedBy: this.allCurrentUser.ContactID
                          }).catch(e => { 
                              console.log('There was an issue with updating previous MLS Production record:', e) 
                              alert('There was an issue with updating previous MLS Production record.')
                          })

                  } else { 
                    //console.log("DOES NOT EXIST") 
                  }        
              })
          }   
      }).catch((err) => {
          console.log("There was an issue with the MLS Production update:", err)
          alert('There was an issue with the MLS Production update.')
      })
  }

   , followUpSubmit (evt) {
      if (!this.fuDateState) {
        evt.preventDefault()
        alert("Please enter a follow up date.")
      } else {
        var insertDateTime = moment().format('YYYY-MM-DD kk:mm:ss.SSS')
        var newFollowUpRef = db.collection('FollowUps').doc()
        var newFollowUpNotesRef = newFollowUpRef.collection('Notes').doc()
        JSON.parse(JSON.stringify(this.followUpModal))
        newFollowUpRef.set(
          {
            FBID: this.generateFBID(),
            HQLocationID: this.currentLocationData.HQLocationID,
            LocationID: this.currentLocationData.LocationID,
            LocationName: this.currentLocation.LocationName,
            AssignedRep: this.followUpModal.assignedrep,
            Title: this.followUpModal.title,
            Type: 'F',
            Notes: this.followUpModal.followupnote,
            ScheduledDate: this.followUpModal.followupdate,
            CurrentNoteRef: newFollowUpNotesRef.id,
            Status: 'pending',
            Color: 'f-pending',
            LocationDetailRef: this.locationDetailRef,
            Created: insertDateTime,
            CreatedBy: this.allCurrentUser.ContactID,
            Updated: '',
            UpdatedBy: ''
          }
        )
        .then(
          newFollowUpNotesRef.set({
             FBID: this.generateFBID(),
             HQLocationID: this.followUpModal.hqlocationid,
             FollowUpKey: newFollowUpRef.id,
             Note: this.followUpModal.followupnote,
             Created: insertDateTime,
             CreatedBy: this.allCurrentUser.ContactID,
             SortOrder: -new Date(insertDateTime)
           }).catch((err) => {
             console.log("There was an error:", err)
             alert('There was an issue with the update.')
           })
       )
        .then(
          db.collection('Locations').doc(this.currentLocationData.LocationKey).update(
            {
              RecentFollowUpKey: newFollowUpRef.id,
              Updated: insertDateTime,
              UpdatedBy: this.allCurrentUser.ContactID
            }
          ).catch((err) => {
            console.log("There was an error:", err)
            alert('There was an issue with the update.')
          })
        )
        .catch((err) => { console.log("There was an error:", err) })
        this.$refs.followUpModal.hide()
      }

   }

   , appointmentSubmit (evt) {
       if (!this.apptDateState) {
         evt.preventDefault()
         alert("Please enter an appointment date.")
       } else {
         var insertDateTime = moment().format('YYYY-MM-DD kk:mm:ss.SSS')
         var newFollowUpRef = db.collection('FollowUps').doc()
         var newFollowUpNotesRef = newFollowUpRef.collection('Notes').doc()
         JSON.parse(JSON.stringify(this.appointmentModal))
         newFollowUpRef.set(
           {
             FBID: this.generateFBID(),
             HQLocationID: this.currentLocationData.HQLocationID,
             LocationID: this.currentLocationData.LocationID,
             LocationName: this.currentLocation.LocationName,
             AssignedRep: this.appointmentModal.assignedrep,
             Title: this.appointmentModal.title,
             Type: 'A',
             Notes: this.appointmentModal.appointmentnote,
             ScheduledDate: this.appointmentModal.appointmentdate,
             CurrentNoteRef: newFollowUpNotesRef.id,
             Status: 'pending',
             Color: 'a-pending',
             LocationDetailRef: '',
             Created: insertDateTime,
             CreatedBy: this.allCurrentUser.ContactID,
             Updated: '',
             UpdatedBy: ''
           }
         )
         .then(
           newFollowUpNotesRef.set({
              FBID: this.generateFBID(),
              HQLocationID: this.appointmentModal.hqlocationid,
              FollowUpKey: newFollowUpRef.id,
              Note: this.appointmentModal.appointmentnote,
              Created: insertDateTime,
              CreatedBy: this.allCurrentUser.ContactID,
              SortOrder: -new Date(insertDateTime).getTime()
            })
        )
         .then(
           db.collection('Locations').doc(this.currentLocationData.LocationKey).update(
             {
               RecentAppointmentKey: newFollowUpRef.id,
               Updated: insertDateTime,
               UpdatedBy: this.allCurrentUser.ContactID
             }
           ).catch((err) => {
             console.log("There was an error:", err)
             alert('There was an issue with the update.')
           })
         )
         .catch((err) => { console.log("There was an error:", err) })
         this.$refs.appointmentModal.hide()
      }
   }
   , vendorUpdateSubmit () {
       var insertDateTime = moment().format('YYYY-MM-DD kk:mm:ss.SSS')
       // console.log('FIREBASE CALL customerEditHandleSubmit')
       var newLocDataRef = db.collection('Location_Details').doc()
       // console.log("this.currentLocationData =", this.currentLocationData)
       var currentLocData = this.allLocation_Data[this.currentLocation.CurrentDataKey]
       // console.log(newCustDataKey)
       JSON.parse(JSON.stringify(this.vendorModal))
       // console.log("currentLocData =",currentLocData)
       newLocDataRef.set(
         {
           FBID: this.generateFBID(),
           HQLocationID: currentLocData.HQLocationID,
           LocationID: currentLocData.LocationID,
           LocationKey: currentLocData.LocationKey,
           StageID: currentLocData.StageID,
           StageDesc: currentLocData.StageDesc,
           StatusID:  currentLocData.StatusID,
           StatusDesc: currentLocData.StatusDesc,
           IsResidential:  currentLocData.IsResidential == true ? '1' : '0',
           InternalContract: this.mlsModal.isinternal == true ? '1' : '0',
           EstListings: currentLocData.EstListings,
           Pipeline: currentLocData.Pipeline,
           PipelineID: !currentLocData.PipelineID ? '' : currentLocData.PipelineID,
           DataPlatformID: currentLocData.DataPlatformID,
           FeedProviderID: this.vendorIDLookup(this.vendorModal.vendor),
           Vendor: this.vendorModal.vendor,
           Notes: 'Vendor Update',
           IsActive: '1',
           Created: insertDateTime,
           CreatedBy: this.allCurrentUser.ContactID,
           Updated: '',
           UpdatedBy: ''
         }
       )
       .then(
         db.collection('Location_Details').doc(this.currentLocation.CurrentDataKey).update(
           {
             IsActive: '0',
             Updated: insertDateTime,
             UpdatedBy: this.allCurrentUser.ContactID
           }
         ).then(
           db.collection('Locations').doc(this.currentLocationData.LocationKey).update(
             {
               CurrentDataKey: newLocDataRef.id,
               Updated: insertDateTime,
               UpdatedBy: this.allCurrentUser.ContactID
             }
           )
         )
        )
       .catch((err) => { console.log("There was an error:", err) })
       this.$refs.vendorModal.hide()
   }


   , stageIDLookup (stage) {
      if(stage) {
        var Stages = this.stagesArr
        // console.log("stage =", stage)
        // console.log("Stages =", Stages)
        var stageID = Stages.find(a => a.StageDesc == stage).StageID
        return stageID
      }
   }
   , statusIDLookup (status) {
        var Statuses = this.statusesArr
        var statusID = Statuses.find(a => a.StatusDesc == status).StatusID
        return statusID
   }
   , vendorIDLookup (vendor) {
       var vendors = Object.values(this.allVendors)
       // console.log("stage =", stage)
       // console.log("Stages =", Stages)
       var vendorID = vendors.find(a => a.Vendor == vendor).FeedProviderID
       return vendorID
   }

   , pipelineIDLookup (data) {
       if (data) {
         var pipelines = Object.values(this.allPipelines)
         var pipelineID = pipelines.find(a => a.Pipeline == data).PipelineID
         return pipelineID.toString()
       } else {
         return ''
       }
   }

   , generateFBID () {
      let d = new Date().getTime()
      let FBID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      this.setFBID = FBID
      return FBID
   }
   , makeFilterShowHide () {
      this.filterHide = !this.filterHide
      if(this.filterHide) {
          this.filterShowHide = 'Show Filters'
      } else {
          this.filterShowHide = 'Hide Filters'
      }
    }
    , makeInfoShowHide () {
        this.infoHide = !this.infoHide
        if(this.infoHide) {
            this.infoShowHide = 'Show Info'
        } else {
            this.infoShowHide = 'Hide Info'
        }
    }
    , getKeyByFBID (object, value) {
        return Object.keys(object).find(key => object[key]['FBID'] === value)
    }

    , toggleContacts (id, locationid) {
        const idIndex = this.opened.indexOf(id);
        const locIndex = this.contactLocationids.indexOf(locationid);
        if (idIndex > -1) {
          this.opened.splice(idIndex, 1)
        } else {
          this.opened.push(id)
        }
        if (locIndex > -1) {
          this.contactLocationids.splice(locIndex, 1)
        } else {
          this.contactLocationids.push(locationid)
        }
     }

     , toggleContactTable (locationid) {
         const locIndex = this.contactTableids.indexOf(locationid);
         if (locIndex > -1) {
           this.contactTableids.splice(locIndex, 1)
         } else {
           this.contactTableids.push(locationid)
         }
      }

      , toggleOfficeTable (locationid) {
          const locIndex = this.officeTableids.indexOf(locationid);
          if (locIndex > -1) {
            this.officeTableids.splice(locIndex, 1)
          } else {
            this.officeTableids.push(locationid)
            // console.log(this.officeTableids)
          }
       }

     , bootToggleContacts (locationid) {
         const locIndex = this.bootcontactLocationids.indexOf(locationid);
         if (locIndex > -1) {
           this.bootcontactLocationids.splice(locIndex, 1)
         } else {
           this.bootcontactLocationids.push(locationid)
         }
      }

    , toggleLocations (locationid) {
        const locIndex = this.locationLocationids.indexOf(locationid);
        if (locIndex > -1) {
          this.locationLocationids.splice(locIndex, 1)
        } else {
          this.locationLocationids.push(locationid)
        }
    }

    , toggleLastActivity (id) {
        const index = this.openLastActivity.indexOf(id);
        if (index > -1) {
          this.openLastActivity.splice(index, 1)
        } else {
          this.openLastActivity.push(id)
        }
      }

    , setBrokerLocationDataKey (data) {
        // console.log(data)
        this.brokerLocationKey = this.getKeyByFBID( this.allLocations, data.FBID)
    }

    , setActiveRecord (data) {
        this.currentHQLocation = []
        this.currentHQLocationKey = this.getKeyByFBID(this.allLocations, data.FBID)
        // console.log("currentFBID", data.FBID)
        // console.log("currentHQLocationKey =",this.currentHQLocationKey)

        this.currentLocation = this.allLocations[this.currentHQLocationKey]
        this.currentLocationData = this.allLocation_Data[this.currentLocation.CurrentDataKey]
        // console.log(this.currentLocation)
        // var RecentFollowUp = if( this.allFollowUps[this.currentLocation.RecentFollowUpKey] ){ return this.allFollowUps[this.currentLocation.RecentFollowUpKey] }else{ return {} }

        var Location = this.currentLocation
        var LocationData = this.currentLocationData

        this.currentHQLocation = { Location, LocationData }
        // console.log('this.currentHQLocation', this.currentHQLocation)
        this.isVendorSubmit = 0
    }
    , setActiveRecord2 (data) {
        this.currentHQLocation = []
        this.currentHQLocationKey = this.getKeyByFBID(this.allLocations, data.FBID)
        // console.log("currentHQLocationKey =",this.currentHQLocationKey)
        this.currentLocation = this.allLocations[this.currentHQLocationKey]
        this.currentLocationData = this.allLocation_Data[this.currentLocation.CurrentDataKey]
        var Location = this.currentLocation
        var LocationData = this.currentLocationData

        this.currentHQLocation = { Location, LocationData }
        //console.log(this.currentLocation)
        this.isVendorSubmit = 1
    }
    , selectMLStoUpdate () {
        this.mlsModal.hqlocationid = this.currentHQLocation.Location.HQLocationID
        this.mlsModal.locationname = this.currentHQLocation.Location.LocationName
        this.mlsModal.stage = this.currentHQLocation.LocationData.StageDesc
        this.mlsModal.status = this.currentHQLocation.LocationData.StatusDesc
        this.mlsModal.isresidential = Number(this.currentHQLocation.LocationData.IsResidential)
        this.mlsModal.isinternal = Number(this.currentHQLocation.LocationData.InternalContract)
        this.mlsModal.estlistings = this.currentHQLocation.LocationData.EstListings
        this.mlsModal.RecentFollowUpStatus = this.currentLocation.RecentFollowUp.Status
        this.mlsModal.pipeline = this.currentHQLocation.LocationData.Pipeline
    }

    , showClearMLSModal () {
        this.mlsModal.hqlocationID = ''
        this.mlsModal.locationid = ''
        this.mlsModal.stage = ''
        this.mlsModal.status = ''
        this.mlsModal.isresidential = ''
        this.mlsModal.isinternal = ''
        this.mlsModal.estlistings = ''
        this.mlsModal.RecentFollowUpStatus = ''
        this.mlsModal.pipeline = ''
        this.selectMLStoUpdate()
    }

    , selectFollowUpModal() {
      // console.log(this.currentHQLocation)
        this.followUpModal.hqlocationid = this.currentHQLocation.Location.HQLocationID
        this.followUpModal.locationname = this.currentHQLocation.Location.LocationName
        this.followUpModal.assignedrep = this.allCurrentUser.First + ' ' + this.allCurrentUser.Last
        if (this.locationDetailRef) {
          this.followUpModal.title = this.locationStatusRef
        }
        // this.followUpModal.
    }

    , showClearFollowUpModal () {
        this.followUpModal.hqlocationid = ''
        this.followUpModal.locationname = ''
        this.followUpModal.assignedrep = ''
        this.followUpModal.followupdate = ''
        this.followUpModal.followupnote = ''

        this.selectFollowUpModal()
    }
    , selectAppointmentModal() {
      // console.log(this.currentHQLocation)
        this.isFollowUpModal = 0
        this.appointmentModal.hqlocationid = this.currentHQLocation.Location.HQLocationID
        this.appointmentModal.locationname = this.currentHQLocation.Location.LocationName
        // console.log("this.allCurrentUser.FullName", this.allCurrentUser.FullName)
        this.appointmentModal.assignedrep = this.allCurrentUser.First + " " + this.allCurrentUser.Last
        // this.appointmentModal.
    }
    , showClearAppointmentModal () {
        this.appointmentModal.hqlocationid = ''
        this.appointmentModal.locationname = ''
        this.appointmentModal.title = ''
        this.appointmentModal.assignedrep = ''
        this.appointmentModal.appointmentdate = ''
        this.appointmentModal.appointmentnote = ''
        this.selectAppointmentModal()
    }

    , selectVendorUpdate () {
        this.vendorModal.hqlocationid = this.currentHQLocation.LocationData.HQLocationID
        this.vendorModal.locationname = this.currentHQLocation.Location.LocationName
        // this.vendorModal.locationid = this.currentHQLocation.Location.LocationID
        this.vendorModal.vendor = this.currentHQLocation.LocationData.Vendor
    }
    , showClearVendorModal () {
        this.vendorModal.hqlocationid = ''
        this.vendorModal.locationname = ''
        // this.vendorModal.locationid = ''
        this.vendorModal.vendor = ''
        this.selectVendorUpdate()
    }

    , clearAssignedRep () {
        this.assignedRep = '(Select All)'
    }
    , clearRegion () {
        this.region = '(Select All)'
    }
    , clearStage () {
        this.stage = '(Select All)'
    }
    , clearSalesTerritory () {
        this.salesTerritory = '(Select All)'
    }
    , clearStatus () {
        this.status = '(Select All)'
        this.$forceUpdate()
    }
    , clearState () {
        this.state = '(Select All)'
    }
    , clearPipeline () {
        this.pipeline = '(Select All)'
    }
    , clearPriority () {
        this.priorityHQ = '(Select All)'
    }
    , copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        var str = element
        $temp.val(str).select();
        document.execCommand("copy");
        // console.log($temp.val())
        $temp.remove();
    }
  }
}
</script>

<style scoped>

.headertitle {
  font-weight: 399;
  font-family: 'Copernicus';
  font-size: 46px;
}
.div__radio {
  margin:auto;
  font-size:14px;
  color: #AAAAAA;
}
ul {
  list-style-type: none;
}
li {
  display: inline;
}

#hqLocationID:hover {
  color: #77b800;
  font-weight: bold;
  cursor: pointer;
}
#lastActivity:hover {
  color: #77b800;
  font-weight: bold;
  cursor: pointer;
}
#AptsStyle:hover {
  color: #77b800;
  font-weight: bold;
  cursor: pointer;
}
#hide-filters:hover {
  color: #77b800;
  cursor: pointer;
}

#actionIcons {
  color: #77b800;
  margin: 0 5px 0 5px;
  cursor:pointer;
}
#nullIcons {
  color: #939393;
  margin: 0 5px 0 5px;
  cursor:pointer;
}

#linkIcons {
  color: #1f3b6e;
  margin: 0 5px 0 5px;
  cursor:pointer;
}

.activityInfoTble {

}

.card__label {
  margin-top:5px;
  text-align: left;
  text-indent: 30px;
}

.loader {
    animation: spin 2s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
#btable tbody {
    display:block;
    min-height: 200px;
    max-height:600px;
    overflow:auto;

}
#btable thead, tbody tr {
    display:table;
    width:100%;
    height: 100%;
    table-layout:fixed;

}

</style>