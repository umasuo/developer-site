<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>过滤条件</h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <form class="form-inline">
              <div>
                <div class="form-group">
                  <label>产品:
                    <select class="form-control">
                      <option value="all" selected="selected">所有产品</option>
                      <option value="id1" >手环</option>
                      <option value="id2" >体重秤</option>
                    </select>
                  </label>
                </div>

                <div class="form-group">
                  <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox1" value="option1"> 是否激活
                  </label>
                </div>
              </div>

              <div>
                <div class="form-group">
                  <label>用户手机:
                    <input type="text" class="form-control"/>
                  </label>
                </div>
                <div class="form-group">
                  <label>出厂ID:
                    <input type="text" class="form-control"/>
                  </label>
                </div>
                <div class="form-group">
                  <label>设备ID:
                    <input type="text" class="form-control"/>
                  </label>
                </div>
              </div>

              <button type="submit" class="btn btn-default">搜索</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>设备列表</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>设备图标</th>
                  <th>设备ID</th>
                  <th>出厂ID</th>
                  <th>所属产品</th>
                  <th>所属用户</th>
                  <th>绑定状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="device in devices" :key="device.deviceId">
                  <td>
                    <!-- TODO: 换个默认icon -->
                    <img :src="device.icon || 'http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png'"/>
                  </td>

                  <td>{{ device.deviceId }}</td>

                  <td>{{ device.unionId }}</td>

                  <td>{{ device.productName }}</td>

                  <td>{{ device.userPhone }}</td>

                  <td>{{ formatStatus(device) }}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div><!-- end of device list row -->
  </div>
</template>

<script>
  import api from 'src/api'
  import { mapState } from 'vuex'

  export default {
    name: 'DeviceInfo',

    data () {
      return {
        devices: []
      }
    },

    computed: {
      ...mapState(['timezone'])
    },

    created () {
      this.fetchDevices()
    },

    methods: {
      async fetchDevices () {
        this.devices = await api.device.fetchDevices()
      },

      async formatStatus (device) {
        // lazyload moment
        const moment = await import('moment')

        if (device.status === 'BIND') {
          return '于 ' +
            moment(device.bindTime.toString(), 'x')
              .utcOffset(parseInt(this.timezone.substr(3)))
              .format('YYYY/MM/DD') +
            ' 绑定'
        } else {
          return '于 ' +
            moment(device.unbindTime.toString(), 'x')
              .utcOffset(parseInt(this.timezone.substr(3)))
              .format('YYYY/MM/DD') +
            ' 解绑'
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
