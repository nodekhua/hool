<template>
  <div class="wrapper">
    <navbar ref="navbar"/>
    <sidebar-left/>
		<notifications ref="notification"/>
		<authentication ref="authentication"/>
    <div class="page-wrapper">
			<div v-if="product" class="content-inner">
				<div class="content">
					<div class="breadcrumbs">
						<a href="" class="breadcrumbs-link">{{$t('Home')}}</a>
						<span class="breadcrumbs-sep"> > </span>
						<a href="" class="breadcrumbs-link"></a>
						<span class="breadcrumbs-sep"> > </span>
						<a href="" class="breadcrumbs-link"> {{ product.subcategory.name }}</a>
						<span class="breadcrumbs-sep"> > </span>
						<a href="" class="breadcrumbs-link breadcrumbs-link_current"> {{  product.name }}</a>
					</div>

					<div class="product">
						<h1 class="product-title">{{ product.name }}</h1>
						<div class="product-info">
							<div class="product-image card-img">
								<img v-bind:src="product.picture" alt="Glancetron 1300">
							</div>
							<div class="product-descr">
								<ul class="check">
									<li v-if="currentLanguage === 'en'" v-for="item in splitJoin(product.description)">{{item}}</li>
                  <li v-if="currentLanguage === 'et'" v-for="item in splitJoin(product.description_et || product.description)">{{item}}</li>
                  <li v-if="currentLanguage === 'fi'" v-for="item in splitJoin(product.description_fi || product.description)">{{item}}</li>
								</ul>
                <a v-bind:href="product.datasheet" target="_blank">{{$t('Download datasheet')}}</a>
							</div>
						</div>

						<div class="product-additional" v-if="showproducts">
							<div class="tabs-wrapper">
								<div class="tabs-header">
									<div class="tab-toggle" v-bind:class="[{ 'active' : activeTab === 'variations' }]" v-on:click="tabs('variations')">{{$t('Variations')}}</div>
									<div class="tab-toggle" v-if="product.accessories.length > 0" v-bind:class="[{ 'active' : activeTab === 'accessories' }]"><a v-on:click="tabs('accessories')">{{$t('Accessories')}}</a></div>
								</div>
								<div class="tabs-body">
									<div class="tab-content" v-if="activeTab === 'variations'">
										<div class="table-wrap">
											<div class="table">
												<div class="table-tr table-tr_header">
													<div class="name">{{$t('NAME')}}</div>
													<div class="location">{{$t('SOURCE')}}</div>
													<div class="number-all">{{$t('QTY')}}</div>
													<div class="time">{{$t('DELIVERY')}}</div>
													<div class="price">{{$t('PRICE')}}</div>
													<div class="number">&nbsp;</div>
													<div class="action">&nbsp;</div>
												</div>
												<div class="table-tr" v-for="variation in product.variations">
													<div class="name">
														<div class="table-label">{{variation.name}}</div>
														{{variation.description}}
													</div>
													<div class="location">
														<p>{{setSource(variation.source)}}</p>
													</div>
													<div class="number-all">
														<p>{{variation.quantity}}</p>
													</div>
													<div class="time">
														<p>5{{$t('wd')}}</p>										<!-- TODO - delivery time depending on stock availability -->
													</div>
													<div class="price" v-if="showPrices">
														<p>€{{formatPrice(variation.price)}}</p>
													</div>
													<div class="number">
														<p><input @input="setProductCart(variation, $event.target.value)" type="number" min="1" value="1" class="form-control"></p>
													</div>
													<div class="action">
														<p><a href="#" @click.prevent="addToCart(variation)" class="btn">{{$t('Add to cart')}}</a></p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="tab-content" v-if="activeTab === 'accessories'">
                    <div class="table-wrap">
                      <div class="table">
                        <div class="table-tr table-tr_header">
                          <div class="name">{{$t('NAME')}}</div>
                          <div class="location">{{$t('SOURCE')}}</div>
                          <div class="number-all">{{$t('QTY')}}</div>
                          <div class="time">{{$t('DELIVERY')}}</div>
                          <div class="price">{{$t('PRICE')}}</div>
                          <div class="number">&nbsp;</div>
                          <div class="action">&nbsp;</div>
                        </div>
												<div class="table-tr" v-for="accessory in product.accessories">
													<div class="name">
														<div class="table-label">{{accessory.name}}</div>
														{{accessory.description}}
													</div>
													<div class="location">
														<p>{{setSource(accessory.source)}}</p>
													</div>
													<div class="number-all">
														<p>{{accessory.quantity}}</p>
													</div>
													<div class="time">
														<p>{{accessory.quantity < 1 ? '14'+$t('wd') : '5'+$t('wd')}}</p>
													</div>
													<div class="price" v-if="showPrices">
														<p>€{{formatPrice(accessory.price)}}</p>
													</div>
													<div class="number">
														<p><input @input="setProductCart(accessory, $event.target.value)" type="number" min="1" value="1" class="form-control"></p>
													</div>
													<div class="action">
														<p><a href="#" @click.prevent="addToCart(accessory)" class="btn">{{$t('Add to cart')}}</a></p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		<!-- CONTENT END -->
    </div>
		<!-- Footer -->
		<footerbar/>
		<!-- /Footer -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import CategorySidebar from '@/components/sidebar/CategorySidebar'
