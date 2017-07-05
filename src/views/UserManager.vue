<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>过滤条件</h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <form class="form-inline">
              <div class="form-group">
                <label>用户ID:
                  <input type="text" class="form-control"/>
                </label>
              </div>
              <div class="form-group">
                <label>用户手机:
                  <input type="text" class="form-control"/>
                </label>
              </div>

              <button type="submit" class="btn btn-default">搜索</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>用户列表</h2>

            <div class="clearfix"></div>

          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>用户 ID</th>
                  <th>用户手机</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123</td>
                  <td>18507555555</td>
                  <td>2017/7/5 下午2:17:00</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserManager'
  }
</script>

<style lang="scss">
</style>
