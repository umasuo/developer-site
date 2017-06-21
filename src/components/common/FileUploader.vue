<template>
  <div>
    <!--<img src="http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png" @click="openEditor"></img>-->
    <img :src='deviceIcon' @click="openEditor"></img>

    <div class="modal fade bs-example-modal-lg" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">{{ title }}</h4>
          </div>
          <div class="modal-body">
            <input type="file"></input>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="finishEditing">上传</button>
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
    name: 'FileUploader',

    // data () {
    //   return {
    //     editingDefinitions: this.value.slice()
    //   }
    // },

    mounted () {
      $(this.$refs.modal).modal({ show: false })
    },
    methods: {
      formatTags (tagsArray) {
        return tagsArray.join(',')
      },

      openEditor () {
        this.showError = false
        // $(this.$refs.tagsInput).importTags(this.formatTags(this.value))
        $(this.$refs.modal).modal('show')
      },

      finishEditing () {
        this.$emit('input', this.editingDefinitions.slice())
      }
    },

    props: ['deviceIcon', 'title']
  }
</script>

<style lang="scss">
  @import '/static/vendors/jquery-ui-1.12.1.custom/jquery-ui.css';

  .tagsinput span {
    line-height: 14px;
  }
</style>
