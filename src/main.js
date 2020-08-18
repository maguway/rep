import Vue from 'vue'
import App from './App.vue'
import storage from "./vuex/storage";
import './assets/styles/styles.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from "./router/router";
// import bootstrap from 'bootstrap'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Vue.use(bootstrap)

new Vue({
    render: h => h(App),
    store: storage,
    router
}).$mount('#app')
