<template>
  <div class="row">

    <div class="col-sm-12">
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

    <div class="col-sm-12">
      <div class="x_panel">
        <div class="x_content">
          <ProductBasicInfo></ProductBasicInfo>
        </div>
      </div>
    </div>

    <template v-if="step === 1">
      <div class="col-sm-12">
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

    </template>
  </div>
</template>

<script>
  import $ from 'jquery'
  import ProductStdFuncManager from '@/components/ProductStdFuncManager'
  import ProductBasicInfo from '@/components/ProductBasicInfo'
  import ProductStdFunc from '@/components/ProductStdFunc'
  import ProductCustomFunc from '@/components/ProductCustomFunc'
  import ProductData from '@/components/ProductData'
  import ProductFuncEditor from '@/components/ProductFuncEditor'
  import DataDefinitionEditor from '@/components/DataDefinitionEditor'
  import WizardSteps from '@/components/common/WizardSteps'

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
</style>
