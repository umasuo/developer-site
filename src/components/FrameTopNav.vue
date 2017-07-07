<template>
  <!-- top navigation -->
  <div class="top_nav">
    <div class="nav_menu">
      <nav class="" role="navigation">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown"
               aria-expanded="false">
              John Doe
              <span class=" fa fa-angle-down"></span>
            </a>
            <ul class="dropdown-menu dropdown-usermenu pull-right">
              <li>
                <!-- TODO: 只在没验证时显示 -->
                <a href="javascript:;"> 重发验证邮件</a>
              </li>
              <li>
                <!-- TODO: route link 到修改密码页面 -->
                <a href="javascript:;"> 修改密码</a>
              </li>
              <li><router-link :to="{ name: 'Login' }"><i class="fa fa-sign-out pull-right"></i> 注销</router-link></li>
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
  export default {
    name: 'TopNav'
  }
</script>

<style lang="scss">
</style>
