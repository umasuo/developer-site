import axios from 'axios'
import storejs from 'store'

export const http = axios.create({
  baseURL: 'http://192.168.1.22:8804/v1/',
  timeout: 1000
})

/*
 TODO: add a response interceptor to unify different kind of errors
       also extract data from success response
 */

// TODO: resume session from localstorage when eval

export default {
  // session consist of token and current logged user
  _session: undefined,
  setSession (session) {
    this._session = session
    storejs.set('session', session)
  },
  get session () {
    return this._session
  }
}
