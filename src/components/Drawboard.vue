<script setup lang="ts">
import {computed, ComputedRef, ref, Ref, unref} from "vue";
import {CoordList} from "../interfaces/CoordList";
import {toPath} from "../functions/svg";
import { useRefHistory } from '@vueuse/core'
import {useCoords} from "../store/coordsStore";
import Svgboard from "./svg/Svgboard.vue";

//use the store to get the post completed drawings
const store = useCoords();

const bgWidth = computed(() => {
  return store.img.width + "px";
});

const debugMode: Ref<boolean> = ref(false);

//an boolean to check if the user is drawing and if the user is done drawing
const drawDone: Ref<boolean> = ref(false);

//a list of coordinates that the user has drawn
const coords: Ref<CoordList[]> = ref([]);

//the current coordinates of the user
const mouse: Ref<CoordList> = ref({x: 0, y: 0});





//-------------------------------------
//History section
//-------------------------------------


//create an history of the coordinates
const { history, undo, redo, clear, commit} = useRefHistory(coords, {
  deep: true,
});

//on undo, remove the last item from the list and set drawDone to false
const doUndo = () => {
  drawDone.value = false;
  undo();
}





//-------------------------------------
//Draw section
//-------------------------------------
//if the user is drawing, add the current coordinates to the list
const onClick = (e: MouseEvent) => {
  if (!drawDone.value) {
    const x = e.offsetX;
    const y = e.offsetY;
    const coord: CoordList = {x, y};
    coords.value.push(coord);
  }
};

//follow the mouse and draw en example of the path
const onMouseMove = (e: MouseEvent) => {
  if (!drawDone.value) {
    const x = e.offsetX;
    const y = e.offsetY;
    const coord: CoordList = {x, y};
    // edit last coord
    mouse.value = coord;
  }
};

//calculate the path of the coordinates currently in the list and add mouse coordinates
const path = computed(() => {
  //copy coords to prevent mutation (anders is je history shit)
  const render: CoordList[] = [...coords.value];
  // add current mouse coord (next coord preview)
  render[coords.value.length] = mouse.value;
  return toPath(render);
});





//-------------------------------------
//Complete and submit section
//-------------------------------------

//if the user clicks on the first point, set drawDone to true.
//this function only stops the user from drawing not detecting the first point
const complete = () => {
  drawDone.value = true;
};

//Submit details
const objId: Ref = ref('');

//if the user is done drawing, add the current coordinates to the list and set drawDone to false so the user can draw again
const submit = () => {
  const exportValue = unref(coords);
  store.addCoords(objId.value, exportValue);
  drawDone.value = false;
  coords.value = [];
  commit();
  mouse.value = {x: 0, y: 0};
  objId.value = '';
  clear();
}

</script>

<template>
  <div class="submit-field" v-show="drawDone">
    <input type="text" v-model="objId"/>
    <button class="btn btn-success" :disabled="objId.toString().length <= 0" @click="submit">Add object</button>
  </div>

  <div class="d-flex justify-content-center w-100">
    <div class="drawboard h-auto">
      <svgboard @click="onClick($event)" @mousemove="onMouseMove($event)">
        <path :d="path" fill="transparent" stroke="black"></path>
        <g v-for="(coord, index) in coords">
          <!--make first fill red-->
          <circle v-if="index === 0" r="6" fill="red"  :cx="coord.x" :cy="coord.y"  @click="complete"></circle>
          <circle v-if="index === 0" r="15" fill="transparent"  :cx="coord.x" :cy="coord.y"  @click="complete"></circle>
          <circle v-else :r="2" fill="black" :cx="coord.x" :cy="coord.y"></circle>
        </g>
      </svgboard>
    </div>
  </div>

  <div class="toolbar">

      <div class="d-flex w-100 justify-content-around p-3 bg-white">
        <div class="d-inline-block">
          <button class="btn btn-primary mx-2" @click="doUndo">Undo</button>
          <button class="btn btn-primary mx-2" @click="doRedo">Redo</button>
        </div>
        <div class="d-inline-block">
          <button class="btn btn-primary mx-2" @click="debugMode = !debugMode">Show Log</button>
        </div>
      </div>
    <div class="row" v-show="debugMode">
      <div class="col-md-3">
        <ul>
          <h4>Coord lijst (index: x/y)</h4>
          <li v-for="(coord, index) in coords">
            {{index}}: {{coord.x}} / {{coord.y}}
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul>
          <h4>History</h4>
          <li v-for="(coord, index) in history">
            {{coord}}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <h4>Path</h4>
        <pre>
          {{path}} Z
        </pre>
        <h4>Coordlist formated</h4>
        <pre>
            {{coords}}
        </pre>

      </div>
    </div>

  </div>

</template>

<style lang="scss" scoped>
.drawboard {
  background: #f6f6f6;
  width: v-bind(bgWidth)
}
</style>