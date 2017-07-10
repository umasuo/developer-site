<template>
  <div>
    <div class="row">
      <div class="col-sm-12">

        <div class="eva-wizard eva-wizard--create-product form_wizard wizard_horizontal">
          <ul class="wizard_steps anchor">
            <li>
              <span class="wizard_step selected">
                <span class="step_no">1</span>
                <span class="step_descr">
                  产品定义<br>
                </span>
              </span>
            </li>
            <li>
              <span class="wizard_step disabled">
                <span class="step_no">2</span>
                <span class="step_descr">
                  开发调试<br>
                </span>
              </span>
            </li>
            <li>
              <span class="wizard_step disabled">
                <span class="step_no">3</span>
                <span class="step_descr">
                  批量投产<br>
                </span>
              </span>
            </li>
          </ul>

          <div class="stepContainer">
            <button class="btn btn-lg btn-primary" @click="createProd()">创建产品</button>
            <p class="eva-line-through"><span>或快速创建</span></p>

            <ul class="eva-quick-prod">
              <li v-for="productType in recommandProductTypes">
                <a href="javascript:;" @click="createProd(productType)">{{productType.name}}</a>
              </li>
            </ul>

            <portal to="modals" v-if="isShowCreateModal">
              <ProductCreate ref="createProductModal"></ProductCreate>
            </portal>
          </div>
        </div><!-- End of eva-create-product-wizard -->

      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>产品列表</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">

            <table class="table">
              <thead>
              <!--<tr>-->
                <!--<th>产品icon</th>-->
                <!--<th>产品名称</th>-->
                <!--<th>产品类型</th>-->
                <!--<th>产品介绍</th>-->
                <!--<th>联网类型</th>-->
                <!--<th>是否开放</th>-->
                <!--<th>功能定义</th>-->
                <!--<th>数据定义</th>-->
                <!--<th>产品状态</th>-->
                <!--<th>操作</th>-->
              <!--</tr>-->
              <tr>
                <th>图标</th>
                <th>名称</th>
                <th>类型</th>
                <th>介绍</th>
                <th>联网类型</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
                <!--<ProductDefinitionRow v-for="product in products"></ProductDefinitionRow>-->
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import $ from 'jquery'
  import ProductDefinitionRow from 'src/components/ProductDefinitionRow'
  import ProductCreate from 'src/components/ProductCreate'

  export default {
    name: 'ProductDefinitions',

    data () {
      return {
        isShowCreateModal: false
      }
    },

    created () {
      this.fetchProductTypes()
      this.fetchProducts()
    },

    computed: {
      ...mapState(['productTypes']),
      ...mapGetters(['categorizedProductTypes']),

      recommandProductTypes () {
        if (!this.categorizedProductTypes || !this.categorizedProductTypes['大家电']) return []
        return this.categorizedProductTypes['大家电']
      }
    },

    methods: {
      ...mapActions(['fetchProductTypes', 'fetchProducts']),

      createProd (type) {
        this.isShowCreateModal = true
        const vm = this
        setTimeout(() => {
          if (type) {
            vm.$refs.createProductModal.curStep = 2
            vm.$refs.createProductModal.selectedType = type
          }
          $(vm.$refs.createProductModal.$el).modal('show').on('hidden.bs.modal', e => {
            vm.$refs.createProductModal.curStep = 1
            vm.$refs.createProductModal.selectedType = ''
            vm.isShowCreateModal = false
          })
        }, 0)
      }
    },

    components: {
      ProductDefinitionRow,
      ProductCreate
    }
  }
</script>

<style lang="scss">
  .eva-quick-prod {
    text-align: center;
    list-style: none;
    padding: 0;

    > li {
      display: inline-block;
      margin: 10px;
    }
  }
</style>
