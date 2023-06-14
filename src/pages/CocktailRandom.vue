<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import type {SingleCocktail} from "@/types/cocktail";
import AppLayout from "@/components/AppLayout.vue";
import {useRootStore} from "../stores/root";
import {COCKTAIL_RANDOM, INGREDIENT_PIC} from "@/constants/api";
import axios from "axios";
import type {Cocktail} from "../types/cocktail";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";

const route = useRoute();
const router = useRouter();
const cocktail = ref<SingleCocktail | null>(null);

async function getCocktail() {
  const data = await axios.get(`${COCKTAIL_RANDOM}`);
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
    const ingredient = cocktail.value[`strIngredient${i}`];
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
          <div class="slider">
            <swiper
              :slides-per-view="3"
              :space-between="50"
              class="swiper"
            >
              <swiper-slide
                v-for="ingredient in ingredients"
                :key="ingredient"
              >
                <img
                  :src="`${INGREDIENT_PIC}${ingredient}-Small.png`"
                  alt="ingredient"
                />
                <div class="name">
                  {{ ingredient }}
                </div>
              </swiper-slide>
            </swiper>
          </div>

          <div class="instruction">{{ cocktail.strInstructions }}</div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/main.scss";
.slider {
  margin: 50px auto;
}

.swiper {
  width: 576px;
  cursor: grab;

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

.name {
  
}
</style>
