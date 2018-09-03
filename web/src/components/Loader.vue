<template>
  <transition name="loader" mode="out-in">
    <!--
    <div class="h-loader-wrapper" :class="{'is-loading': isLoading}">
    -->
    <div class="h-loader-wrapper" v-if="flase">
      <div class="h-loader-grid">
        <div class="h-loader h-loader-1"></div>
        <div class="h-loader h-loader-2"></div>
        <div class="h-loader h-loader-3"></div>
        <div class="h-loader h-loader-4"></div>
        <div class="h-loader h-loader-5"></div>
        <div class="h-loader h-loader-6"></div>
        <div class="h-loader h-loader-7"></div>
        <div class="h-loader h-loader-8"></div>
        <div class="h-loader h-loader-9"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoading: 'isAppLoading'
    })
  }
}
</script>

<style lang="css">
.h-loader-wrapper {
  transition: opacity 0.5s;
  opacity: 0.7;
}
.loader-enter {
  opacity: 0;
}
.loader-leave-active {
  opacity: 0;
}

.h-loader-wrapper {
  background-color: #E4F1FE;
  opacity: 50%;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
}

.h-loader-grid {
  width: 78px;
  height: 78px;
  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%);
}

.h-loader-grid .h-loader {
  width: 33%;
  height: 33%;
  background-color: #6C7A89;
  float: left;
  -webkit-animation: h-loader-y 1.5s infinite ease-in-out;
          animation: h-loader-y 1.5s infinite ease-in-out;
}transition: width 2s;
.h-loader-grid .h-loader-1 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.h-loader-grid .h-loader-2 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.h-loader-grid .h-loader-3 {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s; }
.h-loader-grid .h-loader-4 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.h-loader-grid .h-loader-5 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.h-loader-grid .h-loader-6 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.h-loader-grid .h-loader-7 {
  -webkit-animation-delay: 0s;
          animation-delay: 0s; }
.h-loader-grid .h-loader-8 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.h-loader-grid .h-loader-9 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }

.h-loader-2, .h-loader-8 {
  visibility: hidden;
}

@-webkit-keyframes h-loader-y {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
  }
}

@keyframes h-loader-y {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
  }
}
</style>
