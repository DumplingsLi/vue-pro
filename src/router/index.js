import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Find from '@/components/Find'
import Order from '@/components/order/Order'
import User from '@/components/User'
import Login from '@/components/Login'
import Goods from '@/components/goods/Goods'
import Orderpage from '@/components/goods/Orderpage'
import Ratings from '@/components/goods/ratings/Ratings'
import Seller from '@/components/goods/seller/Seller'
import Fooddetail from '@/components/goods/Fooddetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/find',
      component: Find
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/goods/:id',
      component: Goods,
      linkActiveClass: 'active',
      children: [{
        path: '',
        redirect: 'orderpage'
      }, {
        path: 'orderpage',
        component: Orderpage
      }, {
        path: 'ratings',
        component: Ratings
      }, {
        path: 'seller',
        component: Seller
      }, {
        path: 'detail/:did',
        name: 'detail',
        component: Fooddetail
      }]
    }
  ],
  linkActiveClass: 'active'
})
