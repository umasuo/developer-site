<template>
  <div>
    <a href="javascript:;" @click="openEditor">查看/编辑</a>

    <div class="modal fade bs-example-modal-lg" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">编辑"{{ deviceName }}"设备的数据定义</h4>
          </div>
          <div class="modal-body">
            <input ref="tagsInput" type="text" class="tags form-control"/>
            <div id="suggestions-container" style="position: relative; float: left; width: 250px; margin: 10px;"></div>
            <select class="form-control" @change.prevent="selectData">
              <option value="default" selected>添加数据定义</option>
              <option v-for="data in dataDefinitions" :value="data">{{ data }}</option>
            </select>
            <p class="text-danger" v-if="showError"><small>错误：数据定义已经存在</small></p>
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
  import ScriptJS from 'scriptjs'

  export default {
    name: 'DeviceDataDefinitionsEditor',

    data () {
      return {
        editingDefinitions: this.value.slice(),

        dataDefinitions: ['data1', 'data2', 'data3'],

        showError: false
      }
    },

    mounted () {
      $(this.$refs.modal).modal({ show: false })

      const that = this
      ScriptJS('/static/vendors/gentelella/jquery.tagsinput/src/jquery.tagsinput.js', () => {
        $(this.$refs.tagsInput).tagsInput({
          width: 'auto',
          interactive: false,
          delimiter: ',',
          onAddTag (tag) {
            that.editingDefinitions.push(tag)
          },
          onRemoveTag (tag) {
            const index = that.editingDefinitions.indexOf(tag)
            that.editingDefinitions.splice(index, 1)
          }
        })
      })
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

      selectData (e) {
        this.showError = false
        if (e.target.value !== 'default') {
          // Add selected data to tagsInput only if not exist in it yet.
          if (!$(this.$refs.tagsInput).tagExist(e.target.value)) {
            $(this.$refs.tagsInput).addTag(e.target.value)
          } else {
            this.showError = true
          }
        }
        e.target.selectedIndex = 0 // reset select
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
