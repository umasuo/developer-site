import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/Frame'

import Login from '@/views/Login'
import Dashboard from '@/views/dashboard/Dashboard'

import DeveloperInfo from '@/views/developer/DeveloperInfo'
import DeveloperPassword from '@/views/developer/DeveloperPassword'

import ReportDevice from '@/views/report/ReportDevice'
import ReportUser from '@/views/report/ReportUser'

import DeviceDefinitions from '@/views/device/DeviceDefinitions'
import DeviceManager from '@/views/device/DeviceManager'

import DataDefinitions from '@/views/data/DataDefinitions'
import DataSummary from '@/views/data/DataSummary'
import DataProcessor from '@/views/data/DataProcessor'

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
      component: Frame,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'report-device',
          name: 'ReportDevice',
          component: ReportDevice
        },
        {
          path: 'report-user',
          name: 'ReportUser',
          component: ReportUser
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
        },
        {
          path: 'feedback-manager',
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
