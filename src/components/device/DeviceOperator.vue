<template>
  <div>
    <a href="javascript:;" @click="openEditor">操作</a>

    <div class="modal fade bs-example-modal-lg" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">远程操作"{{ deviceName }}"设备</h4>
          </div>
          <div class="modal-body">
            即将开放...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="finishEditing">保存</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  // import ScriptJS from 'scriptjs'

  export default {
    name: 'DeviceOperator',

    data () {
      return {
        editingDefinitions: this.value.slice(),

        dataDefinitions: ['data1', 'data2', 'data3'],

        showError: false
      }
    },

    mounted () {
      $(this.$refs.modal).modal({ show: false })
    },
    methods: {
      formatTags (tagsArray) {
        return tagsArray.join(',')
      },

      openEditor () {
        this.showError = false
        $(this.$refs.tagsInput).importTags(this.formatTags(this.value))
        $(this.$refs.modal).modal('show')
      },

      finishEditing () {
        this.$emit('input', this.editingDefinitions.slice())
      }
    },

    props: ['value', 'deviceName']
  }
</script>

<style lang="scss">
  @import '/static/vendors/jquery-ui-1.12.1.custom/jquery-ui.css';

  .tagsinput span {
    line-height: 14px;
  }
</style>
