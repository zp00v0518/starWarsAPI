<template>
  <div>
  <v-progress-linear slot="progress" color="grey" v-if="progress" indeterminate></v-progress-linear>
  <s-w-table
    @showpopup="showPopup"
    v-if="!progress"
    :headers="headers"
    :dataArr='planets'
    :name='name'
  ></s-w-table>
  <popup
    @closepopup="isShowPopup = !isShowPopup"
    v-if="isShow"
    :item="item"
  ></popup>

  </div>
</template>

<script>
import SWTable from './SWTable.vue'
import Popup from './Popup.vue'

export default {
  name: 'Planets',
  components: {SWTable, Popup},
  props: {
    getAllData: {
      type: Function
    }
  },
  computed: {
    isShow () {
      return this.isShowPopup
    }
  },
  data: () => ({
    planets: [],
    name: 'planets',
    progress: true,
    item: {},
    isShowPopup: false,
    headers: [
      {
        text: 'Name',
        align: 'left',
        sortable: true,
        value: 'field1'
      },
      {text: 'Climate', value: 'field2'},
      {text: 'Diameter', value: 'field3'},
      {text: 'Gravity', value: 'field4'},
      {text: 'Films', value: 'field5'},
      {text: 'Residents', value: 'field6'},
      {text: 'Terrain', value: 'field7'},
      {text: 'Population', value: 'field8'}
    ]
  }),
  created () {
    const name = this.name
    this.$store[name] = []
    this.$swapi.allPlanets().then((result) => {
      let pagesLength = Math.ceil(result.count / result.results.length)
      if (pagesLength > 1) {
        this.$store[name].push(...result.results)
        this.getAllData(2, name, pagesLength, this.$swapi.allPlanets, () => {
          this.formTable(name)
          this.progress = false
        })
      } else {
        this.$store[name].push(...result.results)
        this.formTable(name)
        this.progress = false
      }
    })
  },
  methods: {
    formTable (name) {
      this[name] = this.$store[name].map((item, index) => {
        return {
          value: true,
          field1: item.name,
          field2: item.climate,
          field3: item.diameter,
          field4: item.gravity,
          field5: item.films.length,
          field6: item.residents.length,
          field7: item.terrain,
          field8: item.population,
          index: index
        }
      })
    },
    showPopup (item, name) {
      this.item = this.$store[name][item.index]
      this.isShowPopup = true
    }
  }
}
</script>
