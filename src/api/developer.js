import client, { http } from 'src/api/client'
import utils from 'src/utils'

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

  signout () {
    try {
      http.delete(`developers/${client.session.developerView.id}/signout`)
    } catch (e) {
      // Something wrong when signout, app should still run properly
    }
    client.setSession()
  },

  async reverifyEmail (developerId) {
    await http.post(`developers/${developerId}/verify`)
  },

  async changePassword (oldPassword, newPassword) {
    const data = {
      version: client.session.developerView.version,
      actions: [
        {
          action: 'changePassword',
          oldPassword,
          newPassword
        }
      ]
    }
    const developerView = (await http.put('developers/' + client.session.developerView.id, data)).data
    client.setDeveloper(developerView)
  },

  async requestResetEmail (email) {
    if (!utils.validateEmail(email)) {
      throw new Error('email not valid')
    }

    const queryParams = new URLSearchParams()
    queryParams.append('email', email)

    await http.post('developers/reset-password', queryParams)
  },

  async resetPassword (id, pwd, token) {
    if (!utils.validatePassword(pwd)) {
      throw new Error('password not valid')
    }

    const data = {
      developerId: id,
      token: token,
      newPassword: pwd
    }
    await http.put('developers/reset-password', data)
  }
}
