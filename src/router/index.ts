import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Cocktail from '../pages/Cocktail.vue'
import CocktailRandomVue from '../pages/CocktailRandom.vue'
import { ROUTE_PATHS } from '../constants'


const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: ROUTE_PATHS.HOME,
    name: ROUTE_PATHS.HOME,
    component: Home
  },
  {
    path: ROUTE_PATHS.COCKTAIL,
    name: ROUTE_PATHS.COCKTAIL,
    component: Cocktail
  },
  {
    path: ROUTE_PATHS.COCKTAIL_RANDOM,
    name: ROUTE_PATHS.COCKTAIL_RANDOM,
    component: CocktailRandomVue
  }
  ]
})

export default router
