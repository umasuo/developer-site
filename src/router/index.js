import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/Frame'
import Dashboard from '@/views/Dashboard'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'current-page ',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Frame,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'manage-devices',
          name: 'ManageDevices',
          component: Dashboard
        },
        {
          path: 'device-types',
          name: 'DeviceTypes',
          component: Dashboard
        },
        {
          path: 'data-types',
          name: 'DataTypes',
          component: Dashboard
        }
      ]
    }
  ]
})
