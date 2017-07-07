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
              <div>
                <div class="form-group">
                  <label>产品:
                    <select class="form-control">
                      <option value="all" selected="selected">所有产品</option>
                      <option value="id1" >手环</option>
                      <option value="id2" >体重秤</option>
                    </select>
                  </label>
                </div>

                <div class="form-group">
                  <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox1" value="option1"> 是否激活
                  </label>
                </div>
              </div>

              <div>
                <div class="form-group">
                  <label>用户手机:
                    <input type="text" class="form-control"/>
                  </label>
                </div>
                <div class="form-group">
                  <label>出厂ID:
                    <input type="text" class="form-control"/>
                  </label>
                </div>
                <div class="form-group">
                  <label>设备ID:
                    <input type="text" class="form-control"/>
                  </label>
                </div>
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
            <h2>设备列表</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>设备图标</th>
                  <th>设备ID</th>
                  <th>出厂ID</th>
                  <th>所属产品</th>
                  <th>所属用户</th>
                  <th>激活状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png"/>
                  </td>

                  <td>123</td>

                  <td>123</td>

                  <td>手环</td>

                  <td>18507555555</td>

                  <td>未激活</td>
                </tr>

                <tr>
                  <td>
                    <img src="http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png"/>
                  </td>

                  <td>123</td>

                  <td>123</td>

                  <td>手环</td>

                  <td>18507555555</td>

                  <td>于 2017/7/5 激活</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div><!-- end of device list row -->
  </div>
</template>

<script>
  export default {
    name: 'DeviceInfo'
  }
</script>

<style lang="scss">
</style>
