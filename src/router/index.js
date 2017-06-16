import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/Frame'
import Dashboard from '@/views/dashboard/Dashboard'
import DeviceDefinitions from '@/views/device/DeviceDefinitions'
import DeviceManager from '@/views/device/DeviceManager'
import DataDefinitions from '@/views/data/DataDefinitions'
import DataSummary from '@/views/data/DataSummary'
import DataProcessor from '@/views/data/DataProcessor'

import DeveloperInfo from '@/views/developer/DeveloperInfo'
import DeveloperPassword from '@/views/developer/DeveloperPassword'

import UserManager from '@/views/user/UserManager'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'current-page ',
  routes: [{
    path: '/',
    name: 'Index',
    component: Frame,
    children: [{
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: 'manage-devices',
      name: 'ManageDevices',
      component: DeviceManager
    },
    {
      path: 'device-definitions',
      name: 'DeviceDefinitions',
      component: DeviceDefinitions
    },
    {
      path: 'data-summary',
      name: 'DataSummary',
      component: DataSummary
    },
    {
      path: 'data-definitions',
      name: 'DataDefinitions',
      component: DataDefinitions
    },
    {
      path: 'data-processor',
      name: 'DataProcessor',
      component: DataProcessor
    },
    {
      path: 'developer-info',
      name: 'DeveloperInfo',
      component: DeveloperInfo
    },
    {
      path: 'developer-password',
      name: 'DeveloperPassword',
      component: DeveloperPassword
    },
    {
      path: 'user-manager',
      name: 'UserManager',
      component: UserManager
    }
    ]
  }]
})
