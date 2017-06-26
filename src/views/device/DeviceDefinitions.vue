<template>
  <div>
    <div class="page-title">
      <div class="title_left">
        <h3>产品定义</h3>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>产品列表</h2>

            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link" @click="addNewDevice"><i class="fa fa-plus"></i> 新增产品定义</a>
              </li>
            </ul>

            <div class="clearfix"></div>

          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>产品icon</th>
                  <th>产品名称</th>
                  <th>产品类型</th>
                  <th>产品介绍</th>
                  <th>联网类型</th>
                  <!--<th>是否开放</th>-->
                  <th>功能定义</th>
                  <th>数据定义</th>
                  <th>产品状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <DeviceDefinitionRow v-for="device in deviceDefinitions"
                                     :device="device"
                                     :key="device.id"
                                     @removeDevice="removeDevice"
                                     @updateDevice="updateDevice"
                                     track-by="id">
                </DeviceDefinitionRow>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DeviceDefinitionRow from '@/components/device/DeviceDefinitionRow'

  let id = 1

  export default {
    name: 'DeviceDefinitions',

    data () {
      return {
        deviceDefinitions: [
          {
            'id': 'asdf',
            'developerId': 'developer1',
            'name': '手环',
            'icon': 'http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png',
            'type': 'WIFI',
            'isOpen': false,
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
        this.deviceDefinitions.unshift({
          'id': 'asdf' + id++,
          'developerId': 'developer1',
          'name': '新设备',
          'icon': 'http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png',
          'type': 'WIFI',
          'isOpen': false,
          'dataDefineIds': []
        })
      },

      removeDevice (device) {
        const index = this.deviceDefinitions.indexOf(device)
        this.deviceDefinitions.splice(index, 1)
      },

      updateDevice (updatingDevice) {
        let index = -1
        this.deviceDefinitions.filter((device, curIndex) => {
          if (device.id === updatingDevice.id) {
            index = curIndex
          }
        })
        if (index !== -1) {
          this.deviceDefinitions[index] = Object.assign({}, updatingDevice)
        }
      }
    },

    components: {
      DeviceDefinitionRow
    }
  }
</script>

<style lang="scss">
</style>
