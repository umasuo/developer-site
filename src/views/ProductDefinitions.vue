<template>
  <div>
    <div class="row">
      <div class="col-sm-12">

        <div class="eva-create-product-wizard form_wizard wizard_horizontal">
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
            <button class="btn btn-lg btn-primary" @click="isShowCreateModal = true">创建产品</button>
            <p class="eva-create-product-wizard__line-through"><span>或快速创建</span></p>

            <ul class="eva-create-product-wizard__quick-prod">
              <li>
                <a href="javascript:;">开关</a>
              </li>
              <li>
                <a href="javascript:;">电灯</a>
              </li>
              <li>
                <a href="javascript:;">手环</a>
              </li>
              <li>
                <a href="javascript:;">空调</a>
              </li>
              <li>
                <a href="javascript:;">计步器</a>
              </li>
              <li>
                <a href="javascript:;">体重计</a>
              </li>
              <li>
                <a href="javascript:;">平衡车</a>
              </li>
              <li>
                <a href="javascript:;">空气净化器</a>
              </li>
            </ul>

            <ProductCreate :show="isShowCreateModal" @hide="isShowCreateModal = false"></ProductCreate>
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
                <ProductDefinitionRow></ProductDefinitionRow>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductDefinitionRow from '@/components/ProductDefinitionRow'
  import ProductCreate from '@/components/ProductCreate'

  export default {
    name: 'ProductDefinitions',

    data () {
      return {
        isShowCreateModal: false
      }
    },

    components: {
      ProductDefinitionRow,
      ProductCreate
    }
  }
</script>

<style lang="scss">
  .eva-create-product-wizard {
    margin: 40px 0;
    text-align: center;

    > .wizard_steps {
      padding-left: 0;
    }

    .stepContainer {
      margin-top: 50px;
    }

    &__line-through {
      margin: 20px auto 10px auto;
      width: 320px;
      border-top: 1px solid lighten(black, 20%);

      > span {
        background-color: #F7F7F7;
        position: relative;
        top: -10px;
        padding: 0 10px;
      }
    }

    &__quick-prod {
      text-align: center;
      list-style: none;
      padding: 0;

      > li {
        display: inline-block;
        margin: 10px;
      }
    }
  }
</style>
