<template>
<div>
		<authentication ref="authentication"/>
		<notifications ref="notification"/>
		<header class="header"> 
			<div class="header-inner">
				<router-link to="/" class="header-logo for-img">
					<img src="/static/img/logo.png" alt="Hool Kassaseadmed">
				</router-link>

				<div class="header-wrap" v-bind:class="{ headerdisplay: headerIsActive}">
					<div class="header-wrap-inner">
						<nav class="header-nav">
							<ul class="nav">
								<li class="nav-item"><a @click.prevent="goTo('about')" href="#" class="nav-link">{{$t('About us')}}</a></li>
								<li class="nav-item"><a @click.prevent="goTo('secondhand')" href="#" class="nav-link">{{$t('Second hand')}}</a></li>
								<li class="nav-item"><a @click.prevent="goTo('services')" href="#" class="nav-link">{{$t('Support/Services')}}</a></li>
								<li class="nav-item"><a @click.prevent="goTo('contact')" href="#" class="nav-link">{{$t('Contact us')}}</a></li>
							</ul>
						</nav>
						<div class="header-search">
							<form id="search_form" v-on-clickaway="onBlurSearch" v-on:submit.prevent="search(searchQuery)">
								<div class="input-wrap">
									<input autocomplete="off" class="form-text" type="text" v-bind:placeholder="$t('Search')" v-on:focus="onFocusSearch()" v-on:input="search($event.target.value)" :value="query" v-model="searchQuery" v-on:keyup.enter="showSearchResult($event.target.value)">
									<button class="button" @click="showSearchResult(searchQuery)">&nbsp;</button>
								</div>
								<div v-if="isLoading">
        					<span>loading...</span>
      					</div>
      					<div v-if="showSearchResults" style="position: fixed; background-color: #fff; margin-top: 10px;">
        					<ul>
          					<li v-for="product in products.slice(0, 5)">
           				 		<span v-on:click="searchProductClick(product.name)">{{product.name}}</span>
          					</li>
        					</ul>
      					</div>
							</form>
						</div>
						<div class="header-action">
							<div class="header-language">
								<div class="select">
									<ul class="select-option">
          					<select v-on:change="setLang(this)" v-model="currentLanguage">
            					<option v-for="language in languagesList" v-bind="language">{{language}}</option>
          					</select>
									</ul>
								</div>
							</div>
							<div class="header-basket">
								<a href="#" @click.prevent="goToCart()" class="basket for-img">
									<img src="/static/img/basket-icon.png" alt="">
								</a>
							</div>
							<div class="header-login" v-if="showLogin">
								<a style="cursor: pointer" @click.prevent="logout()" class="login js-show-popup">{{$t("Log out")}}</a>
							</div>
              <div class="header-login" v-if="!showLogin">
								<a style="cursor: pointer" @click.prevent="loginPopup()" class="login js-show-popup">{{$t("Login")}}</a>
							</div> 
						</div>
					</div>
				</div>

				<div class="mobile-burger" @click="headerIsActive = !headerIsActive">
					<span class="top"></span>
					<span class="middle"></span>
					<span class="bottom"></span>
				</div>
			</div>
		</header>

		<div class="header-search header-search_mobile">
			<form id="search_form" v-on-clickaway="onBlurSearch" v-on:submit.prevent="search(searchQuery)">
				<div class="input-wrap">
					<input autocomplete="off" class="form-text" type="text" placeholder="Search" :value="query"  v-model="searchQuery" 
					v-on:focus="onFocusSearch()"
					v-on:input="search($event.target.value)"
					v-on:keyup.enter="showSearchResult($event.target.value)">
					<button class="button" @click="showSearchResult(searchQuery)">&nbsp;</button>
				</div>
				<div v-if="isLoading">
					<span>loading...</span>
				</div>
				<div v-if="showSearchResults" style="position: fixed; z-index: 1000; width: 100%; background-color: #fff; margin-top: 10px;">
					<ul>
						<li v-for="product in products.slice(0, 5)">
							<span v-on:click="searchProductClick(product.main_product_name)">{{product.name}}</span>
						</li>
					</ul>
				</div>
			</form>
		</div>

		<div class="popup-overlay" v-show="popUp">
			<div class="popup">
				<form class="registration" v-if="activeNavTab === 'Registration'">
					<div class="popup-header">
						<h2 class="popup-title">{{$t('Registration')}}</h2>
						<span @click="popUp = false" class="popup-close js-popup-close"></span>
					</div>
					<div class="popup-body">
						<div class="form-row">
  						<div class="form-col-6">
								<div class="form-group">
									<label class="form-label" >{{$t('Email')}}*</label>
									<input v-model="email" type="email" class="form-text" required="required">
								</div>
							</div>
							<div class="form-col-6">
								<div class="form-group">
									<label class="form-label">{{$t('Company name')}}</label>
									<input v-model="company_name" type="text" class="form-text" >
								</div>
							</div>
							<div class="form-col-6">
								<div class="form-group">
									<label class="form-label">{{$t('First name')}}*</label>
									<input v-model="first_name" type="text" class="form-text" required="required">
								</div>
							</div>
							<div class="form-col-6">
								<div class="form-group">
									<label class="form-label">{{$t('Last name')}}*</label>
									<input v-model="last_name" type="text" class="form-text" required="required">
								</div>
							</div>
							<div class="form-col-6">
								<div class="form-group">
									<label class="form-label">{{$t('Password')}}*</label>
									<input v-model="password" type="password" class="form-text" required="required">
								</div>
							</div>
							<div class="form-col-6">
								<div class="form-group">
									<label class="form-label">{{$t('Confirm password')}}*</label>
									<input v-model="confirm_password" type="password" class="form-text" required="required">
								</div>
							</div>
							<div class="form-col-6">
								<div class="form-group">
									<label class="form-label">{{$t('VAT number')}}</label>
									<input v-model="vat_number" type="text" class="form-text">
								</div>
							</div>
							<div class="form-col-6">
								<div class="form-group">
									<label class="form-label">&nbsp;</label>
									<button class="btn btn_lg" @click.prevent="registration()">{{$t('Sign up')}}</button>
									<p>{{$t('Already a member?')}} <a @click="activeNavTab = 'Login'">{{$t('Login')}}</a> </p>
								</div>
							</div>
						</div>
					</div>
				</form>

				<form class="login" v-if="activeNavTab === 'Login'">
					<div class="popup-header">
						<h2 class="popup-title">{{$t('Login')}}</h2>
						<span @click="popUp = false" class="popup-close js-popup-close"></span>
					</div>
					<div class="popup-body">
						<div class="form-row">
							<div class="form-col-12">
								<div class="form-group">
									<label class="form-label">{{$t('Email')}}</label>
									<input v-model="email" type="text" class="form-text">
								</div>
							</div>
							<div class="form-col-12">
								<div class="form-group">
									<label class="form-label">{{$t('Password')}}</label>
									<input v-model="password" type="password" class="form-text">
								</div>
							</div>
							<div class="form-col-12">
								<div class="form-group">
									<button class="btn btn_lg" @click.prevent="login()" value="Login">{{$t("Login")}}</button>
									<p class="redirect-action">
										<a @click="activeNavTab = 'Reset'">{{$t('Reset password')}}</a>
										<a @click="activeNavTab = 'Registration'">{{$t('Registration')}}</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</form>

				<form class="reset" v-if="activeNavTab === 'Reset'">
					<div class="popup-header">
						<h2 class="popup-title">{{$t('Reset password')}}</h2>
						<span @click="popUp = false" class="popup-close js-popup-close"></span>
					</div>
					<div class="popup-body">
						<div class="form-row">
							<div class="form-col-12">
								<div class="form-group">
									<label class="form-label">{{$t('Email')}}</label>
									<input v-model="email" type="email" class="form-text">
								</div>
							</div>
							<div class="form-col-12">
								<div class="form-group">
									<button class="btn btn_lg" @click.prevent="reset()">{{$t('Send email')}}</button>
									<p class="redirect-action">
										<a @click="activeNavTab = 'Login'">{{$t('Login')}}</a>
										<a @click="activeNavTab = 'Registration'">{{$t('Registration')}}</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as _ from 'lodash'
