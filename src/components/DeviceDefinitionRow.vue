<template>
  <tr>
    <td>
      <input class="device-row__name" type="text"
             v-model.trim.lazy="editingDevice.name"
             :value="editingDevice.name"
             @click="editingName = true"
             @change="editingName = false"
             @blur="editingName = false"
             :readonly="!editingName"
             :class="{ 'device-row__name--editing': editingName }">
    </td>
    <td>
      <select name="type" v-model="editingDevice.type">
        <option value="WIFI">WIFI</option>
        <option value="BLUETOOTH">Bluetooth</option>
        <option value="OTHER">忘了还有什么了</option>
      </select>
    </td>
    <td>
      <DeviceDataDefinitionsEditor v-model="device.dataDefineIds" :deviceName="editingDevice.name"></DeviceDataDefinitionsEditor>
    </td>
    <td>
      <a href="javascript:;" @click="removeDevice">删除</a>
    </td>
  </tr>
</template>

<script>
  import DeviceDataDefinitionsEditor from '@/components/DeviceDataDefinitionsEditor'

  export default {
    name: 'DeviceDefinitionRow',

    props: ['device'],

    data () {
      return {
        editingDevice: Object.assign({}, this.device),
        editingName: false
      }
    },

    mounted () {
      console.log(this.device)
    },

    watch: {
      device (device) {
        this.editingDevice = Object.assign({}, device)
      },

      editingDevice: {
        handler (editingDevice) {
          this.$emit('updateDevice', editingDevice)
          // TODO: implement this.
          // send update request, using editingDevice,
          // if success, nothing else to do.
          // if error, use device prop reset editingDevice, and show error alert

          // update name, type or data definition list
        },
        deep: true
      }
    },

    methods: {
      removeDevice () {
        this.$emit('removeDevice', this.device)
        // TODO: implement this
        // send remove request
        // if success, nothing to do(this row will disappear automatically)
        // if error, show error alert
      }
    },

    components: {
      DeviceDataDefinitionsEditor
    }
  }
</script>

<style lang="scss">
  .device-row {
    &__name {
      border: solid white 1px;

      &:hover {
        border-color: lightgray;
      }

      &--editing {
        border-color: #aaa !important;
      }
    }
  }
</style>
