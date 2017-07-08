<template>
  <!-- top navigation -->
  <div class="top_nav">
    <div class="nav_menu">
      <nav class="" role="navigation">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown"
               aria-expanded="false">
              {{ email }}
              <span class=" fa fa-angle-down"></span>
            </a>
            <ul class="dropdown-menu dropdown-usermenu pull-right">
              <li v-if="!isVerified">
                <a href="javascript:;" @click="reverifyEmail"> 重发验证邮件</a>

                <portal></portal>
                <portal to="modals" v-if="isShowingResentVerifyEmail">
                  <div class="modal fade" tabindex="-1" role="dialog" ref="resetVerifyEmailModal">
                    <div class="modal-dialog modal-sm" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <h4 class="modal-title" id="myModalLabel">发送成功</h4>
                        </div>
                        <div class="modal-body">
                          一封验证邮件已发送至您的邮箱。
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </portal>
              </li>
              <li>
                <!-- TODO: route link 到修改密码页面 -->
                <a href="javascript:;" @click="showChangePassword"> 修改密码</a>

                <portal to="modals" v-if="isShowingChangePassword">
                  <ChangePassword ref="changePasswordModal"></ChangePassword>
                </portal>
              </li>
              <li><a href="javascript:;" @click="signout"><i class="fa fa-sign-out pull-right"></i> 注销</a></li>
            </ul>
          </li>

          <!-- TODO: 暂不显示消息 -->
          <!--<li role="presentation" class="dropdown">-->
            <!--<a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">-->
              <!--<i class="fa fa-envelope-o"></i>-->
              <!--<span class="badge bg-green">1</span>-->
            <!--</a>-->
            <!--<ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">-->
              <!--<li>-->
                <!--<a>-->
                  <!--<span>-->
                    <!--<span><strong>系统</strong></span>-->
                    <!--<span class="time">3 分钟前</span>-->
                  <!--</span>-->
                  <!--<span class="message">-->
                    <!--数据分析模块开始公测-->
                  <!--</span>-->
                <!--</a>-->
              <!--</li>-->
              <!--<li>-->
                <!--<div class="text-center">-->
                  <!--<a>-->
                    <!--<strong>查看所有消息</strong>-->
                    <!--<i class="fa fa-angle-right"></i>-->
                  <!--</a>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</li>-->

          <li role="presentation" class="dropdown">
            <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-bell-o"></i>
              <span class="badge bg-red">1</span>
            </a>
            <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
              <li>
                <a>
                  <span>
                    <span><strong>"手环" 设备</strong></span>
                    <span class="time">3 分钟前</span>
                  </span>
                  <span class="message">
                    告警信息主题
                  </span>
                </a>
              </li>
              <li>
                <div class="text-center">
                  <router-link :to="{ name: 'MessageManager' }">
                    <strong>查看所有告警</strong>
                    <i class="fa fa-angle-right"></i>
                  </router-link>
                </div>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
    </div>
  </div>
  <!-- /top navigation -->
</template>

<script>
  import $ from 'jquery'
  import api from 'src/api'
  import ChangePassword from 'src/components/ChangePassword'

  export default {
    name: 'TopNav',

    data () {
      return {
        isShowingResentVerifyEmail: false,
        isShowingChangePassword: false
      }
    },

    computed: {
      isVerified () {
        return api.client.session.developerView.status === 'VERIFIED'
      },

      email () {
        return api.client.session.developerView.email
      }
    },

    methods: {
      async reverifyEmail () {
        await api.developer.reverifyEmail(api.client.session.developerView.id)
        this.isShowingResentVerifyEmail = true
        const vm = this
        setTimeout(() => {
          $(this.$refs.resetVerifyEmailModal).modal('show').on('hidden.bs.modal', () => {
            vm.isShowingResentVerifyEmail = false
          })
        }, 0)
      },

      showChangePassword () {
        this.isShowingChangePassword = true
        const vm = this
        setTimeout(() => {
          $(this.$refs.changePasswordModal.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isShowingChangePassword = false
          })
        }, 0)
      },

      signout () {
        api.developer.signout()
        this.$router.push({name: 'Signin'})
      }
    },

    components: {
      ChangePassword
    }
  }
</script>

<style lang="scss">
</style>
