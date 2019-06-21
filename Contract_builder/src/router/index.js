import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import DisplayData from '@/components/DisplayData'
import Draggable from '@/components/Draggable'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "Home"
            }
        },
        {
            path: '/home/',
            name: 'Home',
            props: true,
            component: Home
        },
        {
            path: '/drag/',
            name: 'simple',
            props: true,
            component: Draggable
        },
        {
            path: '/build/',
            name: 'DisplayData',
            props: true,
            component: DisplayData
        }
    ]
})