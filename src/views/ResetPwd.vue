<template>
  <div class="eva-single-page-wrapper text-center">
    <form v-if="step === 1">
      <h1 class="eva-line-through-title">找回密码</h1>

      <div class="form-group">
        <input type="email" class="form-control" placeholder="请输入要找回密码的邮箱">
      </div>

      <button class="btn btn-primary">发送重置密码链接</button>
    </form>

    <form v-else>
      <h1 class="eva-line-through-title">找回密码</h1>

      <div class="form-group">
        <p>您的邮箱是：gagagaga@gmail.com</p>
      </div>

      <div class="form-group">
        <input type="email" class="form-control" placeholder="请输入新密码">
      </div>

      <div class="form-group">
        <input type="email" class="form-control" placeholder="请再次输入新密码">
      </div>

      <button class="btn btn-primary">重置密码</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'ResetPwd',

    computed: {
      step () {
        // step 1: request reset pwd
        // step 2(or above): set new pwd
        return parseInt(this.$route.query.step) || 1
      }
    }
  }
</script>

<style lang="scss">
</style>
