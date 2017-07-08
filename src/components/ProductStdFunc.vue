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
      <tr>
        <th scope="row">2</th>
        <td>工作模式</td>
        <td>Mode</td>
        <td>可下发可上报</td>
        <td>枚举型</td>
        <td>枚举值auto, manual, smart, ECO</td>
        <td>
          <a href="javascript:;" @click="showEditor">编辑</a>

          <portal to="modals" v-if="isShowingEditor">
            <ProductFuncEditor mode="standard" ref="editor"></ProductFuncEditor>
          </portal>

          <a href="javascript:;">删除</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import $ from 'jquery'
  import ProductFuncEditor from 'src/components/ProductFuncEditor'

  export default {
    name: 'ProductStdFunc',

    data () {
      return {
        isShowingEditor: false
      }
    },

    methods: {
      showEditor () {
        const vm = this
        this.isShowingEditor = true
        setTimeout(() => {
          $(this.$refs.editor.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isShowingEditor = false
          })
        }, 0)
      }
    },

    components: {
      ProductFuncEditor
    }
  }
</script>

<style lang="scss">
</style>
