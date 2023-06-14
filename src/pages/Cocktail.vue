<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import type {SingleCocktail} from "@/types/cocktail";
import AppLayout from "@/components/AppLayout.vue";
import {useRootStore} from "../stores/root";
import {COCKTAIL_BY_ID_URL} from "@/constants/api";
import axios from "axios";
import type {Cocktail} from "../types/cocktail";
const route = useRoute();
const router = useRouter();
const cocktail = ref<SingleCocktail | null>(null);
const cocktailID = computed(() => {
  return route.path.split("/").pop();
});

async function getCocktail() {
  const data = await axios.get(`${COCKTAIL_BY_ID_URL}${cocktailID.value}`);
  cocktail.value = data.data.drinks[0];
}
function goBack() {
  router.go(-1);
}

const ingredients = computed(() => {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) {
      break;
    }
    const resetIngredient = {};
    ingredient.name = cocktail.value[`strIngredient${i}`];
    ingredient.measure = cocktail.value[`strMeasure${i}`];
    ingredients.push(ingredient);
  }
  return ingredients;
});
getCocktail();
</script>

<template>
  <div
    v-if="cocktail"
    class="wrap"
  >
    <AppLayout
      :backFunc="goBack"
      :imgURL="cocktail.strDrinkThumb"
      :isBackButtonVisable="true"
    >
      <div class="wrapper">
        <div class="info">
          <div class="title">{{ cocktail.strDrink }}</div>
          <div class="line"></div>
          <div class="list">
            <div
              v-for="(item, key) in ingredients"
              :key="key"
              class="list-item"
            >
              {{ item.name }}
              <template v-if="item.measure"> | {{ item.measure }} </template>
            </div>
          </div>
          <div class="instruction">{{ cocktail.strInstructions }}</div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/main.scss";

.list {
  width: 560px;
  padding: 50px 0 80px;
  text-align: start;

  &-item {
    position: relative;
    margin-bottom: 20px;
    padding-left: 40px;
    &:last-child {
      margin-bottom: 0;
    }
    &::before {
      content: "";
      width: 18px;
      height: 18px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background: url("/src/assets/img/heart.png") no-repeat 50%;
    }
  }
}

.instruction {
  width: 516px;
  margin-top: 80px;
  text-align: center;
  color: $text-muted;
  margin: 0 auto;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.1em;
}
</style>
