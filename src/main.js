import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'vuetify/dist/vuetify.css';


const app = createApp(App);
const vuetify = createVuetify()
app.use(router);
app.use(vuetify);


app.mount('#app');
