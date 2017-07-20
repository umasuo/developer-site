<template>
  <div class="x_panel">
    <div class="x_title">
      <h2>批量生成 Union ID</h2>
      <div class="clearfix"></div>
    </div>
    <div class="x_content eva-unionid-form">

      <form>
        <button type="submit" class="eva-unionid-form__button btn btn-default" @click.prevent="generate">生成</button>
        <div class="eva-unionid-form__input-wrapper">
          <input type="number" class="eva-unionid-form__input form-control" placeholder="输入生成数量（1-10000）"
                 min="1" max="10000"
                 v-model="quantity" >
        </div>
        <p class="text-warnning" v-if="message === 'pending'">请稍候...</p>
        <p class="text-warnning" v-else-if="message !== null">未知错误</p>
      </form>

    </div>
  </div>
</template>

<script>
import api from 'src/api'
import json2csv from 'json2csv'

export default {
  props: {
    productId: String
  },

  data () {
    return {
      quantity: 1,
      message: null
    }
  },

  methods: {
    async generate () {
      this.message = 'pending'

      try {
        this.generatedIds = await api.product.generateUnionId(this.productId, parseInt(this.quantity))

        const csv = json2csv({ data: this.generatedIds, fields: ['unionId', 'secretKey'] })
        const uriContent = 'data:application/octet-stream,' + encodeURIComponent(csv)

        const link = document.createElement('a')
        link.download = 'union_id_secret.csv'
        link.href = uriContent
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (e) {
        console.dir(e)
        this.message = e.message
      }

      this.message = null
    }
  }
}
</script>

<style lang="scss">
.eva-unionid-form {
  &__button {
    float: right;
  }

  &__input-wrapper {
    overflow: hidden;
    padding-right: 5px;
  }

  &__input {
    width: 100%;
  }
}
</style>
