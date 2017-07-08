import axios from 'axios'
import storejs from 'store'

export const http = axios.create({
  baseURL: 'http://192.168.1.46:8804/v1/',
  timeout: 1000
})

// add a interceptor to handle Network Error globally

export default {
  // session consist of token and current logged user
  _session: storejs.get('session'),
  setSession (session) {
    this._session = session
    storejs.set('session', session)
  },
  get session () {
    return this._session
  }
}
