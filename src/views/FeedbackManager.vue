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
                  <label>反馈类型:
                    <select class="form-control">
                      <option value="all" selected="selected">所有类型</option>
                      <option value="id1" >类型1</option>
                      <option value="id2" >类型2</option>
                    </select>
                  </label>
                </div>

                <div class="form-group">
                  <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox1" value="option1"> 是否处理
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

    <div class="clearfix"></div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>用户反馈列表</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>用户手机</th>
                  <th>设备ID</th>
                  <th>设备类型</th>
                  <th>标题</th>
                  <th>反馈时间</th>
                  <th>处理人员</th>
                  <th>处理时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>18507555555</td>
                  <td>123</td>
                  <td>手环</td>
                  <td>手环屏幕无法点亮</td>
                  <td>2017/7/5 下午3:18:14</td>
                  <td>admin</td>
                  <td>2017/7/5 下午3:18:15</td>
                  <td>已处理</td>
                  <!-- TODO: 完成处理反馈 modal-->
                  <td><a href="javascript:;">处理反馈</a></td>
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
    name: 'FeedbackManager'
  }
</script>

<style lang="scss">
</style>
