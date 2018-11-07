<template>
  <div>
  <v-progress-linear slot="progress" color="grey" v-if="progress" indeterminate></v-progress-linear>
  <s-w-table
    @showpopup="showPopup"
    v-if="!progress"
    :headers="headers"
    :dataArr='species'
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
  name: 'Species',
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
    species: [],
    name: 'species',
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
      {text: 'Language', value: 'field2'},
      {text: 'Designation', value: 'field3'},
      {text: 'Classification', value: 'field4'},
      {text: 'Films', value: 'field5'},
      {text: 'People', value: 'field6'},
      {text: 'LifeSpan', value: 'field7'},
      {text: 'Height', value: 'field8'}
    ]
  }),
  created () {
    const name = this.name
    this.$store[name] = []
    this.$swapi.allSpecies().then((result) => {
      let pagesLength = Math.ceil(result.count / result.results.length)
      if (pagesLength > 1) {
        this.$store[name].push(...result.results)
        this.getAllData(2, name, pagesLength, this.$swapi.allSpecies, () => {
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
          field2: item.language,
          field3: item.designation,
          field4: item.classification,
          field5: item.films.length,
          field6: item.people.length,
          field7: item.average_lifespan,
          field8: item.average_height,
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
