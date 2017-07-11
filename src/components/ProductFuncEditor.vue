<template>
  <div class="modal fade data-editor" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
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
                <input type="text" class="form-control" v-model="editingFunc.name">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> 功能 ID：</label>
              <div class="col-xs-9">
                <input type="text" class="form-control" v-model="editingFunc.functionId" :disabled="mode === 'standard'">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> 数据类型：</label>
              <div class="col-xs-9">
                <label class="eva-radio-label"><input type="radio" value="boolean" v-model="editingFunc.dataType.type" :disabled="mode === 'standard'"> 布尔型</label>
                <label class="eva-radio-label"><input type="radio" value="value" v-model="editingFunc.dataType.type" :disabled="mode === 'standard'"> 数值型</label>
                <label class="eva-radio-label"><input type="radio" value="enum" v-model="editingFunc.dataType.type" :disabled="mode === 'standard'"> 枚举型</label>
                <!--<label class="eva-radio-label"><input type="radio" value="error" v-model="editingFunc.dataType.type" :disabled="mode === 'standard'"> 故障型</label>-->
                <label class="eva-radio-label"><input type="radio" value="string" v-model="editingFunc.dataType.type" :disabled="mode === 'standard'"> 字符型</label>
                <!--<label class="eva-radio-label"><input type="radio" value="raw" v-model="editingFunc.dataType.type" :disabled="mode === 'standard'"> RAW型</label>-->
              </div>
            </div>

            <!-- Fields for number type -->
            <template v-if="editingFunc.dataType.type === 'value'">
              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> 数值范围：</label>
                <div class="col-xs-9 form-inline">
                  <input type="text" class="form-control" placeholder="请输入整数" v-model="numberType.startValue"> -
                  <input type="text" class="form-control" placeholder="请输入整数" v-model="numberType.endValue">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> 间距：</label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" placeholder="请输入整数" v-model="numberType.interval">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> 倍数：</label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" placeholder="请输入整数" v-model="numberType.multiple">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label">单位：</label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" placeholder="" v-model="numberType.unit">
                </div>
              </div>
            </template>

            <!-- Fields for enum type -->
            <template v-else-if="editingFunc.dataType.type === 'enum'">
              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> 枚举值：</label>
                <div class="col-xs-9">
                  <textarea class="form-control" v-model="enumValues" placeholder="将枚举值填入此处，用英文逗号分隔"></textarea>
                </div>
              </div>
            </template>

            <!-- Fields for error type -->
            <!--<template v-else-if="editingFunc.dataType === 'error'">-->
              <!--<div class="form-group">-->
                <!--<label class="col-xs-3 control-label"><span class="required">*</span> 故障值：</label>-->
                <!--<div class="col-xs-9">-->
                  <!--<textarea class="form-control" placeholder="将故障值填入此处，用英文逗号分隔"></textarea>-->
                  <!--<p><small>故障值，是按照对应的字节位来标识的，依次为bit0-bitx，多个字节位代表多个故障可同时发生，最多支持32位。</small></p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</template>-->

            <!-- Fields for string type -->
            <template v-else-if="editingFunc.dataType.type === 'string'">
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
                <label class="eva-radio-label"><input type="radio" value="UPDOWN" v-model="editingFunc.transferType" :disabled="editingFunc.dataType === 'error'"> 可下发可上报</label>
                <label class="eva-radio-label"><input type="radio" value="UP" v-model="editingFunc.transferType"> 只上报</label>
                <label class="eva-radio-label"><input type="radio" value="DOWN" v-model="editingFunc.transferType" :disabled="editingFunc.dataType === 'error'"> 只下发</label>
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label">描述：</label>
              <div class="col-xs-9">
                <textarea class="form-control" v-model="editingFunc.description" placeholder="根据产品实际功能来设定"></textarea>
              </div>
            </div>
          </form>

        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" @click.prevent="submit">确定</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import api from 'src/api'
  import $ from 'jquery'

  export default {
    name: 'ProductFuncEditor',

    props: {
      mode: {
        default: 'standard',
        type: String
      },
      func: {
        type: Object,
        default () {
          return {
            dataType: {
              type: 'value'
            },
            command: ''
          }
        }
      },
      product: Object
    },

    data () {
      const numberType = this.func.dataType.type === 'value' ? this.func.dataType : {type: 'value'}
      const enumType = this.func.dataType.type === 'enum' ? this.func.dataType : {type: 'enum'}

      return {
        editingFunc: Object.assign({}, this.func),
        enumType,
        numberType,
        enumValues: enumType.values && enumType.values.join(',')
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

    methods: {
      ...mapActions(['updateProduct']),

      async submit () {
        let dataType = {}
        if (this.editingFunc.dataType.type === 'enum') {
          dataType = {dataType: this.enumType}
        } else if (this.editingFunc.dataType.type === 'value') {
          dataType = {dataType: this.numberType}
        }

        const actionName = this.mode === 'createCustom' ? 'addFunction' : 'updateFunction'
        try {
          await this.updateProduct({
            product: this.product,
            request: api.buildRequest(this.product.version)
                        .addAction({action: actionName, ...this.editingFunc, ...dataType})
                        .request
          })
          $(this.$refs.modal).modal('hide')
        } catch (e) {
          console.dir(e)
          // TODO: handle errors
        }
      }
    },

    watch: {
      enumValues (values) {
        // TODO: 检查枚举值不能重复
        this.enumType.values = values.split(',')
      }
    }
  }
</script>

<style lang="scss">
</style>
