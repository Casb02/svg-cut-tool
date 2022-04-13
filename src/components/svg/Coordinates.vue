<script setup>
import {CoordList} from "../../interfaces/CoordList.ts";
import {defineProps} from "vue";
const props = defineProps({
  coordinates: {
    type: CoordList,
    default: () => [],
  },
})
</script>

<template>
  <svg class="w-100 h-100">
    <g>
      <path :d="coordinates" class="svg-fill"></path>
    </g>
  </svg>
</template>

<style scoped>

</style>