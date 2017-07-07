import storejs from 'store'
import 
import Utils from '@/utils'

export default {
  async signup (email, password) {
    if (!Utils.validatePassword(password)) {
      throw new Error('signup(): password not valid')
      // TODO: error handling
    } else if (!Utils.validateEmail(email)) {
      throw new Error('signup(): email not valid')
      // TODO: error handling
    }

    const data = {
      email, password
    }
    try {
      await http.post('developers/signup', data)
    } catch (e) {
      console.log(e)
      // TODO: error handling
      // 409: 10002 - developer already exist.
    }
  },

  async signin (email, password) {
    if (!Utils.validatePassword(password)) {
      throw new Error('signin(): password not valid')
      // TODO: error handling
    } else if (!Utils.validateEmail(email)) {
      throw new Error('signin(): email not valid')
      // TODO: error handling
    }

    let signinResponse
    const data = {
      email, password
    }
    try {
      signinResponse = await http.post('developers/signin', data)
    } catch (e) {
      console.log(e)
      // TODO: error handling
      // 401: 10003 - email or password not correct.
    }

    storejs.set('session', signinResponse.data)
  },

  current () {
    return storejs.get('session')
  },

  resentVerifyEmail (developerId) {

  }
}
