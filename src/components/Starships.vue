<template>
  <div>
  <v-progress-linear slot="progress" color="grey" v-if="progress" indeterminate></v-progress-linear>
  <s-w-table
    @showpopup="showPopup"
    v-if="!progress"
    :headers="headers"
    :dataArr='starships'
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
  name: 'Starships',
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
    starships: [],
    name: 'starships',
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
      {text: 'Model', value: 'field2'},
      {text: 'Passengers', value: 'field3'},
      {text: 'Pilots', value: 'field4'},
      {text: 'Films', value: 'field5'},
      {text: 'Crew', value: 'field6'},
      {text: 'MGLT', value: 'field7'},
      {text: 'Manufacturer', value: 'field8'}
    ]
  }),
  created () {
    const name = this.name
    this.$store[name] = []
    this.$swapi.allStarships().then((result) => {
      let pagesLength = Math.ceil(result.count / result.results.length)
      if (pagesLength > 1) {
        this.$store[name].push(...result.results)
        this.getAllData(2, name, pagesLength, this.$swapi.allStarships, () => {
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
          field2: item.model,
          field3: item.passengers,
          field4: item.pilots.length,
          field5: item.films.length,
          field6: item.crew,
          field7: item.MGLT,
          field8: item.manufacturer,
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
