<template>
  <div class="eva-single-page-wrapper text-center">
    <form v-if="step === 1">
      <h1 class="eva-line-through-title">找回密码</h1>

      <div class="form-group">
        <input type="email"
               class="form-control"
               placeholder="请输入要找回密码的邮箱"
               v-model="request.email">
      </div>

      <p class="text-warning" v-if="request.state === 'success'">
        一封包含重置链接的邮件已经发送到您填写的邮箱，请查看邮件并跟随邮件内指引操作。
      </p>
      <p class="text-warning" v-else-if="request.state === 'Request failed with status code 404'">没有该邮箱的注册记录</p>
      <p class="text-warning" v-else-if="request.state !== ''">发生未知错误</p>

      <button class="btn btn-primary" @click.prevent="requestReset">发送重置密码链接</button>
    </form>

    <form v-else>
      <h1 class="eva-line-through-title">找回密码</h1>

      <div class="form-group">
        <p>您的邮箱是：gagagaga@gmail.com</p>
      </div>

      <div class="form-group">
        <input type="email" class="form-control" placeholder="请输入新密码" v-model="reset.password">
      </div>

      <div class="form-group">
        <input type="email" class="form-control" placeholder="请再次输入新密码" v-model="reset.repeatPassword">
      </div>

      <p class="text-warning" v-if="reset.state === 'repeat password not match'">两次密码输入不一致，请检查后再试</p>
      <p class="text-warning" v-else-if="reset.state === 'success'">
        密码重置成功，请
        <router-link :to="{name: 'Signin'}">重新登陆</router-link>
      </p>
      <p class="text-warning" v-else-if="reset.state === 'password not valid'">新密码格式错误，至少需要8位，包含小写字母及数字</p>
      <p class="text-warning" v-else-if="reset.state !== ''">发生未知错误</p>


      <button class="btn btn-primary" @click.prevent="doReset">重置密码</button>
    </form>
  </div>
</template>

<script>
  import api from 'src/api'

  export default {
    name: 'ResetPwd',

    data () {
      return {
        request: {
          email: '',
          state: ''
        },
        reset: {
          password: '',
          repeatPassword: '',
          state: ''
        }
      }
    },

    computed: {
      step () {
        // step 1: request reset pwd
        // step 2(or above): set new pwd
        return parseInt(this.$route.query.step) || 1
      }
    },

    methods: {
      async requestReset () {
        try {
          await api.developer.requestResetEmail(this.request.email)
          this.request.state = 'success'
          // TODO: demo link: http://localhost/v1/developers/reset-password?step=2    body: {token:'KPoW3a76swvB',newPassword:'a2222222',developerId:'asdf'}
          // http://localhost:8080/reset-pwd?step=2&token=KPoW3a76swvB&developerId=41b1ab1a-2caa-4305-874b-f6a06c69fdf5
        } catch (e) {
          console.dir(e)
          this.request.state = e.message
        }
      },

      async doReset () {
        this.reset.state = ''

        if (this.reset.password !== this.reset.repeatPassword) {
          this.reset.state = 'repeat password not match'
        }

        try {
          await api.developer.resetPassword(this.$route.query.developerId, this.$route.query.token, this.reset.password)
          api.developer
          this.reset.state = 'success'
        } catch (e) {
          console.dir(e)
          this.reset.state = e.message
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
