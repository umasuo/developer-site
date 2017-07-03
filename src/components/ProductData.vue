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
      <tr>
        <th scope="row">2</th>
        <td>温度</td>
        <td>冷冻室温度</td>
        <td>
          <a href="javascript:;" @click="showEditor">编辑</a>

          <portal to="modals" v-if="isShowingEditor">
            <DataDefinitionEditor ref="editor" :dataDefinition="{}"></DataDefinitionEditor>
          </portal>

          <a href="javascript:;">删除</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import $ from 'jquery'
  import DataDefinitionEditor from '@/components/DataDefinitionEditor'

  export default {
    name: 'ProductData',

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
      DataDefinitionEditor
    }
  }
</script>

<style lang="scss">
</style>
