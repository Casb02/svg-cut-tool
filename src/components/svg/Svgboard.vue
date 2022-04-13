<script setup lang="ts">

import {useCoords} from "../../store/coordsStore";
import {computed, ComputedRef} from "vue";

//Use the coordsStore to get the coords of the current drawing and img
const store = useCoords();

// Get the background image
const bgImg = computed(() => {
  return store.img.src;
});

const bgWidth = computed(() => {
  //if wider than screen, scale to fit
  if (store.img.width > window.innerWidth) {
    return window.innerWidth - 100;
  }else return store.img.width;
});

const bgHeight = computed(() => {
  // scale to fit based on width
  return store.img.height;
});

//Get all drawing coords
const allCoords: ComputedRef<string[]> = computed(() => {
  return store.getCoords;
});

</script>

<template>
  <svg :width="bgWidth" :height="bgHeight">
<!--    Load the img from pinia-->
    <g>
      <image :xlink:href="bgImg" :width="bgWidth" :height="bgHeight" class="img-fluid position-absolute"/>
    </g>
<!--    Load all coords that are drawen-->
    <g v-for="(path, index) in allCoords">
      <path :d="path" class="done" stroke="black" />
    </g>
<!--    current drawing-->
    <g>
      <slot></slot>
    </g>
  </svg>
</template>

<style scoped lang="scss">
.done {
  fill: rgba(0, 0, 0, 0.65);
  stroke: #559209;
  stroke-width: 3px;
  &:hover {
    fill: rgba(0, 0, 0, 0.65);
    stroke: #559209;
    stroke-width: 5px;
  }
}
</style>