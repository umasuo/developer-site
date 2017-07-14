<template>
  <div>
    <div class="row tile_count">
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-plus"></i> 新激活设备（今日）</span>
        <div class="count">{{ dailyDeviceIncrease }}</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-clock-o"></i> 在线设备</span>
        <div class="count green">{{ dailyDeviceActive }}</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-user"></i> 新增用户（今日）</span>
        <div class="count">{{ dailyUserIncrease }}</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <!-- <span class="count_top"><i class="fa fa-user"></i> 新用户反馈（今日）</span> -->
        <span class="count_top"><i class="fa fa-users"></i> 总用户数</span>
        <div class="count">{{ dailyUserTotal }}</div>
      </div>
    </div>

    <!-- TODO: show a x-steps-to-create-product wizard -->

    <div class="row">
      <div class="col-xs-12">
        <div class="x_panel">
          <div class="x_content">

            <form class="form-inline">
              <!-- <div class="form-group">
                <label>选择产品类型：
                  <select class="form-control">
                    <option>所有产品</option>
                    <option>产品1</option>
                    <option>产品2</option>
                    <option>产品3</option>
                  </select>
                </label>
              </div> -->

              <div class="form-group">
                <label>选择时间周期：
                  <select class="form-control" v-model="reportType">
                    <option value="weekly">过去7天</option>
                    <option value="monthly">过去30天</option>
                  </select>
                </label>
              </div>

              <button class="form-control btn-default" @click.prevent="fetchReport">查询</button>
            </form>
          </div>
        </div>
      </div>
    </div><!-- end of search condition -->

    <div class="row">
      <div class="col-xs-12">
        <TabPanel>
          <TabPanelItem title="新增设备" active=true>
            <LineChart class="eva-chart" v-if="deviceIncrease" :chartData="deviceIncrease"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="活跃设备">
            <LineChart class="eva-chart" v-if="deviceActive" :chartData="deviceActive"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="总设备">
            <LineChart class="eva-chart" v-if="deviceTotal" :chartData="deviceTotal"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="新增用户">
            <LineChart class="eva-chart" v-if="userIncrease" :chartData="userIncrease"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="活跃用户">
            <LineChart class="eva-chart" v-if="userActive" :chartData="userActive"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="总用户">
            <LineChart class="eva-chart" v-if="userTotal" :chartData="userTotal"></LineChart>
          </TabPanelItem>

          <!-- <TabPanelItem title="新增反馈">
            <LineChart class="eva-chart" v-if="deviceIncrease" :chartData="deviceIncrease"></LineChart>
          </TabPanelItem> -->
        </TabPanel>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>报表</h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <div class="col-xs-12">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>日期</th>
                    <th>新增设备</th>
                    <th>活跃设备</th>
                    <th>总设备</th>
                    <th>新增用户</th>
                    <th>活跃用户</th>
                    <th>总用户</th>
                    <!-- <th>新增反馈</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(date, index) in dates" :key="date">
                    <th scope="row">{{ labels[index] }}</th>
                    <td>{{ report[date].deviceIncrease }}</td>
                    <td>{{ report[date].deviceActive }}</td>
                    <td>{{ report[date].deviceTotal }}</td>
                    <td>{{ report[date].userIncrease }}</td>
                    <td>{{ report[date].userActive }}</td>
                    <td>{{ report[date].userTotal }}</td>
                    <!-- <td>123</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import api from 'src/api'
import LineChart from 'src/components/common/LineChart'
import TabPanel from 'src/components/common/TabPanel'
import TabPanelItem from 'src/components/common/TabPanelItem'

