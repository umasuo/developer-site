<template>
  <div class="modal fade data-editor" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">{{ isAddingNew ? '新增数据定义' :`编辑"${editingDataDefinition.name}"` }}</h4>
        </div>
        <div class="modal-body">

          <form>
            <label>Data ID :</label>
            <input type="text" class="form-control" v-model="editingDataDefinition.dataId" required>

            <label>数据名 :</label>
            <input type="text" class="form-control" v-model="editingDataDefinition.name" required>

            <label>描述 :</label>
            <textarea class="form-control" v-model="editingDataDefinition.description" required></textarea>

            <label>数据定义 <small>(使用 <a href="http://json-schema.org/" target="_blank">JSON Schema</a> drafts-04 描述数据格式)</small> :</label>
            <div class="data-def-editor" ref="dataEditor">{{ JSON.stringify(editingDataDefinition.dataType, null, 2) }}</div>

            <button type="button" class="btn btn-primary" @click="checkSchemaAndGenerateJson">更新范例数据</button>
            <span v-if="errMsg">格式有误
              <a href="javascript:;" class="text-danger" @click="showErrMsg = !showErrMsg">显示详细错误信息</a>
            </span>

            <div>
              <textarea class="data-editor__err-msg" rows="10" v-if="errMsg && showErrMsg">
                {{ errMsg }}
              </textarea>
            </div>

            <div class="clear-fix"></div>

            <label>范例数据(根据定义随机生成) :</label>
            <textarea class="form-control data-editor__demo" v-model="demoJson" readonly></textarea>
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
  import brace from 'brace'
  import Ajv from 'ajv'
  import draft4 from 'ajv/lib/refs/json-schema-draft-04'
  import jsf from 'json-schema-faker'
  import 'brace/mode/json'
  import 'brace/theme/monokai'

  jsf.option({
    requiredOnly: false
  })

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
            id: 'node',
            type: 'object',
            properties: {
              title: {
                type: 'string'
              },
              sub_nodes: {
                type: 'array',
                items: {
                  '$ref': 'node'
                }
              }
            },
            required: ['title']
          }
        }
      }

      return {
        editingDataDefinition,
        isAddingNew,
        errMsg: null,
        showErrMsg: false,
        demoJson: ''
      }
    },

    mounted () {
      this.editor = brace.edit(this.$refs.dataEditor)
      this.editor.getSession().setMode('ace/mode/json')
      this.editor.setTheme('ace/theme/monokai')
    },

    methods: {
      finishEditing () {
        // TODO: Implement me
      },

      checkSchemaAndGenerateJson () {
        this.errMsg = null

        const schema = JSON.parse(this.editor.getValue())
        const ajv = new Ajv({allErrors: true})
        ajv.addMetaSchema(draft4)
        const valid = ajv.validateSchema(schema)

        if (!valid) {
          this.errMsg = ajv.errorsText(ajv.errors, { separator: '\n' }) + '\najv validateSchema errors:\n' +
            JSON.stringify(ajv.errors, null, 2)
        } else {
          this.editingDataDefinition.dataType = schema
          const result = jsf(schema)
          this.demoJson = JSON.stringify(result, null, 2)
        }
      }
    }
  }
</script>

<style lang="scss">
  .data-editor {
    &__err-msg {
      width: 100%;
      color: red;
    }

    textarea {
      resize: vertical;
    }

    &__demo {
      min-height: 150px;
    }
  }

  .data-def-editor {
    min-height: 250px;
    resize: vertical;
    overflow: auto;
    margin-bottom: 4px;

    span {
      line-height: 16px;
    }
  }
</style>
