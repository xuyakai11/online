import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import studentInfo from '@/components/studentInfo/studentInfo'
import createOrder from '@/components/createOrder/createOrder'
import payResult from '@/components/payResult/payResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: '购课'
      }
    },
    {
      path: '/studentInfo',
      name: 'studentInfo',
      component: studentInfo,
      meta: {
        title: '补充学员信息'
      }
    },
    {
      path: '/createOrder',
      name: 'createOrder',
      component: createOrder,
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/payResult',
      name: 'payResult',
      component: payResult,
      meta:{
        title:'订单状态'
      }
    }
  ]
})
