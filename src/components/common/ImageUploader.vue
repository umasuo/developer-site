<template>
  <div class="eva-img-uploader">
    <img :src="curImg" class="eva-img-uploader__icon">
    <div class="eva-img-uploader__input-wrapper">
      <span class="eva-img-uploader__button">选择图标</span>
      <input type="file" @change="preview">
    </div>
  </div>
</template>

<script>
  import dataURLtoBlob from 'blueimp-canvas-to-blob'
  import api from 'src/api'

  export default {
    name: '',

    model: {
      prop: 'imgSrc'
    },

    props: ['imgSrc'],

    data () {
      return {
        curImg: this.imgSrc
      }
    },

    methods: {
      preview (e) {
        const input = e.target

        if (input.files && input.files[0]) {
          const reader = new FileReader()
          const vm = this
          reader.onload = function (e) {
            const img = document.createElement('img')
            img.onload = async function (e) {
              const canvas = document.createElement('canvas')

              const size = 64
              canvas.width = size
              canvas.height = size
              const ctx = canvas.getContext('2d')
              ctx.drawImage(img, 0, 0, size, size)

              // TODO: I only display the scaled img here, to upload it as a file, check https://github.com/blueimp/JavaScript-Canvas-to-Blob.
              const dataUrl = canvas.toDataURL('image/jpg')
              vm.curImg = dataUrl
              const blob = dataURLtoBlob(dataUrl)

              const uploadedUrl = await api.files.uploadFile(blob)
              vm.$emit('input', uploadedUrl)
            }
            img.src = e.target.result
          }
          reader.readAsDataURL(input.files[0])
        }
      }
    }
  }
</script>

<style lang="scss">
  .eva-img-uploader {
    $size: 64px;
    width: $size;
    height: $size + 20px;

    &__icon {
      width: $size;
      height: $size;
    }

    &__input-wrapper {
      overflow: hidden;
      position: relative;
      height: 20px;
      text-align: center;
      cursor: pointer;
    }

    &__button {
      cursor: pointer;
    }

    input {
      display: block;
      position: absolute;
      width: $size;
      height: 100%;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>
