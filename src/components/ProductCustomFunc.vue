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
          <a href="javascript:;">编辑</a>&nbsp;
          <a href="javascript:;">删除</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'ProductCustomFunc'
  }
</script>

<style lang="scss">
</style>
