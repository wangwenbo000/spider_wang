import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import TagsChild from '@/components/TagsChild'
import TagsChildItems from '@/components/TagsChildItems'
import Detial from '@/components/Detial'
import ArticleChild from '@/components/ArticleChild'
import ArticleChildItems from '@/components/ArticleChildItems'
import Articlecontent from '@/components/Articlecontent'
import About from '@/components/About'
import Store from '@/components/Store'
import Video from '@/components/Video'
import SearchRes from '@/components/SearchRes'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/searchRes/:key/:type/:page',
      name: 'searchRes',
      component: SearchRes
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/video/:vid',
      name: 'Video',
      component: Video
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/:list',
          name: 'CateList',
          component: TagsChild,
          children: [
            {
              path: 'filter/:title/page/:page',
              name: 'Filter',
              component: TagsChildItems,
              children: [
                {
                  path: 'detial/:id',
                  name: 'Detial',
                  component: Detial
                }
              ]
            }
          ]
        },
        {
          path: 'article/:list',
          name: 'article',
          component: ArticleChild,
          children: [
            {
              path: 'list/:title/page/:page',
              name: 'ArticleChildItems',
              component: ArticleChildItems,
              children: [
                {
                  path: 'detial/:id',
                  name: 'Articlecontent',
                  component: Articlecontent
                }
              ]
            }
          ]
        }
      ]
    }

  ]
})
