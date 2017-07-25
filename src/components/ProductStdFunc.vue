<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>功能点</th>
        <th>数据传输类型</th>
        <th>功能点类型</th>
        <th>功能点属性</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(func, index) in stdFuncs">
        <th scope="row">{{ func.functionId }}</th>
        <td>{{ func.name }}</td>
        <td>{{ func.transferType | stringifyTransferType }}</td>
        <td>{{ func.dataType | stringifyDataType }}</td>
        <td>{{ func.dataType | stringifyDataTypeValue }}</td>
        <td>
          <a href="javascript:;" @click="showEditor(index)" v-if="!viewOnly">编辑</a>
          <a href="javascript:;" @click="removeFunction(func.id)" v-if="!viewOnly">删除</a>
          <a href="javascript:;" @click="showEditor(index)" v-else>查看</a>

          <portal to="modals" v-if="isShowingEditor && (showingEditorIndex === index)">
            <ProductFuncEditor mode="standard" id="product-std-func-editor" :product="product" :func="func" :viewOnly="viewOnly"></ProductFuncEditor>
          </portal>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import $ from 'jquery'
  import mixin from 'src/components/ProductFuncMixins'
  import api from 'src/api'
  import { mapActions } from 'vuex'
  import ProductFuncEditor from 'src/components/ProductFuncEditor'

  export default {
    name: 'ProductStdFunc',

    mixins: [mixin],

    props: ['product', 'viewOnly'],

    data () {
      return {
        isShowingEditor: false,
        showingEditorIndex: -1
      }
    },

    computed: {
      stdFuncs () {
        return this.product.functions.filter(func => {
          return func.category === 'PLATFORM'
        })
      }
    },

    methods: {
      ...mapActions(['updateProduct']),

      showEditor (index) {
        const vm = this
        this.isShowingEditor = true
        this.showingEditorIndex = index
        setTimeout(() => {
          $('#product-std-func-editor').modal('show').on('hidden.bs.modal', () => {
            vm.isShowingEditor = false
            vm.showingEditorIndex = -1
          })
        }, 0)
      },

      async removeFunction (functionId) {
        try {
          await this.updateProduct({
            product: this.product,
            request: api.buildRequest(this.product.version)
                        .addAction({ action: 'removeFunction', functionIds: [functionId] })
                        .request
          })
        } catch (e) {
          alert('出现错误，删除操作失败')
        }
      }
    },

    filters: {
      stringifyDataType (dataType) {
        switch (dataType.type) {
          case 'enum':
            return '枚举值：' + dataType.values.join(',')
          case 'value':
            return `数值：从${dataType.startValue}到${dataType.endValue}，间隔${dataType.interval}，倍数${dataType.multiple}` +
              (dataType.unit && ('单位' + dataType.unit))
          case 'boolean':
            return '布尔值'
          case 'string':
            return '字符串'
        }
      }
    },

    components: {
      ProductFuncEditor
    }
  }
</script>

<style lang="scss">
</style>
