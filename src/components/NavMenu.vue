<template>
  <ul class="nav side-menu">
    <li class="parent-menu" :class="{ active: isCurrent }">
      <a @click="isOpen = !isOpen">
        <i class="fa" :class="menu.faIcon"></i> {{ menu.title }} <span class="fa fa-chevron-down"></span>
      </a>
      <ul class="nav child_menu" v-show="isOpen">
        <router-link tag="li" v-for="menu in menu.subMenu" :key="menu.toName" :to="{ name: menu.toName }" exact=""><a>{{ menu.name }}</a></router-link>
      </ul>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'NavMenu',

    props: ['menu'],

    data () {
      return {
        isOpen: false
      }
    },

    computed: {
      isCurrent () {
        const routeName = this.$route.name
        const matched = this.menu.subMenu.filter((menu) => {
          return menu.toName === routeName
        }).length >= 1
        this.isOpen = matched
        return matched
      }
    }
  }
</script>

<style lang="scss">
</style>
