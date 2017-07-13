import { http } from 'src/api/client'

export default {
  async fetchDeviceReport (type, timezone) {
    const queryParams = new URLSearchParams()
    queryParams.append('type', type)
    queryParams.append('timezone', timezone)

    return (await http.get('/reports/deviceReports', queryParams)).data
  }
}
