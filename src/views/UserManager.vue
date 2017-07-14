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
                  <input type="text" class="form-control" v-model="id"/>
                </label>
              </div>
              <div class="form-group">
                <label>用户手机:
                  <input type="text" class="form-control" v-model="phone"/>
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
                <tr v-for="user in users">
                  <td>{{ user.userId }}</td>
                  <td>{{ user.phone }}</td>
                  <td>{{ formatTime(user.registerTime) }}</td>
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
  import { mapState } from 'vuex'
  import api from 'src/api'
  import moment from 'moment'

  export default {
    name: 'UserManager',

    data () {
      return {
        phone: null,
        id: null,

        users: null
      }
    },

    computed: {
      ...mapState(['timezone'])
    },

    created () {
      this.fetchUsers()
    },

    methods: {
      async fetchUsers () {
        if (this.phone) {
          this.users = await api.user.fetchUserByPhone(this.phone)
        } else if (this.id) {
          this.users = await api.user.fetchUserByPhone(this.id)
        } else {
          this.users = await api.user.fetchUsers()
        }
      },

      formatTime (timestamp) {
        return moment(timestamp.toString(), 'x')
          .utcOffset(parseInt(this.timezone.substr(3)))
          .format('YYYY-MM-DD')
      }
    }
  }
</script>

<style lang="scss">
</style>
