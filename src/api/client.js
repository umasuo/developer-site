import axios from 'axios'
import storejs from 'store'

export const http = axios.create({
  baseURL: 'http://192.168.1.46:8804/v1/',
  timeout: 5000
})

// TODO: add a interceptor to handle Network Error globally

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
