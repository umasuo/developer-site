<template>
  <div class="login">
    <div>
      <div class="login_wrapper">

        <transition name="fade">
          <div class="form login_form" v-show="!showRegister">
            <section class="login_content">
              <form>
                <h1>登陆</h1>
                <div>
                  <input type="text" class="form-control" placeholder="用户名" required="" />
                </div>
                <div>
                  <input type="password" class="form-control" placeholder="密码" required="" />
                </div>
                <div>
                  <a class="btn btn-default submit" href="javascript:;" @click="login">登陆</a>
                  <a class="reset_pass" href="javascript:;">忘记密码？</a>
                </div>

                <div class="clearfix"></div>

                <div class="separator">
                  <p class="change_link">还没有账户？
                      <a href="#signup" class="to_register" @click.prevent="showRegister = true"> 注册一个 </a>
                  </p>

                  <div class="clearfix"></div>
                  <br />

                  <div>
                    <h1><BrandIcon class="login-brand-icon" /> Eva Cloud</h1>
                    <!--<p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>-->
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
                  <input type="text" class="form-control" placeholder="用户名" required="" />
                </div>
                <div>
                  <input type="email" class="form-control" placeholder="邮箱地址" required="" />
                </div>
                <div>
                  <input type="password" class="form-control" placeholder="密码" required="" />
                </div>
                <div>
                  <a class="btn btn-default submit" href="index.html">注册</a>
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
                    <!--<p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>-->
                  </div>
                </div>
              </form>
            </section>
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>

<script>
  import BrandIcon from '@/assets/brand.svg'

  export default {
    name: 'Login',

    data () {
      return {
        showRegister: false
      }
    },

    methods: {
      login () {
        // TODO: login user
        this.$router.replace({ name: 'Dashboard' })
      }
    },

    components: {
      BrandIcon
    }
  }
</script>

<style lang="scss">
  .login {
    overflow: auto;
  }

  .login_wrapper {
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    background: #F7F7F7;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
</style>
