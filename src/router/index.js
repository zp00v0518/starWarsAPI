import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Films from '@/components/Films'
import People from '@/components/People'
import Starships from '@/components/Starships'
import Vehicles from '@/components/Vehicles'
import Species from '@/components/Species'
import Planets from '@/components/Planets'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Films',
      component: Films
    },
    {
      path: '/people',
      name: 'People',
      component: People
    },
    {
      path: '/starships',
      name: 'Starships',
      component: Starships
    },
    {
      path: '/vehicles',
      name: 'Vehicles',
      component: Vehicles
    },
    {
      path: '/species',
      name: 'Species',
      component: Species
    },
    {
      path: '/planets',
      name: 'Planets',
      component: Planets
    }
  ]
})
