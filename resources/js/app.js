require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import {routes} from './routes';
import StoreData from './store';
import MainApp from "./components/MainApp.vue";

Vue.use(VueRouter);
Vue.use(Vuex);
const store = new Vuex.Store(StoreData);
const router = new VueRouter({
    routes,
    mode:'history'
});


// window.token = localStorage.getItem('token');
//
// router.beforeEach((to, from, next) => {
//         if (!window.token && to.fullPath !== "/login") {
//             next('/login')
//         }else {
//             next();
//         }
// })

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});
