import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { createRouter, createWebHistory } from 'vue-router';
import NotFound from './pages/notFound.vue';

const router = createRouter({
    routes: [
        {path: '/', component: App,},
        {path: '/notFound', component: NotFound}
    ],
    history: createWebHistory()
});

createApp(App)
    .use(router)
    .component('QuillEditor', QuillEditor)
    .mount('#app')
