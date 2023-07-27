import '@/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/layouts/App.vue'
import router from '@/router'
import lv-progressbar from 'lightvue/progressbar';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('lv-progressbar', lv-progressbar)

app.mount('#app')
