import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index/index'
import user from 'components/user/user'
import store from 'components/store/store'
import refuel from 'components/refuel/refuel'
import sign_in from 'components/sign_in/sign_in'
import sign_up from 'components/sign_up/sign_up'
import recharge from 'components/recharge/recharge'
import queryVIP from 'components/queryVIP/queryVIP'
import msg from 'components/msg/msg'
import coupon from 'components/coupon/coupon'
import recharge_record from 'components/recharge_record/recharge_record'
import change_station from 'components/change_station/change_station'
import pay from 'components/pay/pay'
import transactVIP from 'components/transactVIP/transactVIP'
import help from 'components/help/help'
import service from 'components/service/service'
import recharge_progress  from 'components/recharge_progress/recharge_progress'
import retrieve from 'components/retrievePassword/retrievePassword'
import search from 'components/search/search'
import selection from 'components/selection/selection'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: []
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/refuel',
      name: 'refuel',
      component: refuel
    },
    {
      path: '/store',
      name: 'store',
      component: store
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: sign_in
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: sign_up
    },
    {
      path: '/index/recharge',
      name: 'recharge',
      component: recharge,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/index/queryVIP',
      name: 'queryVIP',
      component: queryVIP,
    },
    {
      path: '/index/msg',
      name: 'msg',
      component: msg,
    },
    {
      path: '/index/coupon',
      name: 'coupon',
      component: coupon,
    },
    {
      path: '/index/recharge_record',
      name: 'recharge_record',
      component: recharge_record,
    },
    {
      path: '/refuel/change_station',
      name: 'change_station',
      component: change_station,
    },
    {
      path: '/refuel/pay',
      name: 'pay',
      component: pay,
    },
    {
      path: '/index/recharge_progress',
      name: 'recharge_progress',
      component: recharge_progress,
    },
    {
      path: '/index/transactVIP',
      name: 'transactVIP',
      component: transactVIP,
    },
    {
      path: '/index/help',
      name: 'help',
      component: help,
    },
    {
      path: '/index/service',
      name: 'service',
      component: service,
    },
    {
      path: '/retrievePassword',
      name: 'retrieve',
      component: retrieve,
    },{
      path: '/store/search',
      name: 'search',
      component: search,
    },{
      path: '/store/selection',
      name: 'selection',
      component: selection,
    }
  ]
})
