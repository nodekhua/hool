<template>  
  <div class="wrapper">
    <navbar/>
    <sidebar-left/>
    <div class="page-wrapper">
      <div class="content">
        <div class="content-inner">
          <ul>
            <li v-for="product in products"  @click="product ? goToProduct(product.name) : ''" style="margin-bottom:10px">
              <div class="left" style="width:7%">
                <img v-if="product" v-bind:src=product.picture alt="" style="max-height:60px">
              </div>
              <div class="right">
                <p>{{ product.name }}<p>
                <p>{{ product.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <footerbar/>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import CategorySidebar from '@/components/sidebar/CategorySidebar'
import RightSidebar from '@/components/sidebar/RightSidebar'
import Footer from '@/components/Footer'

export default {
  components: {
    'navbar': Navbar,
    'sidebar-left': CategorySidebar,
    'sidebar-right': RightSidebar,
    'footerbar': Footer
  },
  data () {
    return {
      currentLanguage: this.$route.params.language || this.$cookie.get('language') || 'en'
    }
  },
  mounted () {
    const { query } = this.$route.query
    this.search(query)
  },
  computed: {
    ...mapGetters({
      products: 'getSearchProducts',
      isLoading: 'isSearchLoading',
      query: 'getSearchQuery'
    })
  },
  methods: {
    async search (query) {
      const { $store } = this
      const products = await $store.dispatch('fetchSearchProducts', query)
      this.products = products
    },
    goToProduct (product) {
      this.$router.push(`/${this.currentLanguage}/product/${product.replace('/', '%2F')}`)
    }
  },
  watch: {
    '$route.query' (newQuery, oldQuery) {
      let { query } = newQuery
      this.products = this.search(query)
    }
  }
}
</script>

<style scoped>
ul {
  float: left;
  width: 100%;
  margin: 0;
  padding: 0;
}
li {
  float: left;
  width: 100%;
  border-bottom: 2px solid black;
  margin-bottom: 50px;
  cursor: pointer;
}
.left > img {
  max-width: 100%;
  height: auto;
}
li > .left {
  float: left;
  width: 20%;
}
li > .right {
  float: left;
  width: 80%;
  text-align: left;
}
</style>