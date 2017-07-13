<template>
  <div>
    <div class="row tile_count">
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-user"></i> 新激活设备（今日）</span>
        <div class="count">290</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-clock-o"></i> 在线设备</span>
        <div class="count green">43409</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-user"></i> 新增用户（今日）</span>
        <div class="count">{{dailyUserReport}}</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-user"></i> 新用户反馈（今日）</span>
        <div class="count">4,567</div>
      </div>
    </div>

    <!-- TODO: show a x-steps-to-create-product wizard -->

    <div class="row">
      <div class="col-xs-12">
        <div class="x_panel">
          <div class="x_content">

            <form class="form-inline">
              <div class="form-group">
                <label>选择产品类型：
                  <select class="form-control">
                    <option>所有产品</option>
                    <option>产品1</option>
                    <option>产品2</option>
                    <option>产品3</option>
                  </select>
                </label>
              </div>

              <div class="form-group">
                <label>选择时间周期：
              <select class="form-control">
                  <option>过去7天</option>
                  <option>过去一个月</option>
                  <option>过去三个月</option>
                </select>
                </label>
              </div>

              <button class="form-control btn-default" @click.prevent="">查询</button>
            </form>
          </div>
        </div>
      </div>
    </div><!-- end of search condition -->

    <div class="row">
      <div class="col-xs-12">
        <TabPanel>
          <TabPanelItem title="新增设备" active=true>
            <LineChart class="eva-chart"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="活跃设备">
            <LineChart class="eva-chart"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="总设备">
            <LineChart class="eva-chart"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="新增用户">
            <LineChart class="eva-chart"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="活跃用户">
            <LineChart class="eva-chart"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="总用户">
            <LineChart class="eva-chart"></LineChart>
          </TabPanelItem>

          <TabPanelItem title="新增反馈">
            <LineChart class="eva-chart"></LineChart>
          </TabPanelItem>
        </TabPanel>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>报表 <small>显示最近30天</small></h2>
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
                    <th>新增反馈</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="wildcard in 12">
                    <th scope="row">{{ new Date().toLocaleDateString() }}</th>
                    <td>123</td>
                    <td>234</td>
                    <td>345</td>
                    <td>123</td>
                    <td>234</td>
                    <td>345</td>
                    <td>123</td>
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
import api from 'src/api'
import LineChart from 'src/components/common/LineChart'
import TabPanel from 'src/components/common/TabPanel'
import TabPanelItem from 'src/components/common/TabPanelItem'

export default {
  name: 'Dashboard',

  data () {
    return {
      dailyUser: [],
      UserReport: []
    }
  },

  computed: {
    dailyUserReport () {
      return this.fetchUserReport('daily')
    }
  },

  methods: {
    fetchUserReport (type) {
      this.UserReport = api.userReport.fetchUserReport(type)
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
