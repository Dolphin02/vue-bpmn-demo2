import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HealthCare from '@/components/HealthCare'
import HealthCare2 from '../components/addListener'
import nodeColor from '../components/nodecolor'
import HeaderDiv from '@/components/header'
import FooterDiv from '@/components/footer'
import WorkFlow from '@/components/workflow'
import MySideBar from '@/components/MySideBar'
import PanelConfig from '@/components/panelConfig'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/mySideBar',
      name: 'mySideBar',
      component: MySideBar
    },
    {
      path: '/',
      name: 'WorkFlow',
      component: WorkFlow
    },
    {
      path: '/config',
      name: 'panelConfig',
      component: PanelConfig
    },
    {
      path: '/insurance',
      name: 'Insurance',
      component: nodeColor
    },
    {
      path: '/click',
      name: 'click',
      component: HealthCare2
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
    {
      path: '/header',
      name: 'headerDiv',
      component: HeaderDiv
    },
    {
      path: '/footer',
      name: 'footerDiv',
      component: FooterDiv
    }
  ]
})
