import { http } from 'src/api/client'

export default {
  // http://104.197.36.133/v1/users
  // http://104.197.36.133/v1/users?phone=XXX&userId=XXX
  async fetchUsers () {
    return (await http.get('users')).data
  },

  async fetchUserByPhone (phone) {
    return (await http.get(`users?phone=${phone}`))
  },

  async fetchUserByUserId (id) {
    return (await http.get(`users?userId=${id}`))
  }
}
