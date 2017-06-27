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

                <label class="checkbox-inline">
                  <input type="checkbox">是否激活
                </label>

                <label class="checkbox-inline">
                  <input type="checkbox">是否在线
                </label>
              </div>

              <div>
                <div class="form-group">
                  <label>用户ID:
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
            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link" @click="addNewDevice"><i class="fa fa-plus"></i> 添加设备</a>
              </li>
            </ul>

            <div class="clearfix"></div>

          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>设备图标</th>
                  <th>设备ID</th>
                  <th>出产ID</th>
                  <th>是否激活</th>
                  <th>所属产品</th>
                  <th>激活时间</th>
                  <th>是否在线</th>
                  <th>所属用户</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <DeviceInfoRow v-for="device in deviceInfo"
                                     :device="device"
                                     :key="device.id"
                                     @removeDevice="removeDevice"
                                     @updateDevice="updateDevice">
                </DeviceInfoRow>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div><!-- end of device list row -->
  </div>
</template>

<script>
  import DeviceInfoRow from '@/components/device/DeviceInfoRow'

  let id = 1

  export default {
    name: 'DeviceInfo',

    data () {
      return {
        deviceInfo: [
          {
            'id': 'asdf',
            'customerId': 'QWEQ-SASD-ZCZC-SATT-ADAS',
            'developerId': 'developer1',
            'userId': 'user1',
            'name': '手环',
            'icon': 'http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png',
            'type': 'WIFY',
            'dataDefineIds': [
              'data1',
              'data2'
            ]
          }
        ]
      }
    },

    methods: {
      addNewDevice () {
        // TODO: implement this.
        this.deviceInfo.unshift({
          'id': 'asdf' + id++,
          'customerId': 'QWEQ-SASD-ZCZC-SATT-ADAS',
          'developerId': 'developer1',
          'userId': 'user1',
          'name': '新设备',
          'icon': 'http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png',
          'type': 'WIFI',
          'dataDefineIds': []
        })
      },

      removeDevice (device) {
        const index = this.deviceInfo.indexOf(device)
        this.deviceInfo.splice(index, 1)
      },

      updateDevice (updatingDevice) {
        let index = -1
        this.deviceInfo.filter((device, curIndex) => {
          if (device.id === updatingDevice.id) {
            index = curIndex
          }
        })
        if (index !== -1) {
          this.deviceInfo[index] = Object.assign({}, updatingDevice)
        }
      }
    },

    components: {
      DeviceInfoRow
    }
  }
</script>

<style lang="scss">
</style>
