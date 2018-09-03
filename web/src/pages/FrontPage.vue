<template>
  <div class="wrapper">
    <navbar ref="navbar"/>
		<notifications ref="notification"/>
    <authentication ref="authentication"/>
    <sidebar-left/>
    <div class="page-wrapper">
			<div class="content-inner">
				<div class="content">
					<div :class="$t('bunner')">
						<div class="bunner-text">
							<p class="bunner-title">&nbsp;</p>
							<p class="bunner-subtitle">&nbsp;</p>
						</div>
					</div>

					<div class="products">
						<h2>Enimmüüdavad tooted</h2>
						<div class="product-list">
							<div class="product-col" v-for="topProduct in topProducts">
								<div class="product-item">
									<router-link :to="`/product/${topProduct.main_product_name}`" class="product-img card-img">
										<img :src="topProduct.MainProduct.picture" alt="product">
									</router-link>
									<div class="product-text">
										<router-link :to="`/product/${topProduct.main_product_name}`" class="product-name">{{ topProduct.main_product_name }}</router-link>
										<div class="product-price">{{ formatPrice(topProduct.price) }}€</div>
									</div>
									<div class="product-action">
										<a href="#" class="btn btn_lg" @click.prevent="addToCart(topProduct)">{{$t('Add to cart')}}</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="sponsors">
						<img src="/static/img/sponsors.png" alt="Tootjad">
					</div>
				</div>

				<div class="content-aside">
					<div class="aside-block">
						<div class="aside-block-header">
							{{$t('News')}}
						</div>
						<div class="aside-block-body">
							<div class="news-list">
								<div class="news-preview" v-for="news in newsList">
									<div class="news-preview-img card-img">
										<img :src="news.image" alt="product">
									</div>
									<div class="news-preview-text">
										{{ news.introtext }} <router-link :to="`/news/${news.id}`">loe edasi</router-link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--div class="for-img">
						<img src="img/widget.jpg" alt="">
					</div-->
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
import Footer from '@/components/Footer'
import Notifications from '@/components/Notifications'
import Authentication from '@/components/Authentication'

export default {
  components: {
    'navbar': Navbar,
    'sidebar-left': CategorySidebar,
    'sidebar-right': RightSidebar,
    'notifications': Notifications,
    'footerbar': Footer,
    'authentication': Authentication
  },
  async mounted () {
    let user = await this.$refs.authentication.login()
    if (!user || !user.email) {
      this.isAuthenticated = false
    } else {
      this.$root.user = user
      this.fee = this.$root.user.fee
      this.isAuthenticated = true
    }
    await this.getPricing()
    await this.updatePrice()
    this.fetchData()
  },
  data () {
    return {
      newsList: [],
      topProducts: [],
      curentLanguage: this.$route.params.language || this.$cookie.get('language') || 'en'
    }
  },
  methods: {
    fetchData () {
      this.$http.get('/api/news').then(result => { this.newsList = result.data })
      this.$http.get('/api/top_products').then(result => { this.topProducts = result.data })
    },
    async addToCart (product) {
      if (!this.$root.user.email) {
        this.$refs.navbar.activeNavTab = 'Login'
        this.$refs.navbar.popUp = true
      } else {
        const { $store } = this
        const id = product.id
        const response = await $store.dispatch('addToCart', {
          userId: this.$root.user.id,
          product: id,
          quantity: 1,
          language: this.curentLanguage
        })
        if (response.statusText === 'success') {
          this.$refs.notification.showAlert(response.message, 6000, true)
        }
      }
    },
    formatPrice (value) {
      value = parseFloat(value) * this.getFeeforProduct(value)
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    async getPricing () {
      const { $store } = this
      this.fee = await $store.dispatch('getFee', {authenticated: this.isAuthenticated})
      this.showPrices = true
    },
    getFeeforProduct (value) {
      for (var i = 0; i < this.fee.length; i++) {
        if (this.fee[i].max_price && this.fee[i].max_price > value) {
          return this.fee[i].fee
        } else if (this.fee[i].min_price && this.fee[i].min_price < value) {
          return this.fee[i].fee
        }
      }
    },
    updatePrice () {
      this.$root.$on('loginEvent', () => {
        location.reload()
      })
    }
  }
}
</script>

<style>
</style>
