<template>
  <div id="app">
    <loader/>
    <router-view/>
  </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
  name: 'app',
  components: {
    'loader': Loader
  }
}
</script>
