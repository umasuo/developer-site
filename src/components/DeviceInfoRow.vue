<template>
  <tr>
    <td>
      <img v-bind:src="deviceInfo.icon"></img>
    </td>
    <td>
      <input class="device-row__name"
        type="text"
        v-model.trim.lazy="deviceInfo.customerId"
        :value="deviceInfo.customerId"
        :readonly="true">
    </td>
    <td>
      <input class="device-row__name"
        type="text"
        v-model.trim.lazy="deviceInfo.name"
        :value="deviceInfo.name"
        readonly="true">
    </td>
    <td>
      <input class="device-row__name"
      type="text"
      v-model.trim.lazy="deviceInfo.userId"
      :value="deviceInfo.userId"
      @click="editingUser = true"
      @change="editingUser = false"
      @blur="editingUser = false"
      :readonly="!editingUser"
      :class="{ 'device-row__name--editing': editingUser }">
    </td>
    <td>
      <DeviceOperator v-model="device.dataDefineIds" :deviceName="deviceInfo.name"></DeviceOperator>
    </td>
    <td>
      <a href="javascript:;" @click="removeDevice">删除</a>
    </td>
  </tr>
</template>

<script>
import DeviceOperator from '@/components/DeviceOperator'

export default {
  name: 'DeviceInfoRow',

  props: ['device'],

  data () {
    return {
      deviceInfo: Object.assign({}, this.device),
      editingName: false,
      editingUser: false
    }
  },

  watch: {
    device (device) {
      this.deviceInfo = Object.assign({}, device)
    },

    deviceInfo: {
      handler (deviceInfo) {
        this.$emit('updateDevice', deviceInfo)
        // TODO: implement this.
        // send update request, using deviceInfo,
        // if success, nothing else to do.
        // if error, use device prop reset deviceInfo, and show error alert

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
    DeviceOperator
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
