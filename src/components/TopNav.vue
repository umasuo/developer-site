<template>
  <!-- top navigation -->
  <div class="top_nav">
    <div class="nav_menu">
      <nav class="" role="navigation">
        <ul class="nav navbar-nav navbar-right">
          <li class="">
            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown"
               aria-expanded="false">
              John Doe
              <span class=" fa fa-angle-down"></span>
            </a>
            <ul class="dropdown-menu dropdown-usermenu pull-right">
              <li><a href="javascript:;"> 个人资料</a></li>
              <li>
                <a href="javascript:;">
                  <span>设置</span>
                </a>
              </li>
              <!--<li><a href="login.html"><i class="fa fa-sign-out pull-right"></i> 注销</a></li>-->
              <li><router-link :to="{ name: 'Login' }"><i class="fa fa-sign-out pull-right"></i> 注销</router-link></li>
            </ul>
          </li>

          <li role="presentation" class="dropdown">
            <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-envelope-o"></i>
              <span class="badge bg-green">1</span>
            </a>
            <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
              <li>
                <a>
                  <span class="image">
                    <!-- TODO: set a profile image -->
                    <img src="#" alt="Profile Image"/>
                  </span>
                  <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                  <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                </a>
              </li>
              <li>
                <div class="text-center">
                  <a>
                    <strong>See All Alerts</strong>
                    <i class="fa fa-angle-right"></i>
                  </a>
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
    name: 'TopNav',

    methods: {
      toggleMenu () {
        this.$store.dispatch('toggleNavMenuSize')
//        const $BODY = $('body')
//        const $SIDEBAR_MENU = $('#sidebar-menu')
//
//        if ($BODY.hasClass('nav-md')) {
//          $SIDEBAR_MENU.find('li.active ul').hide()
//          $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active')
//        } else {
//          $SIDEBAR_MENU.find('li.active-sm ul').show();
//          $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm')
//        }
//
//        $BODY.toggleClass('nav-md nav-sm')
//
//        setContentHeight()
      }
    }
  }
</script>

<style lang="scss">
</style>
