import { http } from 'src/api/client'

// export DAILY = 'daily'
// export WEEKLY = 'weekly'
// export MONTHLY = 'monthly'
// export ANNUAL = 'annual'

export default {
  async fetchUserReport (type, timezone) {
    const queryParams = new URLSearchParams()
    queryParams.append('type', type)
    queryParams.append('timezone', timezone)

    return (await http.get('/reports/userReports', queryParams)).data
  }
}
