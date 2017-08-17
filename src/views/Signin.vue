<template>
  <div class="eva-single-page-wrapper">

    <transition name="fade">
      <div class="form login_form" v-show="!showRegister">
        <section class="login_content">
          <form>
            <h1 class="eva-line-through-title">{{$t('auth.login')}}</h1>
            <div>
              <input type="text" class="form-control" :placeholder="$t('auth.email')" v-model="signinData.email" required="" />
            </div>
            <div>
              <input type="password" class="form-control" :placeholder="$t('auth.pwd')" v-model="signinData.password" required="" />
            </div>

            <p class="text-warning" v-if="signinState === 'email not valid'">{{$t('auth.email_format_wrong')}}</p>
            <p class="text-warning" v-else-if="signinState === 'password not valid'">{{$t('auth.pwd_format_wrong')}}</p>
            <p class="text-warning" v-else-if="signinState === 'fetching'">{{$t('misc.pls_wait')}}</p>
            <p class="text-warning" v-else-if="signinState === 'Request failed with status code 404'">{{$t('auth.account_not_exist')}}</p>
            <p class="text-warning" v-else-if="signinState === 'Request failed with status code 401'">{{$t('auth.credential_wrong')}}</p>
            <p class="text-warning" v-else-if="signinState !== ''">{{$t('misc.unknow_error')}}</p>

            <div>
              <button class="btn btn-default submit" type="submit" @click.prevent="signin" :disabled="signinState === 'fetching'">{{$t('auth.login')}}</button>
              <router-link class="reset_pass" :to="{name: 'ResetPwd', query: {step: 1}}">{{$t('auth.forgot')}}</router-link>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <p class="change_link">{{$t('auth.no_account')}}
                <a href="#" class="to_register" @click.prevent="showRegister = true"> {{$t('auth.go_register')}} </a>
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
            <h1>{{$t('auth.register')}}</h1>
            <div>
              <input type="text" class="form-control" :placeholder="$t('auth.email')" v-model="signupData.email" required />
            </div>
            <div>
              <input type="password" class="form-control" :placeholder="$t('auth.pwd')" v-model="signupData.password" required />
            </div>
            <div>
              <input type="password" class="form-control" :placeholder="$t('auth.repeat_pwd')" v-model="signupData.repeatPassword" required />
            </div>

            <p class="text-warning" v-if="registerState === 'success'">{{$t('auth.go_verify_email')}}</p>
            <p class="text-warning" v-else-if="registerState === 'email not valid'">{{$t('auth.email_format_wrong')}}</p>
            <p class="text-warning" v-else-if="registerState === 'password not valid'">{{$t('auth.pwd_format_wrong')}}</p>
            <p class="text-warning" v-else-if="registerState === 'repeat password not match'">{{$t('auth.rpwd_not_match')}}</p>
            <p class="text-warning" v-else-if="registerState === 'fetching'">{{$t('misc.pls_wait')}}</p>
            <p class="text-warning" v-else-if="registerState === 'Request failed with status code 409'">{{$t('auth.email_taken')}}</p>
            <p class="text-warning" v-else-if="registerState !== ''">{{$t('misc.unknow_error')}}</p>

            <div>
              <button class="btn btn-default submit" type="submit" @click.prevent="register" :disabled="registerState === 'fetching'">{{$t('auth.register')}}</button>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <p class="change_link">{{$t('auth.has_account')}}
                <a href="#" class="to_register" @click.prevent="showRegister = false"> {{$t('auth.login')}} </a>
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

    created () {
      if (api.client.isAuthorized) {
        this.$router.replace({name: 'Dashboard'})
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
          console.dir(e)
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
