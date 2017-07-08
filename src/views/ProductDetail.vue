<template>
  <div class="row">

    <div class="col-xs-12">
      <div class="eva-wizard form_wizard wizard_horizontal">
        <ul class="wizard_steps anchor">
          <li>
              <span class="wizard_step" :class="step === 1 ? 'selected' : 'done'">
                <span class="step_no">1</span>
                <span class="step_descr">
                  产品定义<br>
                </span>
              </span>
          </li>
          <li>
              <span class="wizard_step" :class="{ selected: step === 2, done: step > 2, disabled: step < 2}">
                <span class="step_no">2</span>
                <span class="step_descr">
                  开发调试<br>
                </span>
              </span>
          </li>
          <li>
              <span class="wizard_step" :class="step === 3 ? 'selected' : 'disabled'">
                <span class="step_no">3</span>
                <span class="step_descr">
                  批量投产<br>
                </span>
              </span>
          </li>
        </ul>

        <div class="stepContainer">
          <WizardSteps v-model="step" :max="3"></WizardSteps>
        </div>
      </div>
    </div>

    <div :class="step === 1 ? 'col-xs-12' : 'col-xs-4'">
      <div class="x_panel">
        <div class="x_content">
          <ProductBasicInfo></ProductBasicInfo>
        </div>
      </div>

      <div class="x_panel" v-if="step === 2">
        <div class="x_title">
          <h2>凭据</h2>

          <div class="clearfix"></div>
        </div>
        <div class="x_content form-horizontal">
          <div class="form-group">
            <label class="col-xs-3 control-label">Token：</label>
            <div class="col-xs-9">
              <p class="control-text">afs323A23Afe3g</p>
            </div>
          </div>

          <div class="form-group">
            <label class="col-xs-3 control-label">Secrect：</label>
            <div class="col-xs-9">
              <p class="control-text">23rqlwekjrlkjll2kjijsdj</p>
            </div>
          </div>
        </div>
      </div>

      <div class="x_panel" v-if="step === 3">
        <div class="x_content text-center">
          <button class="btn btn-lg btn-primary">发布产品</button>
          <p>产品通过审核，成功发布后，功能将被锁定</p>
        </div>
      </div>
    </div>

    <template v-if="step === 1">
      <div class="col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>标准功能
              <button class="btn btn-xs btn-primary" @click="showStdFuncManager">管理</button>
            </h2>

            <portal to="modals" v-if="isShowingStdFuncManager">
              <ProductStdFuncManager ref="stdFuncManager"></ProductStdFuncManager>
            </portal>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <ProductStdFunc></ProductStdFunc>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>自定义功能
              <button class="btn btn-xs btn-primary" @click="showCreateCustomFuncModal">添加</button>
            </h2>

            <portal to="modals" v-if="isCreatingCustomFunc">
              <ProductFuncEditor mode="createCustom" ref="createCustomFuncModal"></ProductFuncEditor>
            </portal>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <ProductCustomFunc></ProductCustomFunc>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>数据
            <button class="btn btn-xs btn-primary" @click="showAddDataModal">添加</button>
          </h2>

          <portal to="modals" v-if="isShowingDataDefinition">
            <DataDefinitionEditor ref="dataDefinitionModal"></DataDefinitionEditor>
          </portal>

          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <ProductData></ProductData>
        </div>
      </div>
    </div>
    </template>

    <template v-else-if="step === 2">
      <div class="col-sm-8">
        <div class="x_panel">
          <div class="x_title">
            <h2>调试设备</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <div class="eva-media">
              <div class="eva-dev-device">
                <img src="http://fakeimg.pl/200x200/?text=Fake Photo">
                <h5>Wi-Fi 联网模块／型号：QWERSADF</h5>
                <button class="btn btn-lg btn-primary">购买开发设备</button> <!-- TODO:链接到淘宝 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="step === 3">
      <div class="col-sm-8">
        <div class="x_panel">
          <div class="x_title">
            <h2>购买模块</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content form-horizontal">
            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> 选择模块：</label>
              <div class="col-xs-10">
                <label class="eva-radio-label"><input type="radio" value="1" name="devicetype"> DEMOTYPE1</label>
                <label class="eva-radio-label"><input type="radio" value="2" name="devicetype"> DEMOTYPE2</label>
                <label class="eva-radio-label"><input type="radio" value="3" name="devicetype"> DEMOTYPE2</label>
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> 采购数量：</label>
              <div class="col-xs-10">
                <input class="form-control" type="text">
              </div>
            </div>

            <p class="eva-line-through eva-line-through__whitebg"><span>收货信息</span></p>

            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> 收货人姓名：</label>
              <div class="col-xs-10">
                <input class="form-control" type="text">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> 联系电话：</label>
              <div class="col-xs-10">
                <input class="form-control" type="text">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> 收货地址：</label>
              <div class="col-xs-10">
                <textarea class="form-control"></textarea>
              </div>
            </div>

            <div class="text-center">
              <a href="javascript:;" class="btn btn-lg btn-primary">提交采购申请</a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import $ from 'jquery'
  import ProductStdFuncManager from 'src/components/ProductStdFuncManager'
  import ProductBasicInfo from 'src/components/ProductBasicInfo'
  import ProductStdFunc from 'src/components/ProductStdFunc'
  import ProductCustomFunc from 'src/components/ProductCustomFunc'
  import ProductData from 'src/components/ProductData'
  import ProductFuncEditor from 'src/components/ProductFuncEditor'
  import DataDefinitionEditor from 'src/components/DataDefinitionEditor'
  import WizardSteps from 'src/components/common/WizardSteps'

  export default {
    name: 'ProductDetail',

    data () {
      return {
        isShowingStdFuncManager: false,
        isCreatingCustomFunc: false,
        isShowingDataDefinition: false,
        step: 1
      }
    },

    methods: {
      showStdFuncManager () {
        const vm = this
        this.isShowingStdFuncManager = true
        setTimeout(() => {
          $(this.$refs.stdFuncManager.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isShowingStdFuncManager = false
          })
        }, 0)
      },

      showCreateCustomFuncModal () {
        const vm = this
        this.isCreatingCustomFunc = true
        setTimeout(() => {
          $(this.$refs.createCustomFuncModal.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isCreatingCustomFunc = false
          })
        })
      },

      showAddDataModal () {
        const vm = this
        this.isShowingDataDefinition = true
        setTimeout(() => {
          $(this.$refs.dataDefinitionModal.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isShowingDataDefinition = false
          })
        })
      }
    },

    props: {
      pid: {
        required: true,
        type: String
      }
    },

    components: {
      ProductBasicInfo,
      ProductStdFunc,
      ProductCustomFunc,
      ProductData,
      ProductStdFuncManager,
      ProductFuncEditor,
      DataDefinitionEditor,
      WizardSteps
    }
  }
</script>

<style lang="scss">
  .eva-dev-device {
    text-align: center;
  }
</style>
