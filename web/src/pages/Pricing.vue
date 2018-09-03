<template>
  <div class="wrapper">
			<div class="content-area">
      <div class="row">
        <div class="medium-12 columns">
  					<table class="pricing responsive" cellspacing="0">   
            <tbody>
              <template class="cart_item" v-for="(value, key, index) in pricing">
                <tr v-bind:class="{ even: key%2 == 0 }">
                  <td class="index" rowspan="2">
                    {{key}}
                  </td>
                  <td class="login">
                    login
                  </td>
                  <td rowspan="2">
                    {{value.false.max_price}}
                  </td>
                  <td>{{value.false.fee}}</td>
                </tr>
                <tr v-bind:class="{ even: key%2 == 0 }">
                  <td class="">
                    not login
                  </td>
                  <td>{{value.true.fee}}</td>
                </tr>
              </template>
            </tbody>

          </table>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pricing: []
    }
  },
  created () {
    this.getPricing()
  },
  methods: {
    async getPricing () {
      const { $store } = this
      let tmp = {}
      let pricing = await $store.dispatch('getPricing')
      for (let i = 0; i < pricing.length; i++) {
        if (pricing[i].max_price) {
          if (!tmp[pricing[i].max_price]) {
            tmp[pricing[i].max_price] = []
          }
          tmp[pricing[i].max_price][pricing[i].login] = pricing[i]
        }
      }
      this.pricing = Object.values(tmp)
    }
  }
}
</script>

<style lang="css">
</style>

