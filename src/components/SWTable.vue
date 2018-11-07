<template>
  <v-card >
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field  v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="dataArr"
      :search="search"
      class="elevation-14"
      >
      <template slot="items" slot-scope="props" @click='qw'>
        <tr @click='showPopup(props.item)' class="cursor">
          <td >{{ props.item.field1 }}</td>
          <td >{{ props.item.field2 }}</td>
          <td >{{ props.item.field3 }}</td>
          <td >{{ props.item.field4 }}</td>
          <td >{{ props.item.field5 }}</td>
          <td >{{ props.item.field6 }}</td>
          <td >{{ props.item.field7 }}</td>
          <td >{{ props.item.field8 }}</td>
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array
    },
    dataArr: {
      type: Array
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      progress: false,
      search: ''
    }
  },
  methods: {
    showPopup (item) {
      this.$emit('showpopup', item, this.name)
    }
  }
}

</script>

<style>
  .v-card .theme--dark, .v-card__title, .v-datatable__actions {
    background-color: #303030 !important;
  }
  .cursor {
    cursor: pointer;
  }
</style>
