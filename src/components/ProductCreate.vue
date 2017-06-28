<template>
  <portal to="modals">
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">创建产品</h4>
          </div>
          <div class="modal-body">

            <div class="eva-product-create-type">
              <ul class="eva-product-create-type__category">
                <li v-for="(cate, key) in stdTypes"
                    :class="{ active: curTypeCategory === key }"
                    @click="curTypeCategory = key">
                  <a href="javascript:;">{{ key }}</a>
                </li>
              </ul>

              <ul class="eva-product-create-type__list">
                <li v-for="type in stdTypes[curTypeCategory]"><a href="javascript:;">{{ type }}</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'ProductCreate',

    props: {
      show: {
        type: Boolean,
        required: true
      }
    },

    data () {
      return {
        curTypeCategory: '大家电',

        stdTypes: {
          '大家电': [
            '冰箱', '空调'
          ],
          '小家电': [
            '小冰箱', '小空调'
          ]
        }
      }
    },

    watch: {
      show (newValue) {
        if (newValue) {
          $(this.$refs.modal).modal('show').on('hide.bs.modal', e => {
            this.$emit('hide')
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .eva-product-create-type {
    margin: -15px;
    border-radius: 6px;
    min-height: 400px;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    &__category,
    &__list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    $category_width: 100px;
    &__category {
      background-color: #eee;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: $category_width;
      border-bottom-left-radius: 6px;
      padding: 15px 0;

      li {
        padding: 10px 15px;

        &.active {
          background-color: white;
        }
      }
    }

    &__list {
      margin-left: $category_width;

      li {
        $size: 50px;
        width: $size;
        height: $size;
        background-color: #eee;
        border-radius: $size / 2;
        float: left;
        margin: 15px 0 0 15px;
        line-height: $size;
        text-align: center;
      }
    }
  }
</style>
