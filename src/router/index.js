import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HealthCare from '@/components/HealthCare3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/health',
      component: HealthCare,
      name: 'HealthCare',
      // iconCls: 'fa fa-id-card-o',
      // children: [
      //   { path: '/page4', component: Page4, name: '页面4' },
      //   { path: '/page5', component: Page5, name: '页面5' }
      // ]
    },
  ]
})
