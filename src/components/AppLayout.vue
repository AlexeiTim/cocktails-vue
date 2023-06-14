<template>
  <div class="root">
    <div
      :style="{
        backgroundImage: `url(${props.imgURL})`,
      }"
      class="img"
    ></div>
    <div class="main">
      <el-button
        @click="goToRandomCocktail"
        class="button"
        >Get random cocktail</el-button
      >
      <el-button
        v-if="isBackButtonVisable"
        @click="backFunc"
        type="primary"
        :icon="Back"
        class="back"
        circle
      />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Back} from "@element-plus/icons-vue";
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ROUTE_PATHS} from "../constants";
const route = useRoute();
const router = useRouter();
const routeName = computed(() => route.name);
const props = defineProps<{
  imgURL: string;
  backFunc: Function;
  isBackButtonVisable: boolean;
}>();

function goToRandomCocktail() {
  router.push(ROUTE_PATHS.COCKTAIL_RANDOM);

  if (routeName.value === ROUTE_PATHS.COCKTAIL_RANDOM) {
    router.go(0);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/main.scss";

.root {
  display: flex;
  min-height: 100vh;
  background-color: $background;
}

.img {
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

.main {
  width: 50%;
  padding: 32px 40px;
}

.button {
  position: absolute;
  color: $text;
  top: 32px;
  right: 40px;
  min-width: 182px;
  background-color: $accent;
  border-radius: 4px;
  border: none;
  font-family: "Raleway", "Aria", sans-serif;
  transition: all 0.3s;
  &:hover,
  &:active {
    background-color: darken($accent, 10%);
    color: darken($text, 10%);
  }
}

.back {
  border-color: $text;
  background-color: transparent;
  &:hover {
    border-color: $accent;
  }
}
</style>
