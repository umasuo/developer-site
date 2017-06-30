<template>
  <div class="modal fade data-editor" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">管理标准功能</h4>
        </div>
        <div class="modal-body">
          <div class="form-inline">
            <div class="checkbox eva-std-func-checkbox">
              <label>
                <input type="checkbox"> 开关
              </label>
            </div>

            <div class="checkbox eva-std-func-checkbox">
              <label>
                <input type="checkbox"> 工作状态
              </label>
            </div>

            <div class="checkbox eva-std-func-checkbox">
              <label>
                <input type="checkbox"> 负离子
              </label>
            </div>

            <div class="checkbox eva-std-func-checkbox">
              <label>
                <input type="checkbox"> 目标温度
              </label>
            </div>
          </div>
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
    name: 'ProductStdFuncManager'
  }
</script>

<style lang="scss">
  .eva-std-func-checkbox {
    border: 1px solid #ddd;
    margin: 0 10px 15px 0 !important;

    > label {
      padding: 5px !important;
    }
  }
</style>
