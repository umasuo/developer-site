export default {
  filters: {
    stringifyDataTypeValue (dataType) {
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
          return '枚举值'
        case 'value':
          return '数值'
        case 'boolean':
          return '布尔值'
        case 'string':
          return '字符串'
      }
    }
  }
}
