import client, { http } from '@/api/client'
import utils from '@/utils'

function validateCertificate (email, password) {
  if (!utils.validatePassword(password)) {
    throw new Error('password not valid')
  } else if (!utils.validateEmail(email)) {
    throw new Error('email not valid')
  }
}

export default {
  async signup (email, password) {
    validateCertificate(email, password)

    const data = {
      email, password
    }
    await http.post('developers/signup', data)
    // 409: 10002 - developer already exist.
  },

  async signin (email, password) {
    validateCertificate(email, password)

    let signinResponse
    const data = {
      email, password
    }
    signinResponse = await http.post('developers/signin', data)
    // 401: 10003 - email or password not correct.
    // 404: 10001 - developer not exist.

    client.setSession(signinResponse.data)
  },

  resentVerifyEmail (developerId) {

  },

  async requestResetEmail (email) {
    if (!utils.validateEmail(email)) {
      throw new Error('email not valid')
    }

    const queryParams = new URLSearchParams()
    queryParams.append('email', email)

    await http.post('developers/reset-password', queryParams)
  },

  async resetEmail (data) {
    if (!utils.validatePassword(data.newPassword)) {
      throw new Error('password not valid')
    }

    await http.put('developers/reset-password', data)
  }
}
