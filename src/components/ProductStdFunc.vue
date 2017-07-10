<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>功能点</th>
        <th>标识符</th>
        <th>数据传输类型</th>
        <th>功能点类型</th>
        <th>功能点属性</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="func in product.functions">
        <th scope="row">{{ func.functionId }}</th>
        <td>{{ func.name }}</td>
        <td>Mode</td>
        <td>{{ func.transferType }}</td>
        <td>{{ func.dataType.type }}</td>
        <!-- TODO: need to make a computed property for this field -->
        <td>枚举值auto, manual, smart, ECO</td>
        <td>
          <a href="javascript:;" @click="showEditor">编辑</a>

          <portal to="modals" v-if="isShowingEditor">
            <ProductFuncEditor mode="standard" ref="editor"></ProductFuncEditor>
          </portal>

          <a href="javascript:;" @click="removeFunction(func.id)">删除</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import $ from 'jquery'
  import api from 'src/api'
  import { mapActions } from 'vuex'
  import ProductFuncEditor from 'src/components/ProductFuncEditor'

  export default {
    name: 'ProductStdFunc',

    props: ['product'],

    data () {
      return {
        isShowingEditor: false
      }
    },

    created () {
      console.dir(this.product)
    },

    methods: {
      ...mapActions(['updateProduct']),

      showEditor () {
        const vm = this
        this.isShowingEditor = true
        setTimeout(() => {
          $(this.$refs.editor.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isShowingEditor = false
          })
        }, 0)
      },

      removeFunction (functionId) {
        this.updateProduct({
          product: this.product,
          request: api.buildRequest(this.product.version)
                      .addAction({ action: 'removeFunction', functionIds: [functionId] })
                      .request
        })
      }
    },

    components: {
      ProductFuncEditor
    }
  }
</script>

<style lang="scss">
</style>
