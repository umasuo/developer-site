<template>
  <div>
    <div class="page-title">
      <div class="title_left">
        <h3>数据定义</h3>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>数据定义列表</h2>

            <ul class="nav navbar-right panel_toolbox">
              <li>
                <a class="collapse-link" @click="addNewData"><i class="fa fa-plus"></i> 新增数据定义</a>
                <DataDefinitionEditor ref="addNewEditor"></DataDefinitionEditor>
              </li>
            </ul>

            <div class="clearfix"></div>

          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>名称</th>
                  <th>简介</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <DataDefinitionRow v-for="dataDefinition in dataDefinitions"
                                     :dataDefinition="dataDefinition"
                                     :key="dataDefinition.dataId"
                                     @removeDataDefinition="removeDataDefinition"
                                     @updateDataDefinition="updateDataDefinition">
                </DataDefinitionRow>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import DataDefinitionEditor from '@/components/DataDefinitionEditor'
  import DataDefinitionRow from '@/components/DataDefinitionRow'

  export default {
    name: 'DataDefinitions',

    data () {
      return {
        dataDefinitions: [
          {
            developerId: 'developer1',
            dataId: 'sh001',
            name: '手环步数概要',
            description: '手环步数概要数据',
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
        ]
        // end of dataDefinitions
      }
    },

    methods: {
      addNewData () {
        $(this.$refs.addNewEditor.$el).modal('show')
      },

      removeDataDefinition (data) {
        const index = this.dataDefinitions.indexOf(data)
        this.dataDefinitions.splice(index, 1)
      },

      updateDataDefinition (updatingData) {
        let index = -1
        this.dataDefinitions.filter((data, curIndex) => {
          if (data.id === updatingData.id) {
            index = curIndex
          }
        })
        if (index !== -1) {
          this.dataDefinitions[index] = Object.assign({}, updatingData)
        }
      }
    },

    components: {
      DataDefinitionRow,
      DataDefinitionEditor
    }
  }
</script>

<style lang="scss">
</style>
