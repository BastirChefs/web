import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire'
import App from './App.vue'
import router from './router'
import { firebaseApp } from '@/firebase'
import store from './stores/store'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faSignOut)
const app = createApp(App)

app.use(store);
app.use(createPinia())
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth, VueFireFirestoreOptionsAPI]
})
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
