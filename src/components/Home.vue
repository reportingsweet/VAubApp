<template>
    
    <div>
        <appHeader />
        <b-tabs>

            <b-tab title="PlacementTable">
                <app-PVinTable></app-PVinTable>
            </b-tab> 

            <b-tab title="Reminders">
                <app-Reminders></app-Reminders>
            </b-tab>

            <b-tab title="LiquidCurves">
                <app-LiquidCurves></app-LiquidCurves>
            </b-tab>

            <!-- <b-tab title="Face Value">
                <app-Charts></app-Charts>
            </b-tab> -->

             <!-- <b-tab title="Map">
                <app-Map></app-Map>
            </b-tab> -->
        </b-tabs>
    
    </div>
</template>


<script>
import Header from '@/components/shared/Header'
import { mapState, mapActions, mapGetters } from 'vuex'
import PVinTable from '@/components/PVinTable'
import LiquidCurves from '@/components/LiquidCurves'

// import Charts from '@/components/Charts' 
// import HMap from '@/components/Map'

import Reminders from '@/components/Reminders'

export default {
    data () {
        return {
            name: '',

           
        }
    },
    created() {
        // this.$store.dispatch('getAllPVins')
        this.$forceUpdate()
    },
    computed: {
        ...mapGetters([
            // 'allPVins'
        ])
        // , pVinsArr() {         
        //     return Object.values(this.allPVins).sort((a,b) => { a.vintage_date - b.vintage_date })
        // }
        // , filteredData () {
        //     var pvins = this.pVinsArr
        //     pvins.forEach(data => {
        //         var formatter = new Intl.NumberFormat('en-US', {
        //             style: 'currency',
        //             currency: 'USD',
        //             minimumFractionDigits: 2
        //         })
           
        //         data.FaceValue = formatter.format(data.FaceValue)
        //     })
        //     return pvins
        // }
    },
    methods: {
        
    },
    components: {
        appHeader: Header,
        appPVinTable: PVinTable,
        // appCharts: Charts,
        // appMap: HMap,
        appReminders: Reminders,
        appLiquidCurves: LiquidCurves
    }
    
}
</script>

<style scoped>

</style>