export default {
  name: 'Dashboard',

  data () {
    return {
      reportType: 'weekly',
      userReport: [],
      deviceReport: [],

      report: null,
      dates: null,
      labels: null,

      dailyDeviceIncrease: null,
      dailyDeviceActive: null,
      dailyDeviceTotal: null,
      dailyUserIncrease: null,
      dailyUserActive: null,
      dailyUserTotal: null,

      deviceIncrease: null,
      deviceActive: null,
      deviceTotal: null,
      userIncrease: null,
      userActive: null,
      userTotal: null
    }
  },

  computed: {
    ...mapState(['timezone'])
  },

  mounted () {
    this.fetchReport()
    this.fetchDailyReport()
  },

  methods: {
    async fetchDailyReport () {
      const promises = []
      // promises.push(this.fetchUserReport(this.reportType, this.timezone))
      // promises.push(this.fetchDeviceReport(this.reportType, this.timezone))
      // TODO: uncomment and remove following two row after api ready
      promises.push(this.fetchUserReport('daily', this.timezone))
      promises.push(this.fetchDeviceReport('daily', this.timezone))

      const [userReports, deviceReports] = await Promise.all(promises)
      console.log(userReports, deviceReports)

      const latestUserReport = userReports.slice(-1).pop()
      const latestDeviceReport = deviceReports.slice(-1).pop()

      if (latestDeviceReport) {
        this.dailyDeviceIncrease = latestDeviceReport.increaseNumber
        this.dailyDeviceActive = latestDeviceReport.activeNumber
        this.dailyDeviceTotal = latestDeviceReport.totalNumber
      }

      if (latestUserReport) {
        this.dailyUserIncrease = latestUserReport.increaseNumber
        this.dailyUserActive = latestUserReport.activeNumber
        this.dailyUserTotal = latestUserReport.totalNumber
      }
    },

    fetchUserReport (type) {
      return api.userReport.fetchUserReport(type, this.timezone)
    },

    fetchDeviceReport (type) {
      return api.deviceReport.fetchDeviceReport(type, this.timezone)
    },

    // 按选择时间周期获取报表数据
    async fetchReport () {
      const promises = []
      // promises.push(this.fetchUserReport(this.reportType, this.timezone))
      // promises.push(this.fetchDeviceReport(this.reportType, this.timezone))
      // TODO: uncomment and remove following two row after api ready
      promises.push(this.fetchUserReport('daily', this.timezone))
      promises.push(this.fetchDeviceReport('daily', this.timezone))

      const [userReport, deviceReport] = await Promise.all(promises)

      const report = {}
      userReport.forEach(element => {
        report[element.date] = report[element.date] || {}
        report[element.date].userIncrease = element.increaseNumber
        report[element.date].userActive = element.activeNumber
        report[element.date].userTotal = element.totalNumber
      })
      deviceReport.forEach(element => {
        report[element.date] = report[element.date] || {}
        report[element.date].deviceIncrease = element.increaseNumber
        report[element.date].deviceActive = element.activeNumber
        report[element.date].deviceTotal = element.totalNumber
      })
      this.report = report

      this.dates = userReport.map(day => {
        return day.date
      }).sort()

      // TODO: remove after api ready
      if (this.reportType === 'weekly') this.dates = this.dates.slice(-7)

      this.labels = this.dates.map(date => {
        const utcOffset = parseInt(this.timezone.substr(3))
        const dateWithOffset = moment(date.toString(), 'X').utcOffset(utcOffset)

        return dateWithOffset.format('YYYY-MM-DD')
      })

      const keys = ['userIncrease', 'userActive', 'userTotal', 'deviceIncrease', 'deviceActive', 'deviceTotal']
      keys.forEach(key => {
        this[key] = {
          labels: this.labels,
          datasets: [
            {
              data: this.dates.map(date => report[date][key])
            }
          ]
        }
      })

      /*
      deviceIncrease: null,
      deviceActive: null,
      deviceTotal: null,
      userIncrease: null,
      userActive: null,
      userTotal: null
      */
    }
  },

  components: {
    LineChart,
    TabPanel,
    TabPanelItem
  }
}
</script>

<style>
</style>
