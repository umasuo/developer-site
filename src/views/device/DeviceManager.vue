<template>
  <div>
    <div class="page-title">
      <div class="title_left">
        <h3>设备管理</h3>
      </div>
    </div>

    <div class="clearfix"></div>

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
                  <th>设备icon</th>
                  <th>设备ID</th>
                  <th>设备类型</th>
                  <th>所属用户</th>
                  <th>操作</th>
                  <th>管理</th>
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
    </div>
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
