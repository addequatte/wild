import Vue from 'vue'
import VueRouter from "vue-router";

import acceptance from './pages/acceptance.vue'
import distribution from './pages/distribution.vue'
import discrepancy from './pages/discrepancy.vue'
import refund from './pages/refund.vue'
import home from './pages/home.vue'


Vue.use(VueRouter)

const routes =  [
    {
        path: '/',
        name: 'home',
        component: home,
        props: true
    },
    {
        path: '/acceptance',
        name: 'acceptance',
        component: acceptance
    },
    {
        path: '/distribution',
        name: 'distribution',
        component: distribution,
        props: true
    },
    {
        path: '/discrepancy',
        name: 'discrepancy',
        component: discrepancy,
        props: true
    },
    {
        path: '/refund',
        name: 'refund',
        component: refund,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router;