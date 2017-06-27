import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/Frame'
import Dashboard from '@/views/dashboard/Dashboard'
import DeviceDefinitions from '@/views/device/DeviceDefinitions'
import DeviceManager from '@/views/device/DeviceManager'
import DataDefinitions from '@/views/data/DataDefinitions'
import DataSummary from '@/views/data/DataSummary'
import DataProcessor from '@/views/data/DataProcessor'
import Login from '@/views/Login'

import DeveloperInfo from '@/views/developer/DeveloperInfo'
import DeveloperPassword from '@/views/developer/DeveloperPassword'

import UserManager from '@/views/user/UserManager'

import FeedbackManager from '@/views/feedback/FeedbackManager'

import MessageManager from '@/views/message/MessageManager'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'current-page ',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
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
        path: 'user',
        name: 'UserManager',
        component: UserManager
      },
      {
        path: 'feedback',
        name: 'FeedbackManager',
        component: FeedbackManager
      },
      {
        path: 'message',
        name: 'MessageManager',
        component: MessageManager
      }
      ]
    }
  ]
})
