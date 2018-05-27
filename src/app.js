import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'

import 'bootstrap/dist/js/bootstrap.bundle.js'
import "./assets/scss/index.scss"
import "./assets/css/hljs/googlecode.css"
import "toastr/build/toastr.css"
import "nprogress/nprogress.css"

sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

router.beforeEach((router, redirect, next) => {
    store.dispatch('global/gProgress', 0)
    next()
})

const app = new Vue({
    router,
    store,
    render: h => h(App)
})

app.$mount('#app')