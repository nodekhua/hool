<template>
  <div>
    <top-bar/>
    <div class="content-area">
      <div class="row">
        <product-list/>
        <category-sidebar/>
      </div>
    </div>
  </div>
</template>

<script>
import CategorySidebar from '@/components/CategorySidebar'
import ProductList from '@/components/ProductList'
import TopBar from '@/components/TopBar'

export default {
  components: {
    'top-bar': TopBar,
    'product-list': ProductList,
    'category-sidebar': CategorySidebar
  },
  methods: {
    getCategoryProducts (id) {
      const { $store } = this
      const activeProductGroupId = $store.getters.getSidebaractiveProductGroupId
      return $store.getters.getsidebarGroupProductsById(activeProductGroupId)
    }
  }
}
</script>

<style>
.menu .menu {
  margin-left: 20px;
}

.product {
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
}
</style>
