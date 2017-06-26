<template>
  <div class="container body">
    <div class="main_container">
      <div class="col-md-3 left_col menu_fixed">
        <div class="left_col scroll-view">
          <div class="navbar nav_title" style="border: 0;">
            <a href="index.html" class="site_title">
              <img class="brand-logo" src="./assets/brand.svg">
              <span class="brand-text">Eva Cloud</span>
            </a>
          </div>

          <div class="clearfix"></div>

          <br/>

          <!-- sidebar menu -->
          <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section">
              <NavMenu v-for="subMenu in menu" :menu="subMenu" :key="subMenu.toName"></NavMenu>
            </div>
          </div>
          <!-- /sidebar menu -->
        </div>
      </div>

      <TopNav></TopNav>

      <!-- page content -->
      <div class="right_col" role="main">
        <!-- router view -->
        <router-view></router-view>
      </div>
      <!-- /page content -->

      <!-- footer content -->
      <footer>
        <div class="pull-right">
          Eva Cloud developer console
        </div>
        <div class="clearfix"></div>
      </footer>
      <!-- /footer content -->
    </div>
  </div>
</template>

<script>
  import NavMenu from '@/components/NavMenu'
  import TopNav from '@/components/TopNav'

  export default {
    name: 'Frame',

    data () {
      return {
        menu: [
          {
            title: '报表',
            faIcon: 'fa-table',
            subMenu: [
              {
                name: '仪表盘',
                toName: 'Dashboard'
              }
            ]
          },
          {
            title: '设备',
            faIcon: 'fa-tablet',
            subMenu: [
              {
                name: '产品定义',
                toName: 'DeviceDefinitions'
              },
              {
                name: '设备管理',
                toName: 'ManageDevices'
              }
            ]
          },
          {
            title: '数据',
            faIcon: 'fa-database',
            subMenu: [
              // { 暂时保留不显示
              //   name: '数据概要',
              //   toName: 'DataSummary'
              // },
              {
                name: '数据定义',
                toName: 'DataDefinitions'
              },
              {
                name: '数据分析',
                toName: 'DataProcessor'
              }
            ]
          },
          {
            title: '用户',
            faIcon: 'fa-users',
            subMenu: [
              {
                name: '用户管理',
                toName: 'UserManager'
              }
            ]
          },
          {
            title: '告警信息',
            faIcon: 'fa-user',
            subMenu: [
              {
                name: '告警信息',
                toName: 'DeveloperInfo'
              }
            ]
          },
          {
            title: '用户反馈',
            faIcon: 'fa-user',
            subMenu: [
              {
                name: '用户反馈',
                toName: 'FeedbackManager'
              }
            ]
          }
        ]
      }
    },

    components: {
      NavMenu,
      TopNav
    }
  }
</script>

<style lang="scss">
  .brand-logo,
  .brand-text {
    color: white;
    height: 29px;
    vertical-align: middle;
    font-weight: 300;
  }

  .right_col {
    min-height: 100vh;
    min-height: calc(100vh - 51px);
  }
</style>
