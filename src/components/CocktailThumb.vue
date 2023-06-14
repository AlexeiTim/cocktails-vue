<template>
  <div class="root">
    <RouterLink :to="`/cocktails/${cocktail.idDrink}`">
      <div class="img-wrapper">
        <div
          :style="{
            backgroundImage: `url(${cocktail.strDrinkThumb})`,
          }"
          class="pic"
        ></div>
      </div>

      <div class="name">{{ cocktail.strDrink }}</div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type {Cocktail} from "../types/cocktail";

interface Props {
  cocktail: Cocktail;
}
const {cocktail} = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "../assets/styles/main.scss";
.root {
  width: calc((100% - 76px) / 3);
  text-align: center;
  cursor: pointer;
}

.img-wrapper {
  display: flex;
  justify-content: center;
}
.pic {
  width: 120px;
  height: 120px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}

.name {
  padding-top: 15px;
  letter-spacing: 0.1em;
}
</style>
