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
              <label class="col-xs-3 control-label"><span class="required">*</span> 功能点名称：</label>
              <div class="col-xs-9">
                <input type="text" class="form-control" placeholder="工作模式">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> 功能 ID：</label>
              <div class="col-xs-9">
                <input type="text" class="form-control" placeholder="工作模式" :disabled="mode === 'standard'">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> 数据类型：</label>
              <div class="col-xs-9">
                <label class="eva-radio-label"><input type="radio" value="bool" v-model="dataType" :disabled="mode === 'standard'"> 布尔型</label>
                <label class="eva-radio-label"><input type="radio" value="number" v-model="dataType" :disabled="mode === 'standard'"> 数值型</label>
                <label class="eva-radio-label"><input type="radio" value="enum" v-model="dataType" :disabled="mode === 'standard'"> 枚举型</label>
                <!--<label class="eva-radio-label"><input type="radio" value="error" v-model="dataType" :disabled="mode === 'standard'"> 故障型</label>-->
                <label class="eva-radio-label"><input type="radio" value="string" v-model="dataType" :disabled="mode === 'standard'"> 字符型</label>
                <label class="eva-radio-label"><input type="radio" value="raw" v-model="dataType" :disabled="mode === 'standard'"> RAW型</label>
              </div>
            </div>

            <!-- Fields for number type -->
            <template v-if="dataType === 'number'">
              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> 数值范围：</label>
                <div class="col-xs-9 form-inline">
                  <input type="text" class="form-control" placeholder="请输入整数"> -
                  <input type="text" class="form-control" placeholder="请输入整数">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> 间距：</label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" placeholder="请输入整数">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> 倍数：</label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" placeholder="请输入整数">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label">单位：</label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" placeholder="">
                </div>
              </div>
            </template>

            <!-- Fields for enum type -->
            <template v-else-if="dataType === 'enum'">
              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> 枚举值：</label>
                <div class="col-xs-9">
                  <textarea class="form-control" placeholder="将枚举值填入此处，用英文逗号分隔"></textarea>
                </div>
              </div>
            </template>

            <!-- Fields for error type -->
            <!--<template v-else-if="dataType === 'error'">-->
              <!--<div class="form-group">-->
                <!--<label class="col-xs-3 control-label"><span class="required">*</span> 故障值：</label>-->
                <!--<div class="col-xs-9">-->
                  <!--<textarea class="form-control" placeholder="将故障值填入此处，用英文逗号分隔"></textarea>-->
                  <!--<p><small>故障值，是按照对应的字节位来标识的，依次为bit0-bitx，多个字节位代表多个故障可同时发生，最多支持32位。</small></p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</template>-->

            <!-- Fields for string type -->
            <template v-else-if="dataType === 'string' || dataType === 'raw'">
              <div class="form-group">
                <label class="col-xs-3 control-label">最大长度：</label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" placeholder="不超过255个字节" disabled>
                </div>
              </div>
            </template>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> 数据传输类型：</label>
              <div class="col-xs-9">
                <label class="eva-radio-label"><input type="radio" value="updown" v-model="transType" :disabled="dataType === 'error'"> 可下发可上报</label>
                <label class="eva-radio-label"><input type="radio" value="up" v-model="transType" ref="upTransType"> 只上报</label>
                <label class="eva-radio-label"><input type="radio" value="down" v-model="transType" :disabled="dataType === 'error'"> 只下发</label>
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label">描述：</label>
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

    data () {
      return {
        dataType: '', // bool, number, enum, error, string, raw,
        transType: ''
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
    },

    watch: {
      dataType (newType) {
        if (newType === 'error') {
          this.transType = 'up'
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
