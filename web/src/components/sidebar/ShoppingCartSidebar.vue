<template>
  <div :class="{'cart-sidebar-open': isSidebarOpen}" class="fixed-sidebar-right">
    <div class="right-sidebar">
      <div class="row cart-item" v-for="{count, product}, id in cart">
        <div class="col-sm-12">
          <strong>
            {{product.name}}
          </strong>
          <p>
            {{count||1}}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <button type="button" class="btn">View Cart</button>
        </div>
        <div class="col-sm-6">
          <button type="button" class="btn">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isSidebarOpen: 'isShoppingCartSidebarOpen',
      cart: 'getShoppingCart'
    })
  }
}
</script>

<style lang="scss" scoped>
  .cart-sidebar-open {
    margin-right: 0px;
  }
  .right-sidebar {
    & > .row {
      padding: 20px;
    }
    .cart-item {
      padding-top: 40px;
    }
  }
</style>
