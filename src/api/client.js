import axios from 'axios'
import storejs from 'store'
import router from 'src/router'
import api from 'src/api'

export const http = axios.create({
  baseURL: 'http://api.evacloud.cn/v1/',
  timeout: 5000
})

// TODO: add a interceptor to handle Network Error globally
http.interceptors.response.use(null, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // Unauthorized, redirect to login page
        api.developer.signout()
        router.replace({name: 'Signin'})
        break
    }
  }
})

const client = {
  // session consist of token and current logged user
  _session: undefined,

  setSession (session) {
    if (!session || !session.token || !session.developerView) {
      this._session = undefined
      storejs.remove('session')
      http.defaults.headers.common['Authorization'] = undefined
      http.defaults.headers.common['developerId'] = undefined
    } else {
      this._session = session
      storejs.set('session', session)
      http.defaults.headers.common['Authorization'] = 'Bearer ' + session.token
      http.defaults.headers.common['developerId'] = session.developerView.id
    }
  },

  setDeveloper (developerView) {
    this._session.developerView = developerView
    storejs.set('session', this._session)
  },

  get session () {
    return this._session
  },

  get isAuthorized () {
    return this._session && this._session.token && this._session.developerView
  }
}

// resume session from localstorage
client.setSession(storejs.get('session'))

export default client
