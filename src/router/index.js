import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/Frame'
import Dashboard from '@/views/Dashboard'
import DeviceDefinitions from '@/views/DeviceDefinitions'
import DataDefinitions from '@/views/DataDefinitions'

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
          path: 'device-definitions',
          name: 'DeviceDefinitions',
          component: DeviceDefinitions
        },
        {
          path: 'data-definitions',
          name: 'DataDefinitions',
          component: DataDefinitions
        }
      ]
    }
  ]
})
