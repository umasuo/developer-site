<template>
  <div>
    <div class="row tile_count">
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-user"></i> 新用户反馈</span>
        <div class="count">2344238</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-clock-o"></i> 新激活设备（今日）</span>
        <div class="count">4340</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-user"></i> 在线设备数（今日）</span>
        <div class="count green">290</div>
      </div>
      <div class="col-md-3 col-sm-6 tile_stats_count">
        <span class="count_top"><i class="fa fa-user"></i> 新增激活用户（今日）</span>
        <div class="count">4,567</div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <form class="form-inline">
          <div class="form-group">
            <label>选择设备类型：
              <select class="form-control">
                <option>设备1</option>
                <option>设备1</option>
                <option>设备1</option>
              </select>
            </label>
          </div>

          &nbsp;

          <div class="form-group">
            <label>选择时间周期：
          <select class="form-control">
              <option>过去7天</option>
              <option>过去一个月</option>
              <option>过去三个月</option>
            </select>
            </label>
          </div>

          &nbsp;

          <button class="form-control btn-default">查询</button>
        </form>
      </div>
    </div><!-- end of search condition -->

    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Transaction Summary <small>Weekly progress</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <canvas ref="chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import ScriptJS from 'scriptjs'

  export default {
    name: 'Dashboard',

    mounted () {
      const that = this
      ScriptJS('/static/vendors/gentelella/Chart.js/dist/Chart.min.js', () => {
        // eslint-disable-next-line
        new Chart(that.$ref.chart, {
          type: 'line',
          data: {
            data: [
              {
                x: 10,
                y: 20
              },
              {
                x: 15,
                y: 10
              }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })
      })
    }
  }
</script>