import { mixin as clickaway } from 'vue-clickaway'
import { messages } from '../languages/main'
import Notifications from '@/components/Notifications'
import Authentication from '@/components/Authentication'

export default {
  data () {
    return {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: '',
      vat_number: '',
      company_name: '',
      language: '',
      showSearchResults: false,
      popUp: false,
      activeNavTab: 'Reset',
      headerIsActive: false,
      currentLanguage: this.$route.params.language || 'en',
      showLogin: false,
      languagesList: []
    }
  },
  mixins: [ clickaway ],
  components: {
    'notifications': Notifications,
    'authentication': Authentication
  },
  computed: {
    ...mapGetters({
      products: 'getSearchProducts',
      isLoading: 'isSearchLoading',
      query: 'getSearchQuery'
    })
  },
  async mounted () {
    const user = await this.$refs.authentication.login()
    if (!user || !user.email) {
      this.showLogin = false
    } else {
      this.$root.user = user
      this.showLogin = true
    }
  },
  async created () {
    this.selectLanguage()
  },
  methods: {
    selectLanguage () {
      const { $route } = this
      const { language } = $route.params

      this.currentLanguage = language || this.$cookie.get('language') || 'en'
      this.$cookie.set('language', this.currentLanguage, { expires: '1Y' })
      this.languagesList = Object.keys(messages)
      if (!this.languagesList.includes(this.currentLanguage)) {
        this.$cookie.set('language', 'en', { expires: '1Y' })
        this.currentLanguage = 'en'
        this.$router.push('/en')
      }
    },
    setLang: function () {
      this.$store.dispatch('setLang', this.currentLanguage)
      this.$cookie.set('language', this.currentLanguage, { expires: '1Y' })
      this.updateUrl()
      this.$root.$emit('setLanguage', this.currentLanguage)
    },
    updateUrl () {
      if (this.$route.params.language) {
        this.$router.push('/' + this.currentLanguage + this.$route.fullPath.replace('/' + this.$route.params.language, ''))
      } else {
        this.$router.push('/' + this.currentLanguage + this.$route.fullPath)
      }
    },
    // ...mapActions({
    //   toggleShoppingCartSidebar: 'toggleShoppingCartSidebar'
    // }),
    searchProductClick (name) {
      this.showSearchResults = false
      this.$router.push(`/${this.currentLanguage}/product/${name.replace('/', '%2F')}`)
    },
    onBlurSearch () {
      this.showSearchResults = false
    },
    onFocusSearch () {
      this.showSearchResults = true
    },
    search: _.debounce(async function (value) {
      if (!value) return

      this.showSearchResults = false
      const { $store } = this
      await $store.dispatch('fetchSearchProducts', value)
      this.showSearchResults = true
    }, 500),
    onClickSearchProduct (category) {
      console.log('onClickTopCategory', category)
    },
    showSearchResult (query) {
      this.showSearchResults = false
      this.$router.push('/search?query=' + query)
    },
    async login () {
      const { email, password } = this
      const { $store } = this
      if (!this.validateData()) {
        return
      }
      const response = await $store.dispatch('authenticate', { email, password, language: this.currentLanguage })
      if (response.statusText === 'error') {
        this.$refs.notification.showAlert(response.message)
      } else {
        const user = JSON.parse(response.user)
        this.$cookie.set('token', user.token, { expires: '1Y' })
        this.$root.user = user
        this.showLogin = true
        this.popUp = false
        this.$root.$emit('loginEvent')
      }
    },
    validateData () {
      if (!this.email || !this.password) {
        this.$refs.notification.showAlert(messages[this.currentLanguage]['Please fill all fields'], 3000)
        return false
      }
      return true
    },
    logout () {
      this.showLogin = false
      this.$cookie.delete('token')
      location.reload()
    },
    async reset () {
      const { email } = this
      const { $store } = this
      const response = await $store.dispatch('reset', { email, language: this.currentLanguage })
      if (response.statusText === 'error') {
        this.$refs.notification.showAlert(response.message)
      } else if (response.statusText === 'success') {
        this.popUp = false
        this.$refs.notification.showAlert(messages[this.currentLanguage]['Please follow the link in your email to continue'], 10000, true)
      }
    },
    async registration () {
      const { email, password, first_name, last_name, company_name, vat_number, currentLanguage } = this
      const { $store } = this
      if (!this.validateRegistrationData()) {
        return
      }
      const response = await $store.dispatch('signUp', { email, password, first_name, last_name, company_name, vat_number, language: currentLanguage })
      if (response.statusText === 'error') {
        this.$refs.notification.showAlert(response.message)
      } else if (response.statusText === 'success') {
        this.activeNavTab = 'Login'
        this.$refs.notification.showAlert(messages[this.currentLanguage]['User registered'], 3000, true)
      }
    },
    validateRegistrationData () {
      if (!this.email || !this.password || !this.first_name || !this.last_name) {
        this.$refs.notification.showAlert(messages[this.currentLanguage]['Please fill all required fields *'])
        return false
      }
      if (this.password.length < 6) {
        this.$refs.notification.showAlert(messages[this.currentLanguage]['Password too weak'])
        return false
      }
      if (this.password !== this.confirm_password) {
        this.$refs.notification.showAlert(messages[this.currentLanguage]['Passwords do not match'])
        return false
      }
      return true
    },
    goToCart () {
      if (this.$root.user && this.$root.user.email) {
        this.$router.push('/' + this.currentLanguage + '/cart')
      } else {
        this.activeNavTab = 'Login'
        this.popUp = true
      }
    },
    loginPopup () {
      this.activeNavTab = 'Login'
      this.popUp = true
    },
    goTo (route) {
      this.$router.push('/' + this.currentLanguage + '/' + route)
    }
  }
}
</script>

<style>
  #search_form li span {
    cursor: pointer;
    color: #212121;
  }
	select {
		background-color: #3e6d00;
		color: #fff;
		cursor: pointer;
		padding: 5px 0px 5px 5px;
		border: 0px;
		outline: 0px;
	}
	select > option {
		background-color: #3e6d00;
		color: #fff;
		cursor: pointer;
		text-align: center;
	}
	.header-language {
		margin-right: 0px;
	}
	.select-option {
		padding-right: 0px;
	}
</style>
