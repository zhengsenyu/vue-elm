import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/tab/Goods.vue'
import Ratings from '../components/tab/Ratings.vue'
import Seller from '../components/tab/Seller.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
})
