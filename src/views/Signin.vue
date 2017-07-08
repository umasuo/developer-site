<template>
  <div class="eva-single-page-wrapper">

    <transition name="fade">
      <div class="form login_form" v-show="!showRegister">
        <section class="login_content">
          <form>
            <h1 class="eva-line-through-title">登陆</h1>
            <div>
              <input type="text" class="form-control" placeholder="邮箱" v-model="signinData.email" required="" />
            </div>
            <div>
              <input type="password" class="form-control" placeholder="密码" v-model="signinData.password" required="" />
            </div>
            <p class="text-warning" v-if="signinMsg">{{signinMsg}}</p>
            <div>
              <button class="btn btn-default submit" type="submit" @click.prevent="signin">登陆</button>
              <!-- TODO: router link 到"请求重置密码"页面（填写邮箱，发送重置链接；点了链接进入"重置密码"页面） -->
              <router-link class="reset_pass" :to="{name: 'ResetPwd', query: {step: 1}}">忘记密码？</router-link>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <p class="change_link">还没有账户？
                <a href="#" class="to_register" @click.prevent="showRegister = true"> 注册一个 </a>
              </p>

              <div class="clearfix"></div>
              <br />

              <div>
                <h1>Eva Cloud</h1>
              </div>
            </div>
          </form>
        </section>
      </div>
    </transition>

    <transition name="fade">
      <div id="register" class="animate form registration_form" v-show="showRegister">
        <section class="login_content">
          <form>
            <h1>注册账号</h1>
            <div>
              <input type="text" class="form-control" placeholder="邮箱" v-model="signupData.email" required />
            </div>
            <div>
              <input type="password" class="form-control" placeholder="密码" v-model="signupData.password" required />
            </div>
            <div>
              <input type="password" class="form-control" placeholder="重复密码" v-model="signupData.repeatPassword" required />
            </div>
            <p class="text-warning" v-if="registerMsg">{{registerMsg}}</p>
            <div>
              <button class="btn btn-default submit" type="submit" @click.prevent="register">注册</button>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <p class="change_link">已经有一个账号了?
                <a href="#" class="to_register" @click.prevent="showRegister = false"> 登陆 </a>
              </p>

              <div class="clearfix"></div>
              <br />

              <div>
                <h1>Eva Cloud</h1>
              </div>
            </div>
          </form>
        </section>
      </div>
    </transition>

  </div>
</template>

<script>
  import utils from 'src/utils'
  import api from 'src/api'

  export default {
    name: 'Signin',

    data () {
      return {
        showRegister: false,
        registerMsg: '',
        signinMsg: '',

        signinData: {
          email: '',
          password: ''
        },

        signupData: {
          email: '',
          password: '',
          repeatPassword: ''
        }
      }
    },

    methods: {
      async signin () {
        this.signinMsg = ''
        if (!utils.validateEmail(this.signinData.email)) {
          this.signinMsg = '邮箱格式错误，请检查后再试'
          return
        } else if (!utils.validatePassword(this.signinData.password)) {
          this.signinMsg = '密码格式错误，至少需要8位，包含小写字母及数字'
          return
        }

        this.signinMsg = '请稍候...'
        try {
          await api.developer.signin(this.signinData.email, this.signinData.password)
          this.$store.commit('setDeveloper', api.client.session.developerView)
          this.$router.replace({ name: 'Dashboard' })
        } catch (e) {
          // TODO: display different msg for errors
          console.dir(e)
          switch (e.message) {
            case 'Request failed with status code 404':
              this.signinMsg = '用户不存在'
              break
            case 'Request failed with status code 401':
              this.signinMsg = '邮箱或密码错误'
              break
          }
        }
      },

      async register () {
        this.registerMsg = ''
        if (!utils.validateEmail(this.signupData.email)) {
          this.registerMsg = '邮箱格式错误，请检查后再试'
          return
        } else if (this.signupData.password !== this.signupData.repeatPassword) {
          this.registerMsg = '两次密码输入不一致，请检查后再试'
          return
        } else if (!utils.validatePassword(this.signupData.password)) {
          this.registerMsg = '密码格式错误，至少需要8位，包含小写字母及数字'
          return
        }

        this.registerMsg = '请稍候...'
        try {
          await api.developer.signup(this.signupData.email, this.signupData.password)
          this.registerMsg = '一封包含验证链接的邮件已经发送到您填写的邮箱，请查看邮件并跟随邮件内指引操作。'
        } catch (e) {
          // TODO: display different msg for errors
          this.signinMsg = '登陆失败'
        }
      }
    },

    watch: {
      showRegister (willShow) {
        if (willShow) {
          this.signupData.email = ''
          this.signupData.repeatPassword = ''
          this.signupData.password = ''
        }
      }
    }
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
</style>
