import { parseTpl } from 'src/utils'

export default {
  methods: {
    stringifyDataTypeValue (dataType) {
      switch (dataType.type) {
        case 'enum':
          return this.$t('product_definition.func.datatype.enum') +
                 ': ' + dataType.values.join(',')
        case 'value':
          return parseTpl(this.$t('product_definition.func.datatype.value_1', {
            dataType
          })) +
          (dataType.unit ? (this.$t('misc.unit') + dataType.unit) : '')
        case 'boolean':
          return this.$t('product_definition.func.datatype.bool')
        case 'string':
          return this.$t('product_definition.func.datatype.string')
      }
    },

    stringifyTransferType (transferType) {
      switch (transferType) {
        case 'UP':
          return '只上报'
        case 'DOWN':
          return '只下发'
        case 'UPDOWN':
          return '可上报可下发'
      }
    },

    stringifyDataType (dataType) {
      switch (dataType.type) {
        case 'enum':
          return this.$t('product_definition.func.datatype.enum')
        case 'value':
          return this.$t('product_definition.func.datatype.value')
        case 'boolean':
          return this.$t('product_definition.func.datatype.bool')
        case 'string':
          return this.$t('product_definition.func.datatype.string')
      }
    }
  }
}
