<template>
  <div class="eva-single-page-wrapper text-center">
    <form>
      <h1 class="eva-line-through-title">找回密码</h1>

      <div class="form-group">
        <input type="email" class="form-control" placeholder="请输入要找回密码的邮箱">
      </div>

      <button class="btn btn-primary">发送重置密码链接</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'ResetPwdRequest'
  }
</script>

<style lang="scss">
</style>
