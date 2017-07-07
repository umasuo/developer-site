<template>
  <div class="eva-single-page-wrapper">

    <transition name="fade">
      <div class="form login_form" v-show="!showRegister">
        <section class="login_content">
          <form>
            <h1 class="eva-line-through-title">登陆</h1>
            <div>
              <input type="text" class="form-control" placeholder="邮箱" required="" />
            </div>
            <div>
              <input type="password" class="form-control" placeholder="密码" required="" />
            </div>
            <div>
              <a class="btn btn-default submit" href="javascript:;" @click="login">登陆</a>
              <!-- TODO: router link 到"请求重置密码"页面（填写邮箱，发送重置链接；点了链接进入"重置密码"页面） -->
              <router-link class="reset_pass" :to="{name: 'ResetPwdRequest'}">忘记密码？</router-link>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <p class="change_link">还没有账户？
                <a href="#signup" class="to_register" @click.prevent="showRegister = true"> 注册一个 </a>
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
              <input type="text" class="form-control" placeholder="邮箱" required />
            </div>
            <div>
              <input type="password" class="form-control" placeholder="密码" required />
            </div>
            <div>
              <input type="password" class="form-control" placeholder="重复密码" required />
            </div>
            <p class="text-warning" v-if="registerMsg">{{registerMsg}}</p>
            <div>
              <a class="btn btn-default submit" href="javascript:;" @click="register">注册</a>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <p class="change_link">已经有一个账号了?
                  <a href="#signin" class="to_register" @click.prevent="showRegister = false"> 登陆 </a>
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
  export default {
    name: 'Login',

    data () {
      return {
        showRegister: false,
        registerMsg: ''
      }
    },

    methods: {
      login () {
        // TODO: login user
        this.$router.replace({ name: 'Dashboard' })
      },

      register () {
        this.registerMsg = '一封包含验证链接的邮件已经发送到您填写的邮箱，请查看邮件并跟随邮件内指引操作。'
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
