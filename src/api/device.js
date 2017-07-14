import { http } from 'src/api/client'

export default {
  async fetchDevices () {
    return (await http.get('devices/data')).data
  }
}
