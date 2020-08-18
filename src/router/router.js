import Vue from 'vue';
import Router from 'vue-router';

import vHotelList from '../components/hotels/v-hotel-list'
import vOrder from '../components/order/v-order'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'hotels',
            component: vHotelList
        },
        {
            path: '/order',
            name: 'order',
            component: vOrder,
            props: true
        }
    ],
})

export default router;

