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

    return (await http.get(`/reports/userReports?type=${type}&timezone=${timezone}`)).data
  }
}

/*
  * date time of the data.
  private Long date;

  * The increase number of the hour.
  private Integer increaseNumber;

  * 当前的活跃用户(活跃用户的定义为当天有请求的用户，每天的活跃用户则为当天23点的活跃用户数：不同时区不一样).
  private Integer activeNumber;

  * total user count at this time.
  private Integer totalNumber;
*/