import ShoppingCartSidebar from '@/components/sidebar/ShoppingCartSidebar'
import Footer from '@/components/Footer'
import Notifications from '@/components/Notifications'
import Authentication from '@/components/Authentication'

export default {
  data () {
    return {
      cartCount: {},
      activeTab: 'variations',
      currentLanguage: this.$route.params.language || this.$cookie.get('language') || 'en',
      showPrices: false,
      showproducts: true
    }
  },
  async created () {
    const { $store, $route } = this
    const { id } = $route.params
    await $store.dispatch('fetchProductDetail', {
      name: id.replace('/', '%2F')
    })
  },
  async beforeRouteUpdate (to, from, next) {
    const { $store } = this
    const { id } = to.params
    await $store.dispatch('fetchProductDetail', {
      name: id.replace('/', '%2F')
    })
    next()
  },
  components: {
    'navbar': Navbar,
    'sidebar-left': CategorySidebar,
    'sidebar-right': ShoppingCartSidebar,
    'footerbar': Footer,
    'notifications': Notifications,
    'authentication': Authentication
  },
  computed: {
    product () {
      const { $store, $route } = this
      const { id } = $route.params
      const product = $store.getters.getProductDetail(id)

      return product
    }
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
    this.getPricing()
    this.setLanguage()
    this.updatePrice()
  },
  methods: {
    tabs (tab) {
      this.activeTab = tab
    },
    setProductCart (variation, count) {
      const id = variation.id
      this.cartCount[id] = count
    },
    async addToCart (variation) {
      if (!this.$root.user.email) {
        this.$refs.navbar.activeNavTab = 'Login'
        this.$refs.navbar.popUp = true
      } else {
        const { $store, cartCount } = this
        const id = variation.id
        const response = await $store.dispatch('addToCart', {
          userId: this.$root.user.id,
          product: id,
          quantity: cartCount[id] || 1,
          language: this.currentLanguage
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
    splitJoin (description) {
      if (description) {
        if (description[description.length - 1] === ';') {
          description = description.slice(0, -1)
        }
        return description.split(';')
      }
    },
    setLanguage () {
      this.$root.$on('setLanguage', (language) => {
        if (language) {
          this.currentLanguage = language
        }
      })
    },
    updatePrice () {
      this.$root.$on('loginEvent', () => {
        location.reload()
      })
    },
    setSource (source) {
      return source || 'JAR'
    }
  }
}
</script>

<style lang="scss">
  .variaton-cart {
    display: flex;
    input {
      width: 100px;
      margin-right: 20px;
    }
  }
</style>
