<template>
  <ul class="nav side-menu">
    <li class="parent-menu" :class="{ active: isCurrent }">
      <!-- Render a top level nav link if menu has toName -->
      <router-link v-if="menu.toName" :to="{ name: menu.toName }">
        <i class="fa" :class="menu.faIcon"></i> {{ menu.title }}</span>
      </router-link>

      <template v-if="!menu.toName">
        <a @click="isOpen = !isOpen">
          <i class="fa" :class="menu.faIcon"></i> {{ menu.title }} <span class="fa fa-chevron-down"></span>
        </a>
        <ul class="nav child_menu" v-show="isOpen">
          <router-link tag="li" v-for="menu in menu.subMenu" :key="menu.toName" :to="{ name: menu.toName }" exact=""><a>{{ menu.name }}</a></router-link>
        </ul>
      </template>
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

        if (this.menu.toName) {
          return this.menu.toName === routeName
        } else {
          const matched = this.menu.subMenu.filter((menu) => {
            return menu.toName === routeName
          }).length >= 1
          this.isOpen = matched
          return matched
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
