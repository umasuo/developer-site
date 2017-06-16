<template>
  <tr>
    <td>{{ dataDefinition.dataId }}</td>
    <td>{{ dataDefinition.name }}</td>
    <td>{{ dataDefinition.description }}</td>
    <td>
      <span>
        <a href="javascript:;" @click="openEditor">编辑</a>
        <DataDefinitionEditor ref="editor" :dataDefinition="dataDefinition"></DataDefinitionEditor>
      </span>
      <a href="javascript:;" @click="removeDataDefinition">删除</a>
    </td>
  </tr>
</template>

<script>
  import $ from 'jquery'
  import DataDefinitionEditor from '@/components/data/DataDefinitionEditor'

  export default {
    name: 'DataDefinitionRow',

    props: ['dataDefinition'],

    data () {
      return {

      }
    },

    methods: {
      editDataDefinition () {
        // TODO: implement me
        this.$emit('updateDataDefinition', this.dataDefinition)
      },

      removeDataDefinition () {
        // TODO: implement me
        this.$emit('removeDataDefinition', this.dataDefinition)
      },

      openEditor () {
        $(this.$refs.editor.$el).modal('show')
      }
    },

    components: {
      DataDefinitionEditor
    }
  }
</script>

<style lang="scss">
</style>
