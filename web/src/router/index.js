import Vue from 'vue'
import Router from 'vue-router'

// Pages
import CartPage from '@/pages/CartPage'
import FrontPage from '@/pages/FrontPage'

import ProductDetailPage from '@/pages/ProductDetailPage'
import Example from '@/pages/Example'
import SearchResultPage from '@/pages/SearchResultPage'
import SetNewPassword from '@/components/SetNewPassword'
import NewsPage from '@/components/NewsPage'
import AboutUs from '@/pages/AboutUs'
import ContactUs from '@/pages/ContactUs'
import SecondHand from '@/pages/SecondHand'
import SupportServices from '@/pages/SupportServices'
import CategoriesManagement from '@/pages/CategoriesManagement'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'FrontPage',
      path: '/',
      component: FrontPage
    },
    {
      name: 'CategoriesManagement',
      path: '/categories_management',
      component: CategoriesManagement
    },
    {
      path: '/about',
      component: AboutUs
    },
    {
      path: '/:language/about',
      component: AboutUs
    },
    {
      path: '/secondhand',
      component: SecondHand
    },
    {
      path: '/:language/secondhand',
      component: SecondHand
    },
    {
      path: '/services',
      component: SupportServices
    },
    {
      path: '/:language/services',
      component: SupportServices
    },
    {
      path: '/contact',
      component: ContactUs
    },
    {
      path: '/:language/contact',
      component: ContactUs
    },
    {
      path: '/:language/product/:id',
      component: ProductDetailPage
    },
    {
      path: '/product/:id',
      component: ProductDetailPage
    },
    {
      path: '/ex',
      component: Example
    },
    {
      path: '/:language/cart',
      component: CartPage
    },
    {
      path: '/:language/search',
      component: SearchResultPage
    },
    {
      path: '/search',
      component: SearchResultPage
    },
    {
      path: '/:language/password_reset/:token',
      component: SetNewPassword
    },
    {
      name: 'FrontPage',
      path: '/:language/',
      component: FrontPage
    },
    {
      path: '/news/:id',
      component: NewsPage
    }
  ]
})
