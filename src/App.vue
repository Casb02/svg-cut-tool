<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Drawboard from './components/Drawboard.vue'
import Imgloader from './components/Imgloader.vue'
</script>

<template>
  <h1>test</h1>
  <div class="container-fluid">
    <div class="container">
      <imgloader/>
    </div>
    <div class="card mt-5">
      <h4 class="card-header">Drawboard</h4>
      <div class="card-body">
        <drawboard/>
      </div>
    </div>
  </div>
</template>

<style>

</style>
