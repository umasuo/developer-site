<template>
  <div>
    <button class="btn btn-default" :disabled="step <= 1" @click="curStep--">上一步</button>
    <button class="btn btn-primary" :disabled="step >= max" @click="curStep++">下一步</button>
  </div>
</template>

<script>
  export default {
    name: 'WizardSteps',

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

    data () {
      return {
        curStep: this.step
      }
    }
  }
</script>

<style lang="scss">
</style>
