import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu-config'

Vue.use(Router)

let routes = [{
  path: '/home',
  name: 'Home',
  component: () => import('@/components/Home')
}, {
  path: '/fold',
  name: 'Fold',
  component: () => import('@/components/Bill'),
  children: []
}];

menus.forEach((item) => {
  item.sub.forEach((sub) => {
    routes[1].children.push({
      path: `${sub.componentName}`,
      name: sub.componentName,
      component: () => import('@/components/Billing')
    })
  })

})

export default new Router({ routes })
