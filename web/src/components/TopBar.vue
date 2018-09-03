<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <ul class="dropdown menu">
        <li class="menu-text">Hool</li>
        <li><router-link :to="'/login'">Login</router-link></li>
        <li><router-link :to="'/'">Products</router-link></li>
      </ul>
    </div>
    <div class="top-bar-right">
      <ul class="menu">
        <li><a href="#">My Account</a></li>
        <li><a href="#" target="_blank"><i class="fa fa-shopping-cart"></i></a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
