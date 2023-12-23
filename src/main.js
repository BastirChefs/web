import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire'
import App from './App.vue'
import router from './router'
import { firebaseApp } from '@/firebase'
import store from './stores/store'

const app = createApp(App)

app.use(store);
app.use(createPinia())
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth, VueFireFirestoreOptionsAPI]
})
app.use(router)

app.mount('#app')
