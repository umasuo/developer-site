<template>
  <div>
    <div class="page-title">
      <div class="title_left">
        <h3>用户反馈</h3>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>用户反馈列表</h2>

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
                  <th>用户ID</th>
                  <th>设备类型</th>
                  <th>设备ID</th>
                  <th>反馈标题</th>
                  <th>内容</th>
                  <th>反馈时间</th>
                  <th>处理人员</th>
                  <th>处理时间</th>
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
  import DataDefinitionEditor from '@/components/data/DataDefinitionEditor'
  import DataDefinitionRow from '@/components/data/DataDefinitionRow'

  export default {
    name: 'FeedbackManager',

    data () {
      return {
        dataDefinitions: [
          {
            developerId: 'developer1',
            dataId: 'sh001',
            name: '手环步数概要',
            description: '手环步数概要数据',
            dataType: {
              id: 'node',
              type: 'object',
              properties: {
                title: {
                  type: 'string'
                },
                sub_node: {
                  '$ref': 'node'
                }
              }
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
