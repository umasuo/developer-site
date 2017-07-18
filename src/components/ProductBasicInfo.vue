<template>
  <div v-if="product">
    <template v-if="state === 'viewer'">
      <div class="eva-product-basic-info-media">
        <img class="eva-product-basic-info-media__media" :src="product.icon">

        <div class="eva-product-basic-info-media__content">
          <h3>{{ product.name }} <button class="btn btn-xs btn-default" @click="state = 'editor'" v-if="!viewOnly">编辑产品信息</button></h3>

          <p>
            <span class="label label-default">PID: {{ product.id }}</span>
            <span class="label label-default" v-if="productType">类型: {{ productType.name }}</span>
            <span class="label label-default">传输类型: {{ product.type }}</span>
            <span class="label label-default">状态: {{ product.status }}</span>
          </p>
        </div>
      </div>

      <dl>
        <template>
          <dt>产品型号:</dt>
          <dd v-if="product.model">{{ product.model }}</dd>
          <dd v-else>未设置</dd>
        </template>

        <template>
          <dt>固件版本:</dt>
          <dd v-if="product.firmwareVersion">{{ product.firmwareVersion }}</dd>
          <dd v-else>未设置</dd>
        </template>

        <template>
          <dt>模组型号:</dt>
          <dd v-if="product.wifiModule">{{ product.wifiModule }}</dd>
          <dd v-else>未设置</dd>
        </template>

        <template>
          <dt>产品备注:</dt>
          <dd v-if="product.description">{{ product.description }}</dd>
          <dd v-else>无</dd>
        </template>
      </dl>
    </template>

    <template v-if="state === 'editor'">
      <form class="form-horizontal eva-product-basic-info-editor">
        <div class="form-group">
          <label class="control-label col-xs-3">图标：</label>
          <div class="col-xs-9">
            <!-- TODO: 上传图片 -->
            <ImageUploader :imgSrc="productBasicInfo.icon"></ImageUploader>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">产品名：</label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.name">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">类型：</label>
          <div class="col-xs-9 eva-product-basic-info-editor__readonly">
            {{ productType.name }}
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">PID：</label>
          <div class="col-xs-9 eva-product-basic-info-editor__readonly">
            {{ productBasicInfo.id }}
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">传输类型：</label>
          <div class="col-xs-9 eva-product-basic-info-editor__readonly">
            {{ productBasicInfo.type }}
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">产品型号：</label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.model" placeholder="可按产品实际型号输入">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">固件版本：</label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.firmwareVersion" placeholder="请填写产品的固件版本信息">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">模组型号：</label>
          <div class="col-xs-9">
            <select class="form-control"  v-model="productBasicInfo.wifiModule">
              <option value="null">未设置</option>
              <option value="1">ABC-01</option>
              <option value="2">ABC-02</option>
              <option value="3">ABC-03</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">产品备注：</label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.description" placeholder="如产品特点，销售地区，创建人等">
          </div>
        </div>

        <button type="submit" class="btn btn-primary" @click.prevent="updateAndBackToViewer">保存</button>
        <button type="button" class="btn btn-default" @click.prevent="cancel">取消</button>
      </form>
    </template>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import api from 'src/api'
  import ImageUploader from 'src/components/common/ImageUploader'

  export default {
    name: 'ProductBasicInfo',

    props: {
      product: Object,
      viewOnly: {
        default: false,
        type: Boolean
      }
    },

    data () {
      return {
        state: 'viewer',
        editingProductBasicInfo: null
      }
    },

    computed: {
      productType () {
        return this.$store.getters.getProductTypeById(this.product.productTypeId)
      },

      productBasicInfo: {
        get () {
          return this.editingProductBasicInfo || Object.assign({}, this.product)
        },
        set (product) {
          this.editingProductBasicInfo = Object.assign({}, product)
        }
      }
    },

    created () {
      this.fetchProductTypes()
      this.fetchProducts()
    },

    methods: {
      ...mapActions(['fetchProductTypes', 'fetchProducts', 'updateProduct']),

      updateAndBackToViewer () {
        const updateAction =
          // elegant way to get a subset of a object
          // https://stackoverflow.com/a/39333479/2202891
          (({name, description, icon, openable, type, firmwareVersion, model, wifiModule}) =>
          ({action: 'updateProduct', name, description, icon, openable, type, firmwareVersion, model, wifiModule}))(this.productBasicInfo)

        this.updateProduct({
          product: this.product,
          request: api.buildRequest(this.product.version)
                      .addAction(updateAction)
                      .request
        })
        this.state = 'viewer'
      },

      cancel () {
        this.productBasicInfo = Object.assign({}, this.product)
        this.state = 'viewer'
      }
    },

    watch: {
      viewOnly (isViewOnly) {
        if (isViewOnly) {
          this.cancel()
        }
      }
    },

    components: {
      ImageUploader
    }
  }
</script>

<style lang="scss">
  .eva-product-basic-info-editor {
    width: 400px;

    &__readonly {
      padding-top: 8px;
    }
  }

  .eva-product-basic-info-media {
    &__media {
      float: left;
      margin-right: 15px;
      margin-top: 10px;
    }

    &__content {
      overflow: auto;
    }
  }
</style>
