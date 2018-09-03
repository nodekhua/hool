<template>
  <div>
    <top-bar/>
    <notifications ref="notification"/>
    <div id="wrapper">
      <div id="login" class="animate form">
        <form  action="" autocomplete="on"> 
          <h1>{{$t("Set new password")}}</h1> 
          <p> 
            <label for="passwordsignup" class="youpasswd">{{$t("Password")}}</label>
            <input v-model="password" id="passwordsignup" name="passwordsignup" required="required" type="password"/>
          </p>
          <p> 
            <label for="passwordsignup_confirm" class="youpasswd">{{$t("Confirm password")}}</label>
            <input v-model="confirm_password" id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password"/>
          </p>
          <p class="signin button"> 
            <button @click.prevent="reset()" value="Sign up">{{$t("Set password")}}</button> 
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import { messages } from '../languages/main'
import Notifications from '@/components/Notifications'

export default {
  data () {
    return {
      password: '',
      confirm_password: '',
      curentLanguage: this.$route.params.language
    }
  },
  components: {
    'top-bar': TopBar,
    'notifications': Notifications
  },
  methods: {
    async reset () {
      const { password } = this
      const { $store, $route } = this
      const { token } = $route.params
      if (!this.validateData()) {
        return
      }
      const response = await $store.dispatch('SetNewPassword', { token, password, language: this.curentLanguage })
      if (response.statusText === 'error') {
        this.$refs.notification.showAlert(response.body)
      } else if (response.statusText === 'success') {
        this.$refs.notification.showAlert(messages[this.curentLanguage]['The password was changed'], 3000, true)
        setTimeout(() => {
          this.$router.push('/' + this.curentLanguage)
        }, 3000)
      }
    },
    validateData () {
      if (!this.password) {
        this.$refs.notification.showAlert(messages[this.curentLanguage]['Please fill all fields'])
        return false
      }
      if (this.password.length < 6) {
        this.$refs.notification.showAlert(messages[this.curentLanguage]['Password too weak'])
        return false
      }
      if (this.password !== this.confirm_password) {
        this.$refs.notification.showAlert(messages[this.curentLanguage]['Passwords do not match'])
        return false
      }
      return true
    }
  }
}
</script>

<style lang="css">
</style>
