<template>
  <div class="x_panel" v-if="step === 3">
    <div class="x_content text-center">
      <!-- 开发中 -->
      <template v-if="product.status === 'DEVELOPING'">
        <button class="btn btn-lg btn-primary" @click="publishProduct(product)">发布产品</button>
        <p>产品审核过程中，以及成功发布后，功能都会被锁定</p>
        <p class="text-danger" v-if="message === 'publish fail'"><small>发布失败，请刷新重试</small></p>
      </template>

      <!-- 审核中 -->
      <template v-else-if="product.status === 'CHECKING'">
        <button class="btn btn-lg btn-primary">取消发布 (暂无）</button>
        <p>正在审核中，已经锁定产品所有功能</p>
      </template>

      <!-- 已发布 -->
      <template v-else-if="product.status === 'PUBLISHED'">
        <button class="btn btn-lg btn-primary" @click="revokeProduct(product)">下架</button>
        <p>注意：下架后无法再次上架，谨慎操作</p>
        <p class="text-danger" v-if="message === 'revoke fail'"><small>下架失败，请刷新重试</small></p>
      </template>

      <!-- 已下架 -->
      <template v-else-if="product.status === 'REVOKED'">
        <button class="btn btn-lg btn-primary" disabled>已下架</button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductStatusControls',

  props: ['product', 'step'],

  data () {
    return {
      message: ''
    }
  },

  methods: {
    ...mapActions(['publishProduct', 'revokeProduct']),

    async publish () {
      this.message = ''
      try {
        await this.publishProduct()
      } catch (e) {
        this.message = 'publish fail'
      }
    },

    async revoke () {
      this.message = ''
      try {
        await this.revokeProduct()
      } catch (e) {
        this.message = 'revoke fail'
      }
    }
  }
}
</script>

<style>
</style>
