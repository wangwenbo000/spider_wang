import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import AdminPanel from '@/components/AdminPanel'
import Spider from '@/components/spider/Index'
import List from '@/components/spider/List'
import Form from '@/components/spider/Form'
import Article from '@/components/article/Index'
import AList from '@/components/article/List'
import AForm from '@/components/article/Form'
import About from '@/components/about/About'
import Scale from '@/components/scale/Scale'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminPanel,
      children: [
        {
          path: '/about',
          name: 'About',
          component: About
        },
        {
          path: '/scale',
          name: 'Scale',
          component: Scale
        },
        {
          path: '/spider',
          name: 'Spider',
          component: Spider,
          children: [
            {
              path: '/list/:name/:id/page/:page',
              name: 'List',
              component: List
            },
            {
              path: '/form',
              name: 'Form',
              component: Form
            }
          ]
        },
        {
          path: '/article',
          name: 'Article',
          component: Article,
          children: [
            {
              path: '/AList/:name/:id/page/:page',
              name: 'AList',
              component: AList
            },
            {
              path: '/Aform',
              name: 'AForm',
              component: AForm
            }
          ]
        }
      ]
    }
  ]
})
