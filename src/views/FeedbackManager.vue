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
                      <!-- <option value="id1" >手环</option>
                      <option value="id2" >体重秤</option> -->
                    </select>
                  </label>
                </div>

                <div class="form-group">
                  <label>反馈类型:
                    <select class="form-control">
                      <option value="all" selected="selected">所有类型</option>
                      <option value="id1" >咨询</option>
                      <option value="id2" >感谢</option>
                      <option value="id2" >投诉</option>
                      <option value="id2" >报错</option>
                    </select>
                  </label>
                </div>

                <div class="form-group">
                  <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox1" value="option1"> 是否已处理
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
                  <th>反馈类型</th>
                  <th>设备ID</th>
                  <!-- TODO: show this -->
                  <!-- <th>设备类型</th> -->
                  <th>标题</th>
                  <th>反馈时间</th>
                  <!-- TODO: show this -->
                  <!-- <th>处理人员</th> -->
                  <th>处理时间</th>
                  <!-- <th>状态</th> -->
                  <!-- <th>操作</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="feedback in feedbacks" :key="feedback.id">
                  <td>{{ feedback.phone }}</td>
                  <td>{{ feedback.type | formatFeedbackType }}</td>
                  <td>{{ feedback.deviceId }}</td>
                  <!-- <td> </td> -->
                  <td>{{ feedback.title }}</td>
                  <td>{{ formatFeedbackDate(feedback.createdAt) }}</td>
                  <!-- <td>admin</td> -->
                  <td>{{ formatFeedbackDate(feedback.lastModifiedAt) }}</td>
                  <!-- <td>{{ feedback.developerStatus }}</td> -->
                  <!-- TODO: 完成处理反馈 modal-->
                  <!-- <td><a href="javascript:;">处理反馈</a></td> -->
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
  import api from 'src/api'
  import moment from 'moment'
  import { mapState } from 'vuex'

  export default {
    name: 'FeedbackManager',

    data () {
      return {
        feedbacks: []
      }
    },

    computed: {
      ...mapState(['timezone'])
    },

    created () {
      this.fetchFeedbacks()
    },

    methods: {
      async fetchFeedbacks () {
        this.feedbacks = await api.feedback.fetchFeedbacks()
      },

      formatFeedbackDate (timestamp) {
        return moment(timestamp.toString(), 'x')
          .utcOffset(parseInt(this.timezone.substr(3)))
          .format('YYYY-MM-DD HH:mm:ss')
      }
    },

    filters: {
      formatFeedbackType (type) {
        switch (type) {
          case 'QUESTION': return '咨询'
          case 'THANKS': return '感谢'
          case 'COMPLAIN': return '投诉'
          case 'ERROR': return '报错'
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
