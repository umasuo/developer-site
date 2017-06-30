<template>
  <div class="modal fade data-editor" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">{{ title }}</h4>
        </div>
        <div class="modal-body">

          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-xs-3 control-label">功能点名称：</label>
              <div class="col-xs-9">
                <input type="text" class="form-control" placeholder="工作模式">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label">标识名：</label>
              <div class="col-xs-9">
                <input type="text" class="form-control" placeholder="工作模式" :disabled="mode === 'standard'">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label">数据类型：</label>
              <div class="col-xs-9">
                <input type="text" class="form-control" placeholder="enum"  :disabled="mode === 'standard'">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label">枚举值：</label>
              <div class="col-xs-9">
                <input type="text" class="form-control" placeholder="列举枚举值，用逗号分隔">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label">备注：</label>
              <div class="col-xs-9">
                <textarea class="form-control" placeholder="根据产品实际功能来设定"></textarea>
              </div>
            </div>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">确定</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductFuncEditor',

    props: {
      mode: {
        default: 'standard',
        type: String
      }
    },

    computed: {
      title () {
        switch (this.mode) {
          case 'standard':
            return '编辑标准功能'
          case 'createCustom':
            return '添加自定义功能'
          case 'custom':
            return '编辑自定义功能'
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
