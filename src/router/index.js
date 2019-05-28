import Vue from 'vue'
import Router from 'vue-router'
import Meal from '@/components/Meal'
import Meal_analyse from '@/components/Meal_analyse'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "Meal"
            }
        },
        {
            path: '/meal/',
            name: 'Meal',
            props: true,
            component: Meal
        },
        {
            path: '/meal_analyse/',
            name: 'Meal_analyse',
            props: true,
            component: Meal_analyse
        }
    ]
})