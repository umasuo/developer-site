<template>
  <tr>
    <td>
      <img src="http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png"></img>
    </td>
    <td>
      产品名1
    </td>
    <td>
      手环
    </td>
    <td>
      产品介绍产品介绍产品介绍产品介绍。
    </td>
    <td>
      WIFI
    </td>
    <td>
       上线
    </td>
    <td>
      <router-link :to="{ name: 'ProductDetail', params: { pid: '123' } }" href="javascript:;">编辑</router-link>
      <a href="javascript:;">删除</a>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'ProductDefinitionRow'
  }
</script>

<style lang="scss">
  .product-row {
    &__name {
      border: solid white 1px;

      &:hover {
        border-color: lightgray;
      }

      &--editing {
        border-color: #aaa !important;
      }
    }
  }
</style>
