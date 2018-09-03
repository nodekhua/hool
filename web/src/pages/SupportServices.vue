<template>
  <div class="wrapper">
    <navbar/>
    <sidebar-left/>
    <authentication ref="authentication"/>
    <div class="content-inner">
      <div class="content" v-if="curentLanguage === 'en'">
        <iframe src="http://hool.ee/p/3.html" frameBorder="0" onload="resizeIframe(this)" style="width: 100%; border: 0" hspace="0" vspace="0" marginheight="0" marginwidth="0"></iframe>
      </div>
      <div class="content" v-if="curentLanguage === 'et'">
        <iframe src="http://hool.ee/p/3et.html" frameBorder="0" onload="resizeIframe(this)" style="width: 100%; border: 0" hspace="0" vspace="0" marginheight="0" marginwidth="0"></iframe>
      </div>
      <div class="content" v-if="curentLanguage === 'fi'">
        <iframe src="http://hool.ee/p/3.html" frameBorder="0" onload="resizeIframe(this)" style="width: 100%; border: 0" hspace="0" vspace="0" marginheight="0" marginwidth="0"></iframe>
      </div>
    </div>   
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import CategorySidebar from '@/components/sidebar/CategorySidebar'
import RightSidebar from '@/components/sidebar/RightSidebar'

export default {
  components: {
    'navbar': Navbar,
    'sidebar-left': CategorySidebar,
    'sidebar-right': RightSidebar
  },
  created () {
    this.watchLangChange()
  },
  data () {
    return {
      curentLanguage: this.$route.params.language
    }
  },
  methods: {
    watchLangChange () {
      this.$root.$on('setLanguage', (language) => {
        if (language) {
          this.curentLanguage = language
        }
      })
    }
  }
}
</script>
