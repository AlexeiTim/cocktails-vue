import { defineStore } from 'pinia'
import axios from 'axios';
import type { Ingredient } from './../types/ingredient';
import { INGREDIENTS_URL, COCKTAILS_BY_INGREDIENTS_URL, COCKTAIL_BY_ID_URL } from '../constants';
import type { Cocktail } from '../types/cocktail';

export const useRootStore = defineStore('root', {
  state: () => ({
    ingredients: [] as Ingredient[],
    ingredient: null as string | null,
    cocktails: [] as Cocktail[],
  }),
  actions: {
    async getIngredients() {
      const data = await axios.get(INGREDIENTS_URL)
      this.ingredients = data?.data?.drinks
    },
    async getCocktails(ingredient: string | null) {
      const data = await axios.get(`${COCKTAILS_BY_INGREDIENTS_URL}${ingredient}`)
      this.cocktails = data?.data?.drinks
    },
    setIngredient(value: string | null) {
      this.ingredient = value
    }
  }
})
