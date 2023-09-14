import { createApp,defineComponent} from 'vue'
import { createPinia } from 'pinia'
// import { useMessage, SelectOption } from 'naive-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import './assets/main.css'
import 'vfonts/Lato.css'

// const message = useMessage()
const app = createApp(App)

app.use(createPinia())
app.use(naive)
app.use(router).mount('#app')
app.use(VueAxios, axios)
