import Vue from 'vue'
import Router from 'vue-router'

import Frame from '@/Frame'
import SinglePage from '@/SinglePage'

import Signin from '@/views/Signin'
import EmailVerifyResult from '@/views/EmailVerifyResult'
import ResetPwd from '@/views/ResetPwd'
import Dashboard from '@/views/Dashboard'

// import DeveloperInfo from '@/views/DeveloperInfo'
import DeveloperPassword from '@/views/DeveloperPassword'

import ProductDefinitions from '@/views/ProductDefinitions'
import ProductDetail from '@/views/ProductDetail'
import DeviceManager from '@/views/DeviceManager'

// import DataDefinitions from '@/views/DataDefinitions'
// import DataSummary from '@/views/DataSummary'
// import DataProcessor from '@/views/DataProcessor'

import UserManager from '@/views/UserManager'
import FeedbackManager from '@/views/FeedbackManager'
import MessageManager from '@/views/MessageManager'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'current-page',
  routes: [
    {
      path: '/',
      component: SinglePage,
      redirect: '/signin',
      children: [
        {
          path: 'signin',
          name: 'Signin',
          component: Signin
        },
        {
          path: 'email-varify',
          name: 'EmailVarifyResult',
          component: EmailVerifyResult
        },
        {
          path: 'reset-pwd',
          name: 'ResetPwd',
          component: ResetPwd
        }
      ]
    },
    {
      path: '/',
      component: Frame,
      redirect: '/dashboard', // TODO: redirect to dashboard or login, according to login state.
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'manage-devices',
          name: 'ManageDevices',
          component: DeviceManager
        },
        {
          path: 'product-definitions',
          name: 'ProductDefinitions',
          component: ProductDefinitions
        },
        {
          path: 'product-definitions/:pid',
          name: 'ProductDetail',
          component: ProductDetail,
          props: true // decouple component from route
        },
        // {
        //   path: 'data-summary',
        //   name: 'DataSummary',
        //   component: DataSummary
        // },
        // TODO: uncomment when ready
        // {
        //   path: 'data-definitions',
        //   name: 'DataDefinitions',
        //   component: DataDefinitions
        // },
        // {
        //   path: 'data-processor',
        //   name: 'DataProcessor',
        //   component: DataProcessor
        // },
        // {
        //   path: 'developer-info',
        //   name: 'DeveloperInfo',
        //   component: DeveloperInfo
        // },
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
