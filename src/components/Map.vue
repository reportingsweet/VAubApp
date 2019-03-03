<template>
    <div style="width: 500px; margin:auto;">
        <!-- <h3> Map </h3> -->
        <div id="container"></div>
        <!-- <highmaps :options="mapOptions" :constructor-type="'mapChart'" class="map" :data="loadData"></highmaps> -->
    </div>  
</template>
<!-- <script src="http://code.highcharts.com/maps/highmaps.js"></script>
<script src="http://code.highcharts.com/maps/modules/data.js"></script>
<script src="http://code.highcharts.com/mapdata/countries/us/us-all.js"></script> -->

<script>
import { $, Highcharts } from '@/main'
import { mapState, mapActions, mapGetters } from 'vuex'
// import { Chart } from 'highcharts-vue'

// var Highcharts = require('highcharts');
// require('highcharts/modules/data')(Highcharts);
// require('highcharts/modules/exporting')(Highcharts);


        


export default {
//   components: {
//       highmaps: Chart
//   },
  mounted() {
      $.getJSON('https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/us-population-density.json', function (data) {
            // Make codes uppercase to match the map data
            $.each(data, function () {
                this.code = this.code.toUpperCase();
            });
            // options.series[0].data = data;
            // console.log(data)
            var chart = new Highcharts.mapChart('container', {
                 chart : {
                // renderTo: 'container',
                borderWidth : .5,
                map: 'countries/us/us-all'
            },

            title : {
                text : 'US population density (/km²)'
            },
            exporting: {
                sourceWidth: 600,
                sourceHeight: 500
            },
            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.85)',
                floating: true,
                verticalAlign: 'top',
                y: 25
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 1,
                type: 'logarithmic',
                minColor: '#EEEEFF',
                maxColor: '#000022',
                stops: [
                    [0, '#EFEFFF'],
                    [0.67, '#4444FF'],
                    [1, '#000022']
                ]
            },

            series : [{
                // type: '',
                animation: {
                    duration: 1000
                },
                data: data,
                mapData: Highcharts.maps['countries/us/us-all'],
                joinBy: ['postal-code', 'code'],
                dataLabels: {
                    enabled: true,
                    color: 'white',
                    format: '{point.code}'
                },
                name: 'Population density',
                tooltip: {
                    pointFormat: '{point.code}: {point.value}/km²'
                }
            }]
       
         
        });
        
     })
  },
  data () {
    return {
      name: 'mapchart',
      mapOptions: {
        chart: {
            map: 'countries/us/us-all',
            borderWidth: 1
        },

        title: {
            text: 'US population density (/km²)'
        },

        exporting: {
            sourceWidth: 600,
            sourceHeight: 500
        },

        legend: {
            layout: 'horizontal',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: true,
            verticalAlign: 'top',
            y: 25
        },

        mapNavigation: {
            enabled: true
        },

        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#EFEFFF'],
                [0.67, '#4444FF'],
                [1, '#000022']
            ]
        },

        series: [{
            animation: {
                duration: 1000
            },
            data: [],
            joinBy: ['postal-code', 'code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.code}'
            },
            name: 'Population density',
            tooltip: {
                pointFormat: '{point.code}: {point.value}/km²'
            }
        }]
    
      }
    }
  },    
  computed: {
      loadData () {
          var data = require('../store/data/mapData.JSON')
        //   console.log(this.mapOptions.series)
          data.forEach(doc => {
              this.mapOptions.series[0].data.push(doc)
          })
          this.$forceUpdate()
          return this.mapOptions
      }
  }
}
</script>
 <style scoped>
.map {
  min-height: 500px;
}

#container {
    height: 500px;
    min-width: 310px;
    max-width: 600px;
    margin: 0 auto; 
}
.loading {
    margin-top: 10em;
    text-align: center;
    color: gray;
}
 </style>
