<template>
  <div>
  <v-progress-linear slot="progress" color="grey" v-if="progress" indeterminate></v-progress-linear>
  <s-w-table
    @showpopup="showPopup"
    v-if="!progress"
    :headers="headers"
    :dataArr='people'
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
  name: 'People',
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
    people: [],
    name: 'people',
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
      {text: 'Gender', value: 'field2'},
      {text: 'BirthYear', value: 'field3'},
      {text: 'Height', value: 'field4'},
      {text: 'Films', value: 'field5'},
      {text: 'Species', value: 'field6'},
      {text: 'Vehicles', value: 'field7'},
      {text: 'Starships', value: 'field8'}
    ]
  }),
  created () {
    const name = this.name
    this.$store[name] = []
    this.$swapi.allPeople().then((result) => {
      let pagesLength = Math.ceil(result.count / result.results.length)
      if (pagesLength > 1) {
        this.$store[name].push(...result.results)
        this.getAllData(2, name, pagesLength, this.$swapi.allPeople, () => {
          this.progress = false
          this.formTable(name)
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
          field2: item.gender,
          field3: item.birth_year,
          field4: item.height,
          field5: item.films.length,
          field6: item.species.length,
          field7: item.vehicles.length,
          field8: item.starships.length,
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
