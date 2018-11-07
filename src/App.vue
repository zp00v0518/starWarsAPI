<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>fa-film</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Films</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="people">
          <v-list-tile-action>
            <v-icon>fa-users</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>People</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="starships">
          <v-list-tile-action>
            <v-icon>fa-space-shuttle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Starships</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="vehicles">
          <v-list-tile-action>
            <v-icon>fa-bus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Vehicles</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="species">
          <v-list-tile-action>
            <v-icon>fa-user-circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Species</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="planets">
          <v-list-tile-action>
            <v-icon>fa-globe-americas</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Planets</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Star Wars</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view
        :getAllData="getAllData"
        />
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null
  }),
  methods: {
    getAllData (count, name, length, func, callback) {
      if (count === length + 1) {
        callback()
      } else {
        func(count).then((result) => {
          this.$store[name].push(...result.results)
          count++
          this.getAllData(count, name, length, func, callback)
        })
      }
    }
  }
}
</script>

<style>
 .v-content {
    background-image: url('assets/starts.png');
    background-size: cover;
  }
</style>
