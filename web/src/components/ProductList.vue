<template>
  <div class="medium-9 medium-push-3 small-12 columns">
    <div class="medium-12 small-12 columns product" v-for="product in getCategoryProducts()">
      <div class="single-product-wrap">
        <div class="single-product medium-4 small-12 columns">
          <div class="product-img">
            <a href="single-product.html">
              <img v-for="image in product.images" :src="image.thumbURL" alt="">
            </a>
          </div>
        </div>
        <div class="product-info medium-8 small-12 columns">
          <h6><a @click.prevent="doNav(product)" href="single-product.html">{{product.name}}</a></h6>
          <div class="price">
            <p>price: {{product.price}}</p>
            <p>priceWithVat: {{product.priceWithVat}}</p>
            <p>productVariations:
              <ul>
                <li v-for="variation in product.productVariations">{{variation}}</li>
              </ul>
            </p>
          </div>
          <ul class="menu product-options">
            <li><a href="list-shop.html#" class="button">add to cart</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    doNav (product) {
      const { $router } = this
      const { productID } = product
      $router.push(`/product/${productID}`)
      console.log(product)
    },
    getCategoryProducts (id) {
      const { $store } = this
      const activeProductGroupId = $store.getters.getSidebaractiveProductGroupId
      return $store.getters.getsidebarGroupProductsById(activeProductGroupId)
    }
  }
}
</script>

<style lang="css">
</style>
