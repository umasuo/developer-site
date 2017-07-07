<template>
  <div class="eva-single-page-wrapper text-center">
    <template v-if="result === 'success'">
      <h1 class="eva-line-through-title">邮箱验证成功</h1>

      <p>您的邮箱已经验证成功，请 <router-link :to="{name:'Signin'}">前往登陆</router-link></p>
    </template>

    <template v-if="result === 'failed'">
      <h1 class="eva-line-through-title">邮箱验证出错</h1>

      <p>您的邮箱验证失败，可能是由验证链接过期或复制不完整导致，请检查链接是否复制正确，或于登录后点击右上角头像重发。 <router-link :to="{name:'Signin'}">前往登陆</router-link></p>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'EmailVerifyResult',

    computed: {
      result () {
        // result query param should be one of: success, failed
        const verifyResult = this.$route.query.result

        if (verifyResult) {
          return verifyResult
        } else {
          return 'failed'
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
