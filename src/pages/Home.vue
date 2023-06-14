<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import AppLayout from "@/components/AppLayout.vue";
import CocktailThumb from "@/components/CocktailThumb.vue";
import {useRootStore} from "@/stores/root";
import {storeToRefs} from "pinia";

const rootStore = useRootStore();
rootStore.getIngredients();
const {ingredients, ingredient, cocktails} = storeToRefs(rootStore);

const getCocktails = () => {
  rootStore.getCocktails(rootStore.ingredient);
};

function resetIngredient() {
  rootStore.ingredient = null;
}
</script>

<template>
  <AppLayout
    :backFunc="resetIngredient"
    imgURL="/src/assets/img/cocktailBG.jpg"
    :isBackButtonVisable="!!ingredient"
  >
    <div class="wrapper">
      <div
        v-if="!rootStore.ingredient || !cocktails"
        class="info"
      >
        <div class="title">Choose your drink</div>
        <div class="line"></div>
        <div class="select-wrapper">
          <el-select
            v-model="rootStore.ingredient"
            class="select"
            placeholder="Select"
            filterable
            allow-create
            size="large"
            @change="getCocktails"
          >
            <el-option
              v-for="item in ingredients"
              :key="item.strIngredient1"
              :label="item.strIngredient1"
              :value="item.strIngredient1"
            />
          </el-select>
        </div>
        <div class="text">
          Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by
          ingredient through our cocktail generator.
        </div>
        <img
          src="/src/assets/img/cocktails.png"
          alt="Cocktails"
          class="img"
        />
      </div>
      <div
        v-else
        class="info"
      >
        <div class="title">COCKTAILS WITH {{ ingredient }}</div>
        <div class="line"></div>
        <el-scrollbar
          class="scroll"
          height="400px"
        >
          <div class="cocktails">
            <CocktailThumb
              v-for="cocktail in cocktails"
              :key="cocktail.idDrink"
              :cocktail="cocktail"
            />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </AppLayout>
</template>

<style lang="scss" scoped>
@import "../assets/styles/main.scss";

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll {
  margin-top: 36px;
}

.info {
  padding: 80px 40px;
  text-align: center;
}

.select-wrapper {
  padding-top: 50px;
  text-align: center;
}

.text {
  margin: 0 auto;
  padding-top: 50px;
  line-height: 36px;
  letter-spacing: 0.1em;
  color: $text-muted;
  text-align: center;
  max-width: 516px;
}

.img {
  margin-top: 60px;
}

.cocktails {
  display: flex;
  flex-wrap: wrap;
  gap: 41px 38px;
  margin: 0 auto;
}
</style>

<style lang="scss">
@import "../assets/styles/main.scss";

.select {
  .el-input__wrapper {
    color: pink;
    background-color: $background;
  }
  .el-input__inner {
    color: $text;
  }
}
</style>
