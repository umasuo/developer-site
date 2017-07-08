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

            <p class="text-warning" v-if="signinState === 'email not valid'">邮箱格式错误，请检查后再试</p>
            <p class="text-warning" v-else-if="signinState === 'password not valid'">密码格式错误，至少需要8位，包含小写字母及数字</p>
            <p class="text-warning" v-else-if="signinState === 'fetching'">请稍候...</p>
            <p class="text-warning" v-else-if="signinState === 'Request failed with status code 404'">用户不存在</p>
            <p class="text-warning" v-else-if="signinState === 'Request failed with status code 401'">邮箱或密码错误</p>
            <p class="text-warning" v-else-if="signinState !== ''">未知错误</p>

            <div>
              <button class="btn btn-default submit" type="submit" @click.prevent="signin" :disabled="signinState === 'fetching'">登陆</button>
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

            <p class="text-warning" v-if="registerState === 'success'">一封包含验证链接的邮件已经发送到您填写的邮箱，请查看邮件并跟随邮件内指引操作。</p>
            <p class="text-warning" v-else-if="registerState === 'email not valid'">邮箱格式错误，请检查后再试</p>
            <p class="text-warning" v-else-if="registerState === 'password not valid'">密码格式错误，至少需要8位，包含小写字母及数字</p>
            <p class="text-warning" v-else-if="registerState === 'fetching'">请稍候...</p>
            <p class="text-warning" v-else-if="registerState === 'Request failed with status code 409'">该邮箱已经注册</p>
            <p class="text-warning" v-else-if="registerState !== ''">未知错误</p>

            <div>
              <button class="btn btn-default submit" type="submit" @click.prevent="register" :disabled="registerState === 'fetching'">注册</button>
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
        registerState: '',
        signinState: '',

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
        this.signinState = ''
        if (!utils.validateEmail(this.signinData.email)) {
          this.signinState = 'email not valid'
          return
        } else if (!utils.validatePassword(this.signinData.password)) {
          this.signinState = 'password not valid'
          return
        }

        this.signinState = 'fetching'
        try {
          await api.developer.signin(this.signinData.email, this.signinData.password)
          this.$store.commit('setDeveloper', api.client.session.developerView)
          this.$router.replace({ name: 'Dashboard' })
        } catch (e) {
          console.dir()
          this.signinState = e.message
        }
      },

      async register () {
        this.registerState = ''
        if (!utils.validateEmail(this.signupData.email)) {
          this.registerState = 'email not valid'
          return
        } else if (this.signupData.password !== this.signupData.repeatPassword) {
          this.registerState = 'repeat password not match'
          return
        } else if (!utils.validatePassword(this.signupData.password)) {
          this.registerState = 'password not valid'
          return
        }

        this.registerState = 'fetching'
        try {
          await api.developer.signup(this.signupData.email, this.signupData.password)
          this.registerState = 'success'
        } catch (e) {
          console.dir(e)
          this.registerState = e.message
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
