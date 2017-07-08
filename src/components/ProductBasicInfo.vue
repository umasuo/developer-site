<template>
  <div>
    <template v-if="state === 'viewer'">
      <div class="eva-product-basic-info-media">
        <img class="eva-product-basic-info-media__media" src="http://fakeimg.pl/64x64/">

        <div class="eva-product-basic-info-media__content">
          <h3>产品名 <button class="btn btn-xs btn-default" @click="state = 'editor'">编辑产品信息</button></h3>

          <p>
            <span class="label label-default">PID: 123</span>
            <span class="label label-default">类型: 冰箱</span>
            <span class="label label-default">传输类型: WIFI</span>
            <span class="label label-default">状态: 开发中</span>
          </p>
        </div>
      </div>

      <dl>
        <dt>产品型号:</dt>
        <dd>未设置</dd>
        <dt>模组型号:</dt>
        <dd>未设置</dd>
        <dt>产品备注:</dt>
        <dd>无</dd>
      </dl>
    </template>

    <template v-if="state === 'editor'">
      <form class="form-horizontal eva-product-basic-info-editor">
        <div class="form-group">
          <label class="control-label col-xs-3">图标：</label>
          <div class="col-xs-9">
            <ImageUploader imgSrc="http://fakeimg.pl/64x64/"></ImageUploader>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">产品名：</label>
          <div class="col-xs-9">
            <input class="form-control" type="text" value="产品名">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">类型：</label>
          <div class="col-xs-9 eva-product-basic-info-editor__readonly">
            冰箱
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">PID：</label>
          <div class="col-xs-9 eva-product-basic-info-editor__readonly">
            123
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">传输类型：</label>
          <div class="col-xs-9 eva-product-basic-info-editor__readonly">
            WIFI
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">产品型号：</label>
          <div class="col-xs-9">
            <input class="form-control" type="text" placeholder="可按产品实际型号输入">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">产品型号：</label>
          <div class="col-xs-9">
            <select class="form-control">
              <option value="">ABC-01</option>
              <option value="">ABC-02</option>
              <option value="">ABC-03</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">产品型号：</label>
          <div class="col-xs-9">
            <input class="form-control" type="text" placeholder="如产品特点，销售地区，创建人等">
          </div>
        </div>

        <button class="btn btn-primary" @click.prevent="updateAndBackToViewer">保存</button>
        <button class="btn btn-default" @click.prevent="state = 'viewer'">取消</button>
      </form>
    </template>
  </div>
</template>

<script>
  import ImageUploader from 'src/components/common/ImageUploader'

  export default {
    name: 'ProductBasicInfo',

    props: ['value'],

    data () {
      return {
        state: 'viewer'
      }
    },

    computed: {
      productBasicInfo () {
        return Object.assign({}, this.value)
      }
    },

    methods: {
      updateAndBackToViewer () {
        this.productBasicInfo = {}
        this.$emit('input', this.productBasicInfo)

        this.state = 'viewer'
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
