<template>
  <div>
    <button class="btn btn-default" :disabled="step <= 1" @click="previous">上一步</button>
    <button class="btn btn-primary" :disabled="step >= max" @click="forward">下一步</button>
  </div>
</template>

<script>
  export default {
    name: 'WizardSteps',

    model: {
      prop: 'step'
    },

    props: {
      max: {
        type: Number,
        default: 3
      },
      step: {
        type: Number,
        default: 0
      }
    },

    methods: {
      forward () {
        this.$emit('input', this.step + 1)
      },

      previous () {
        this.$emit('input', this.step - 1)
      }
    }
  }
</script>

<style lang="scss">
</style>
