<template>
    <div class="wrapper">
        <navbar ref="navbar"/>
        <sidebar-left/>
		<notifications ref="notification"/>
		<authentication ref="authentication"/>
        <div class="page-wrapper">
            <div class="content-inner" v-if="news">
                <div class="content">
                    <div class="product">
                        <h1 class="product-title">{{ news.ndate }}</h1>
                        <div class="product-info">
                          <div class="news-descr"><img :src="news.image"/>
                            <p v-html="news.fulltext"></p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import CategorySidebar from '@/components/sidebar/CategorySidebar'
import ShoppingCartSidebar from '@/components/sidebar/ShoppingCartSidebar'
import Footer from '@/components/Footer'
import Notifications from '@/components/Notifications'
import Authentication from '@/components/Authentication'

export default {
  data () {
    return {
      news: '',
      curentLanguage: this.$route.params.language || this.$cookie.get('language') || 'en'
    }
  },
  components: {
    'navbar': Navbar,
    'sidebar-left': CategorySidebar,
    'sidebar-right': ShoppingCartSidebar,
    'footerbar': Footer,
    'notifications': Notifications,
    'authentication': Authentication
  },
  created: function () {
    this.fetchData()
  },
  watch: {
    '$route.params.id': function (id) {
      this.fetchData()
    }
  },
  mounted () {
    this.setLanguage()
  },
  methods: {
    setLanguage () {
      this.$root.$on('setLanguage', (language) => {
        if (language) {
          this.curentLanguage = language
        }
      })
    },
    fetchData () {
      this.$http.get('/api/news/' + this.$route.params.id).then(result => { this.news = result.data })
    }
  }
}
</script>

<style lang="scss" scoped>
  .news-descr {
    float: left;
    width: 100%;
    img {
      float: left;
      padding: 10px;
      background: #fafafa;
      border: 1px solid #d7d7d7;
      margin-right: 20px;
    }
  }
</style>