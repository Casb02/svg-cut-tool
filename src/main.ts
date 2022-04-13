import { createApp } from 'vue'
import App from './App.vue'
//Hier importen we SCSS cool
import './assets/scss/screen.scss'
import {createPinia} from "pinia";

const app = createApp(App);
app.use(createPinia())
app.mount('#app')
