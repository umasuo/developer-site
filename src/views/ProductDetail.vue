<template>
  <div class="row">

    <div class="col-sm-12">
      <div class="x_panel">
        <div class="x_content">
          <ProductBasicInfo></ProductBasicInfo>
        </div>
      </div>
    </div>

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
            <button class="btn btn-xs btn-primary">添加</button>
          </h2>

          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <ProductData></ProductData>
        </div>
      </div>
    </div>

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

  export default {
    name: 'ProductDetail',

    data () {
      return {
        isShowingStdFuncManager: false,
        isCreatingCustomFunc: false
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
      ProductFuncEditor
    }
  }
</script>

<style lang="scss">
</style>
