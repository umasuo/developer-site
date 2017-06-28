<template>
  <div class="container body">
    <div class="main_container">
      <div class="col-md-3 left_col menu_fixed">
        <div class="left_col scroll-view">
          <div class="navbar nav_title" style="border: 0;">
            <router-link :to="{ name: 'Dashboard' }" class="site_title">
              <img class="brand-logo" src="./assets/brand.svg">
              <span class="brand-text">Eva Cloud</span>
            </router-link>
          </div>

          <div class="clearfix"></div>

          <div class="clearfix area-selector">
            <select class="form-control area-selector__content">
              <option value="cn">中国区域</option>
              <option value="us">北美区域</option>
            </select>
          </div>

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
        Eva Cloud developer console
        <div class="pull-right form-inline">
          <div class="form-group">
            <label>语言:
              <select>
                <option value="zh_cn">中文</option>
                <option value="us_en">English</option>
              </select>
            </label>
          </div>

          <div class="form-group">
            <label>时区:
              <select>
                <option v-for="gmt in 27" :value="gmt">GMT{{ (gmt - 13 < 0 ? '' : '+') + (gmt - 13) }}</option>
              </select>
            </label>
          </div>

        </div>
        <div class="clearfix"></div>
      </footer>
      <!-- /footer content -->
    </div>
  </div>
</template>

<script>
  import NavMenu from '@/components/FrameNavMenu'
  import TopNav from '@/components/FrameTopNav'

  export default {
    name: 'Frame',

    data () {
      return {
        menu: [
          {
            title: '仪表盘',
            faIcon: 'fa-tachometer',
            toName: 'Dashboard'
          },
          {
            title: '产品',
            faIcon: 'fa-tablet',
            subMenu: [
              {
                name: '产品定义',
                toName: 'ProductDefinitions'
              },
              {
                name: '数据定义',
                toName: 'DataDefinitions'
              }
            ]
          },
          {
            title: '运营',
            faIcon: 'fa-line-chart',
            subMenu: [
              // { 暂时保留不显示
              //   name: '数据概要',
              //   toName: 'DataSummary'
              // },
              {
                name: '设备管理',
                toName: 'ManageDevices'
              },
              {
                name: '数据分析',
                toName: 'DataProcessor'
              },
              {
                name: '用户管理',
                toName: 'UserManager'
              },
              {
                name: '告警信息',
                toName: 'MessageManager'
              },
              {
                name: '用户反馈',
                toName: 'FeedbackManager'
              }
            ]
          },
          {
            title: '文档',
            faIcon: 'fa-book',
            toHref: '/document'
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

  .area-selector {
    background-color: lighten(#2a3f54, 10%);
    &__content {
      border: none;
      background-color: transparent;
      color: white;
    }
  }
</style>
