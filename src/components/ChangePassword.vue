<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <form>
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title">修改密码</h4>
          </div>

          <div class="modal-body">
            <div class="eva-change-password-form">
              <p class="text-success" v-if="state === 'success'">修改密码成功！</p>
              <p class="text-warning" v-else-if="state === 'repeat password not match'">两次密码输入不一致，请检查后再试</p>
              <p class="text-warning" v-else-if="state === 'password not valid'">密码格式错误，至少需要8位，包含小写字母及数字</p>
              <p class="text-warning" v-else-if="state !== ''">发生未知错误，请刷新后重试</p>

              <div class="form-group">
                <label>
                  旧密码：<input class="form-control" type="password" v-model="oldPassword" placeholder="请输入旧密码">
                </label>
              </div>

              <div class="form-group">
                <label>
                  新密码：<input class="form-control" type="password" v-model="newPassword" placeholder="请输入新密码">
                </label>
              </div>

              <div class="form-group">
                <label>
                  重复新密码：<input class="form-control" type="password" v-model="repeatNewPassword" placeholder="请再次输入新密码">
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click.prevent="changePassword">修改</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
  import utils from 'src/utils'
  import api from 'src/api'

  export default {
    name: 'ChangePassword',

    data () {
      return {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        state: ''
      }
    },

    methods: {
      async changePassword () {
        this.state = ''

        try {
          if (this.newPassword !== this.repeatNewPassword) {
            this.state = 'repeat password not match'
            return
          } else if (!utils.validatePassword(this.oldPassword) || !utils.validatePassword(this.newPassword)) {
            this.state = 'password not valid'
            return
          }

          await api.developer.changePassword(this.oldPassword, this.newPassword)
          this.$store.commit('setDeveloper', api.client.session.developerView)
          this.state = 'success'
        } catch (e) {
          this.state = e.message
        } finally {
          this.newPassword = ''
          this.repeatNewPassword = ''
        }
      }
    }
  }
</script>

<style lang="scss">
  .eva-change-password-form {
    width: 200px;
    margin: 0 auto;
  }
</style>
