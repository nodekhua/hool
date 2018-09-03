<template>
  <div class="notifications">
    <b-alert variant="danger" dismissible :show="isShowAlert" @dismissed="isShowAlert=false">
      {{$t('Error')}}: {{message}}
    </b-alert>
    <b-alert variant="success" dismissible :show="showMessage" @dismissed="showMessage=false">
      {{$t('Success:')}} {{message}}
    </b-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowAlert: false,
      showMessage: false,
      message: ''
    }
  },
  methods: {
    showAlert (text, duration = 6000, success) {
      this.message = text
      success ? this.showMessage = true : this.isShowAlert = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        success ? this.showMessage = false : this.isShowAlert = false
        this.message = ''
      }, duration)
    }
  }
}
</script>
