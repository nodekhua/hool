<script>
export default {
  methods: {
    async loginRedirect () {
      let user = await this.getUser()
      if (!user || !user.email) {
        this.$router.push('/')
      }
    },
    async login () {
      let user = await this.getUser()
      return user
    },
    async getUser () {
      const { $store } = this
      const token = this.$cookie.get('token')
      const user = await $store.dispatch('authenticateByToken', { token: token })
      return user
    }
  }
}
</script>