<template>
  <tr class="eva-product-definition-row">
    <td class="eva-product-definition-row__icon" style="width: 50px;">
      <img :src="product.icon"></img>
    </td>
    <td style="width: 200px;">
      {{ product.name }}
    </td>

    <template>
      <td style="width: 80px;" v-if="productType">
        {{ productType.name }}
      </td>
      <td style="width: 80px;" v-else>加载中...</td>
    </template>

    <td>
      <div class="eva-product-definition-row__desc">
        {{ product.description }} asdfasdfasdfasdfasdfa sdfasdfasdfas dfasdfadsfasdfasdfadaf sdasdfasdfasdfasdfas dfasdfasdfasd fasdfasdfasdfa dsfasdfasdfada fsdasdfasdfa sdfasdfasdfasdfasdfas dfasdfasdfasdfadsfasdfasdfadafsdasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfadsfasdfasdfadafsdasdf
      </div>
    </td>
    <td style="width: 80px;">
      {{ product.type }}
    </td>
    <td style="width: 80px;">
      {{ product.status }}
    </td>
    <td style="width: 100px;">
      <router-link :to="{ name: 'ProductDetail', params: { pid: product.id } }" href="javascript:;">编辑</router-link>
      <!-- TODO: confirm delete dialog -->
      <a href="javascript:;" @click="deleteProduct(product)">删除</a>
    </td>
  </tr>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'ProductDefinitionRow',

    props: ['product'],

    computed: {
      productType () {
        return this.$store.getters.getProductTypeById(this.product.productTypeId)
      }
    },

    created () {
      this.fetchProductTypes()
    },

    methods: {
      ...mapActions(['fetchProductTypes', 'deleteProduct'])
    }
  }
</script>

<style lang="scss">
  .eva-product-definition-row {
    width: 100%;

    &__icon {
      padding: 4px !important;
      img {
        height: 29px;
      }
    }

    &__desc {
      word-break: break-all;
      overflow: hidden;
      height: 21px;
    }
  }
</style>
