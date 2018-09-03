<template>
  <div class="wrapper">
    <navbar/>
    <sidebar-left/>
    <authentication ref="authentication"/>
    <div class="content-inner">
      <div class="content">

                
        <div class="product">
          <h1 class="product-title">{{$t('Shopping cart')}}</h1>

          <div class="product-additional">
            <div class="tabs-wrapper">
              <div class="tabs-body">
                <div class="tab-content tab-content_active" data-tab="tab-1">
                  <div class="table-wrap">
                    <div class="table">
                      <div class="table-tr table-tr_header">
                        <div class="name">&nbsp;</div>
                        <div class="price">&nbsp;</div>
                        <div class="number">&nbsp;</div>
                        <div class="action">&nbsp;</div>
                      </div>
                      <div class="table-tr" v-for="product in products">
                        <div class="name">
                          <div class="table-label">{{product.Product.name}}</div>
                        </div>
                        <div class="price">
                          <p>€&nbsp;{{(product.Product.price * getFeeforProduct(product.Product.price).fee).toFixed(2)}}</p>
                        </div>
                        <div class="number">
                          <p>{{product.quantity}}</p>
                        </div>
                        <div class="action">
                          <p><a href="#" class="btn" @click.prevent="removeProduct(product.id)">{{$t('Remove')}}</a></p>
                        </div>
                      </div>
                      
                      <div class="table-tr">
                        <div class="name">
                          <div class="table-label">
                            {{$t("Delivery")}}: €{{delivery}}<br/><br/>
                            {{$t('Subtotal')}}: €&nbsp;{{(delivery + total).toFixed(2)}}<br/>
                            <!-- {{$t('Shipping flat rate')}}: €{{delivery}}<br /> -->
                            {{$t("Vat 20%")}}: €{{((total + delivery) * 0.2).toFixed(2)}}<br />
                            {{$tc("Total", 1)}}: €{{((total + delivery) * 1.2).toFixed(2)}}<br /><br />
                          </div>
                        </div>
                      </div>
<!--                       
                      <div class="table-tr">
                        <div class="name">
                          {{$t('Enter coupon code')}}: <input type="text"> <a href="">{{$t('Apply coupon')}}</a>
                        </div>
                      </div>

                       -->
                      
                      <p><a href="#" class="btn" @click.prevent="storeOrder()">{{$t('Proceed to chckout')}}</a></p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
		<!-- Footer -->
		<footerbar/>
		<!-- /Footer -->
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import CategorySidebar from '@/components/sidebar/CategorySidebar'
import RightSidebar from '@/components/sidebar/RightSidebar'
import Authentication from '@/components/Authentication'

export default {
  components: {
    'navbar': Navbar,
    'sidebar-left': CategorySidebar,
    'sidebar-right': RightSidebar,
    'authentication': Authentication
  },
  data () {
    return {
      products: {},
      total: 0,
      curentLanguage: this.$route.params.language || 'en',
      fee: {},
      discounts: {
        min: {},
        max: {}
      },
      isAuthenticated: false,
      delivery: 6
    }
  },
  async mounted () {
    const user = await this.$refs.authentication.login()
    if (!user || !user.id) {
      this.showLogin = true
      this.isAuthenticated = false
    } else {
      this.$root.user = user
      this.showLogin = false
      this.isAuthenticated = true
      await this.getProductFromCart(this.$root.user.id)
    }
  },
  methods: {
    async removeProduct (id) {
      const { $store } = this
      await $store.dispatch('deleteFromCart', {id: id})
      this.getProductFromCart(this.$root.user.id)
    },
    async getProductFromCart (userId) {
      const { $store } = this
      this.total = 0
      await this.getPricing()
      const products = await $store.dispatch('getProductFromCart', {userId: userId})
      this.products = []
      for (const product of products) {
        product.subtotal = this.getProductSubtotal(parseFloat(product.Product.price), product.quantity)
        this.products.push(product)
      }
    },
    async getPricing () {
      const { $store } = this
      this.fee = await $store.dispatch('getFee', {authenticated: this.isAuthenticated})
      let discounts = await $store.dispatch('getDiscounts', {authenticated: this.isAuthenticated})
      for (var i = 0; i < discounts.length; i++) {
        if (discounts[i].max_count) {
          if (!this.discounts.max[discounts[i].max_count]) {
            this.discounts.max[discounts[i].max_count] = []
          }
          this.discounts.max[discounts[i].max_count][discounts[i].ranges.max_price] = discounts[i]
        } else if (discounts[i].min_count) {
          if (!this.discounts.min[discounts[i].min_count]) {
            this.discounts.min[discounts[i].min_count] = []
          }
          this.discounts.min[discounts[i].min_count][discounts[i].ranges.max_price] = discounts[i]
        }
      }
    },
    getFeeforProduct (value) {
      for (var i = 0; i < this.fee.length; i++) {
        if (this.fee[i].max_price && this.fee[i].max_price > value) {
          return { fee: this.fee[i].fee, max_price: this.fee[i].max_price }
        } else if (this.fee[i].min_price && this.fee[i].min_price < value) {
          return { fee: this.fee[i].fee, min_price: this.fee[i].min_price }
        }
      }
    },
    getProductDiscount (price, quantity) {
      let range = this.getFeeforProduct(price)
      let count = 0
      let discountsMax = Object.keys(this.discounts.max)
      let discountsMin = Object.keys(this.discounts.min)
      let flag = 'max'
      for (var i = 0; i < discountsMax.length; i++) {
        if (discountsMax[i] >= quantity) {
          count = discountsMax[i]
          flag = 'max'
          break
        }
      }
      for (var j = 0; j < discountsMin.length; j++) {
        if (discountsMin[j] <= quantity) {
          count = discountsMin[j]
          flag = 'min'
          break
        }
      }
      return this.discounts[flag][count][range.max_price || range.min_price].discount
    },
    getProductSubtotal (price, quantity) {
      let fee = this.getFeeforProduct(price).fee
      let discount = 1 - this.getProductDiscount(price, quantity) / 100
      let subtotal = price * quantity * fee * discount
      this.total += subtotal
      // this.delivery = this.total < 500 && this.total > 0 ? 6 : 0
      return subtotal.toFixed(2)
    },
    async storeOrder () {
      const { $store } = this
      const result = await $store.dispatch('storeOrder', {userId: this.$root.user.id, language: this.$cookie.get('language') || this.curentLanguage})
      location.href = result.invoiceLink || '/cart'
    }
  }
}
</script>
