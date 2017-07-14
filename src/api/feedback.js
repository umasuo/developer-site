import { http } from 'src/api/client'

export default {
  async fetchFeedbacks () {
    return (await http.get('feedbacks')).data
  }
}
