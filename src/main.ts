import '@/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/layouts/App.vue'
import router from '@/router'
import LvProgressBar from './node_modules/lightvue/progress-bar';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('LvProgressBar', LvProgressBar)

app.mount('#app')
