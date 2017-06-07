<template>
  <div class="modal fade bs-example-modal-lg" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">{{ isAddingNew ? '新增数据定义' :`编辑"${editingDataDefinition.name}"` }}</h4>
        </div>
        <div class="modal-body">

          <form>
            <label for="dataId">ID :</label>
            <input type="text" id="dataId" class="form-control" v-model="editingDataDefinition.dataId" required>

            <label for="name">名称 :</label>
            <input type="text" id="name" class="form-control" v-model="editingDataDefinition.name" required>

            <label for="description">简介 :</label>
            <textarea id="description" class="form-control" v-model="editingDataDefinition.description" required></textarea>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="finishEditing">保存</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DataDefinitionEditor',

    props: ['dataDefinition'],

    data () {
      let isAddingNew = false
      let editingDataDefinition

      if (this.dataDefinition) {
        editingDataDefinition = Object.assign({}, this.dataDefinition)
      } else {
        isAddingNew = true

        editingDataDefinition = {
          developerId: 'developer1',
          dataId: 'newDataId',
          name: '范例数据定义',
          description: '范例数据定义，修改以创建新的数据定义',
          dataType: {
            key: 'root',
            type: 'type.object',
            subTypes: [
              {
                key: 'subObj',
                type: 'type.object',
                subTypes: [
                  {
                    key: 'name',
                    type: 'type.string'
                  }
                ]
              },
              {
                key: 'subArray',
                type: 'type.array',
                subType: {
                  type: 'type.string'
                }
              },
              {
                key: 'subNumber',
                type: 'type.number'
              }
            ]
          }
        }
      }

      return {
        editingDataDefinition,
        isAddingNew
      }
    },

    methods: {
      finishEditing () {
        // TODO: Implement me
      }
    }
  }
</script>

<style lang="scss">
</style>
