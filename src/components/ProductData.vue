<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Data ID</th>
        <th>数据名</th>
        <th>描述</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in productDatas">
        <th scope="row">{{ data.dataId }}</th>
        <td>{{ data.name }}</td>
        <td>{{ data.description }}</td>
        <td>
          <a href="javascript:;" @click="showEditor">编辑</a>

          <portal to="modals" v-if="isShowingEditor">
            <DataDefinitionEditor id="product-data-editor" :product="product" :productData="data"></DataDefinitionEditor>
          </portal>

          <!-- TODO: remove confirm dialog -->
          <a href="javascript:;" @click="removeData(data.id)">删除</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  import api from 'src/api'
  import DataDefinitionEditor from 'src/components/DataDefinitionEditor'

  export default {
    name: 'ProductData',

    props: {
      mode: {
        required: true,
        type: String,
        default: 'stdData' // stdData or customData
      },

      product: {
        required: true,
        type: Object
      }
    },

    data () {
      return {
        isShowingEditor: false
      }
    },

    computed: {
      productDatas () {
        const category = this.mode === 'stdData' ? 'PLATFORM' : 'PRODUCT'
        const datas = this.product.dataDefinitions

        return datas.filter(data => {
          return data.category === category
        })
      }
    },

    methods: {
      ...mapActions(['updateProduct']),

      removeData (id) {
        this.updateProduct({
          product: this.product,
          request: api.buildRequest(this.product.version)
                      .addAction({action: 'removeDataDefinition', dataDefinitionId: id})
                      .request
        })
      },

      showEditor () {
        const vm = this
        this.isShowingEditor = true
        setTimeout(() => {
          $('#product-data-editor').modal('show').on('hidden.bs.modal', () => {
            vm.isShowingEditor = false
          })
        }, 0)
      }
    },

    components: {
      DataDefinitionEditor
    }
  }
</script>

<style lang="scss">
</style>
