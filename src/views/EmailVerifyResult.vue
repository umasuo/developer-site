<template>
  <div class="eva-single-page-wrapper text-center">
    <h1 class="eva-line-through-title">验证成功</h1>

    <p>您的邮箱已经验证成功，请 <router-link :to="{name:'Login'}">前往登陆</router-link></p>
  </div>
</template>

<script>
  export default {
    name: 'EmailVerifyResult'
  }
</script>

<style lang="scss">
</style>
