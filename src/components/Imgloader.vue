<script setup>

import {ref} from "vue";
import {useCoords} from "../store/coordsStore.ts";

//De store
const store = useCoords();
//De img
const img = ref(null);
let width = 0;
let height = 0;
const commit = () => {
  store.img.src = img.value;
  store.img.height = height;
  store.img.width = width;
  img.value = null;
}

const onUpload = (e) => {
  //no default plz
  e.preventDefault();

  //get the file from the input
  const file = e.target.files[0];

  //start file reader
  const reader = new FileReader();

  //when the file is loaded
  reader.onload = () => {
    console.log(reader);
    img.value = reader.result;
    //We stelen die img data
    const imgdata = new Image();
    imgdata.src = reader.result;
    //if Image is loaded
    imgdata.onload = () => {
      width = imgdata.width;
      height = imgdata.height;
      console.log(width, height);
    }
  };
  reader.readAsDataURL(file);
}

</script>

<template>
  <div class="card">
    <h4 class="card-header bg-brand-3">
      Uploader
    </h4>
    <div class="card-body">
      <div class="row">
        <div class="col-md-4">
          <input class="btn btn-primary" type="file" @change="onUpload($event)">
          <button class="btn btn-secondary mt-2" @click="commit">Zet foto op de Drawboard</button>
        </div>
        <div class="col-md-8">
          <img v-show="img" :src="img" class="img-fluid preview-img" alt="preview" />
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>
.preview-img {
  min-height: 40px;
}
</style>