import '@/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/layouts/App.vue'
import router from '@/router'
import lvprogressbar from 'lightvue/progress-bar';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('LvProgressBar', lvprogressbar)

app.mount('#app')
