<template>
  <div>
    <div class="row tile_count">
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-plus"></i> {{$t('dashboard.today_new_device')}}</span>
        <div class="count">{{ dailyDeviceIncrease }}</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-clock-o"></i> {{$t('dashboard.today_active_device')}}</span>
        <div class="count green">{{ dailyDeviceActive }}</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-user"></i> {{$t('dashboard.today_increase_user')}}</span>
        <div class="count">{{ dailyUserIncrease }}</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <!-- <span class="count_top"><i class="fa fa-user"></i> 新用户反馈（今日）</span> -->
        <span class="count_top"><i class="fa fa-users"></i> {{$t('dashboard.today_total_user')}}</span>
        <div class="count">{{ dailyUserTotal }}</div>
      </div>
    </div>

    <div class="alert alert-danger" role="alert" v-if="message === 'fail'">{{$t('misc.fetch_data_fail')}}</div>

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
                <label>{{$t('dashboard.select_time')}}
                  <select class="form-control" v-model="reportType">
                    <option value="weekly">{{$t('dashboard.week')}}</option>
                    <option value="monthly">{{$t('dashboard.month')}}</option>
                  </select>
                </label>
              </div>

              <button class="form-control btn-default" @click.prevent="fetchReport">{{$t('misc.search')}}</button>
            </form>
          </div>
        </div>
      </div>
    </div><!-- end of search condition -->

    <div class="row">
      <div class="col-xs-12">
        <TabPanel>
          <p v-if="linechart.message === 'loading'">{{$t('misc.loading')}}</p>
          <p v-else-if="linechart.message === 'fail'">{{$t('dashboard.chart_fail')}}</p>

          <TabPanelItem :title="$t('dashboard.device_increase')" active=true>
            <LineChart class="eva-chart" v-if="deviceIncrease" :chartData="deviceIncrease"></LineChart>
          </TabPanelItem>

          <TabPanelItem :title="$t('dashboard.device_active')">
            <LineChart class="eva-chart" v-if="deviceActive" :chartData="deviceActive"></LineChart>
          </TabPanelItem>

          <TabPanelItem :title="$t('dashboard.device_total')">
            <LineChart class="eva-chart" v-if="deviceTotal" :chartData="deviceTotal"></LineChart>
          </TabPanelItem>

          <TabPanelItem :title="$t('dashboard.user_increase')">
            <LineChart class="eva-chart" v-if="userIncrease" :chartData="userIncrease"></LineChart>
          </TabPanelItem>

          <TabPanelItem :title="$t('dashboard.user_active')">
            <LineChart class="eva-chart" v-if="userActive" :chartData="userActive"></LineChart>
          </TabPanelItem>

          <TabPanelItem :title="$t('dashboard.user_total')">
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
            <h2>{{$t('dashboard.report')}}
              <button class="btn btn-xs btn-primary" @click="downloadReportCSV">{{$t('dashboard.download_report')}}</button>
            </h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <div class="col-xs-12">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>{{$t('dashboard.date')}}</th>
                    <th>{{$t('dashboard.device_increase')}}</th>
                    <th>{{$t('dashboard.device_active')}}</th>
                    <th>{{$t('dashboard.device_total')}}</th>
                    <th>{{$t('dashboard.user_increase')}}</th>
                    <th>{{$t('dashboard.user_active')}}</th>
                    <th>{{$t('dashboard.user_total')}}</th>
                    <!-- <th>新增反馈</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(date, index) in dates" :key="date">
                    <th scope="row">{{ labels[index] }}</th>
                    <td>{{ report[date].deviceIncrease || 0 }}</td>
                    <td>{{ report[date].deviceActive || 0 }}</td>
                    <td>{{ report[date].deviceTotal || 0 }}</td>
                    <td>{{ report[date].userIncrease || 0 }}</td>
                    <td>{{ report[date].userActive || 0 }}</td>
                    <td>{{ report[date].userTotal || 0 }}</td>
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
import api from 'src/api'
import TabPanel from 'src/components/common/TabPanel'
import TabPanelItem from 'src/components/common/TabPanelItem'
import json2csv from 'json2csv'

let vm = null

export default {
  name: 'Dashboard',

  data () {
    return {
      linechart: {
        message: ''
      },

      message: '',

      reportType: 'weekly',
      userReport: [],
      deviceReport: [],

      report: null,
      dates: null,
      labels: null,

      dailyDeviceIncrease: 0,
      dailyDeviceActive: 0,
      dailyDeviceTotal: 0,
      dailyUserIncrease: 0,
      dailyUserActive: 0,
      dailyUserTotal: 0,

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

  created () {
    vm = this
  },

  mounted () {
    this.fetchReport()
    this.fetchDailyReport()
  },

  methods: {
    async fetchDailyReport () {
      this.message = ''

      const promises = []
      // promises.push(this.fetchUserReport(this.reportType, this.timezone))
      // promises.push(this.fetchDeviceReport(this.reportType, this.timezone))
      // TODO: uncomment and remove following two row after api ready
      promises.push(this.fetchUserReport('daily', this.timezone))
      promises.push(this.fetchDeviceReport('daily', this.timezone))

      try {
        const [userReports, deviceReports] = await Promise.all(promises)

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
      } catch (e) {
        this.message = 'fail'
      }
    },

    async fetchUserReport (type) {
      return await api.userReport.fetchUserReport(type, this.timezone)
    },

    async fetchDeviceReport (type) {
      return await api.deviceReport.fetchDeviceReport(type, this.timezone)
    },

    // 按选择时间周期获取报表数据
    async fetchReport () {
      const promises = []
      // promises.push(this.fetchUserReport(this.reportType, this.timezone))
      // promises.push(this.fetchDeviceReport(this.reportType, this.timezone))
      // TODO: uncomment and remove following two row after api ready
      promises.push(this.fetchUserReport('daily', this.timezone))
      promises.push(this.fetchDeviceReport('daily', this.timezone))
      promises.push(import(/* webpackChunkName: "moment" */ 'moment'))

      try {
        const [userReport, deviceReport, moment] = await Promise.all(promises)

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
      } catch (e) {
        this.message = 'fail'
      }
    },

    downloadReportCSV () {
      const csv = json2csv({
        data: this.dates.map(date => {
          const dateObj = new Date(date * 1000) // server return date in seconds, new Date take date in milliseconds
          return { date: dateObj.toISOString(), ...this.report[date] }
        }),
        fields: ['date', 'deviceActive', 'deviceIncrease', 'deviceTotal', 'userActive', 'userIncrease', 'userTotal']
      })

      const uriContent = 'data:application/octet-stream,' + encodeURIComponent(csv)
      const link = document.createElement('a')
      link.download = 'report.csv'
      link.href = uriContent
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  },

  components: {
    LineChart: async () => {
      vm.linechart.message = 'loading'
      try {
        const component = (await import(/* webpackChunkName: "LineChartComponent" */ 'src/components/common/LineChart')).default
        vm.linechart.message = ''
        return component
      } catch (e) {
        vm.linechart.message = 'fail'
      }
    },
    TabPanel,
    TabPanelItem
  }
}
</script>

<style>
</style>
