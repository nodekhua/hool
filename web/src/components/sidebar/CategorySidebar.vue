<template>
			<aside class="left-aside">
				<div class="show-aside" @click="categoryIsActive = !categoryIsActive">Categories</div>
				<div class="aside" v-bind:class="{ headerdisplay: categoryIsActive}"> 
					<div class="acc-item js-content-wrap" v-for="group in groups"  >
						<template v-if="currentLanguage=='en'">
              <div @click.prevent="onClickCategoryLvl1(group, group.open)" :class="{collapsed: group.open}" class="acc-header js-show-content">{{ group.name }}</div>
						</template>
						<template v-if="currentLanguage=='et'">
              <div @click.prevent="onClickCategoryLvl1(group, group.open)" :class="{collapsed: group.open}" class="acc-header js-show-content">{{ group.name_et }}</div>
						</template>
						<template v-if="currentLanguage=='fi'">
              <div @click.prevent="onClickCategoryLvl1(group, group.open)" :class="{collapsed: group.open}" class="acc-header js-show-content">{{ group.name_fi }}</div>
						</template>
            <div class="acc-body js-content" :class="{in: group.open}">
							<ul class="category-submenu">
								<li v-for="subgroup in getGroupSubGroupById(group.id)" class="js-content-wrap">
                  <template v-if="currentLanguage=='en'">
									  <div @click.prevent="onClickCategoryLvl2(subgroup, subgroup.open)" class="acc-header js-show-content">{{subgroup.name}}</div>
									</template>
                  <template v-if="currentLanguage=='et'">
									  <div @click.prevent="onClickCategoryLvl2(subgroup, subgroup.open)" class="acc-header js-show-content">{{subgroup.name_et}}</div>
									</template>
                  <template v-if="currentLanguage=='fi'">
									  <div @click.prevent="onClickCategoryLvl2(subgroup, subgroup.open)" class="acc-header js-show-content">{{subgroup.name_fi}}</div>
									</template>
                  <div class="acc-body js-content" :class="{in: subgroup.open}">
										<ul class="category-submenu">
											<li v-for="product in getSubGroupProductsById(subgroup.id)">
                        <a href="#" @click.prevent="goToProduct(product.name)">{{product.name}}</a>
                      </li>
										</ul>
									</div>
								</li>
                <div class="acc-body js-content" :class="{in: group.open}">
                  <li v-for="product in products[group.id]" class="js-content-wrap">
                    <a href="#" @click.prevent="goToProduct(product.name)">{{product.name}}</a>
                  </li>
                </div>
							</ul>
						</div>
					</div>
				</div>
			</aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  async created () {
    const { $store } = this
    await $store.dispatch('fetchProductGroups')
    this.openCategory()
    this.currentLanguage = this.$route.params.language || this.$cookie.get('language') || 'en'
  },
  data: function () {
    return {
      products: {},
      categoryIsActive: false,
      currentLanguage: 'en',
      categories_map: {}
    }
  },
  mounted () {
    this.setLanguage()
  },
  computed: {
    ...mapGetters({
      groups: 'getSidebarProductGroups'
    })
  },
  methods: {
    ...mapActions({
      onClickCategoryLvl2: 'toggleLvl2Category'
    }),
    getGroupProductsById (id) {
      return this.$store.getters.getsidebarGroupProductsById(id)
    },
    getSubGroupProductsById (id) {
      return this.$store.getters.getsidebarSubGroupProductsById(id)
    },
    getGroupSubGroupById (id) {
      return this.$store.getters.getsidebarGroupSubgroupsById(id)
    },
    async onClickCategoryLvl1 (group, isOpen) {
      const { $store } = this
      if (isOpen) {
        this.$cookie.delete('category')
      } else {
        this.$cookie.set('category', group.id)
      }
      await this.getGroupProducts(group.id)
      await $store.dispatch('fetchSubGroupProducts', group)
      $store.dispatch('toggleCategory', group)
    },
    async onClickCategoryLvl2 (subgroup, isOpen) {
      const { $store } = this
      if (isOpen) {
        this.$cookie.delete('subcategory')
      } else {
        this.$cookie.set('subcategory', subgroup.id)
      }
      await $store.dispatch('fetchGroupProducts', subgroup)
      $store.dispatch('toggleSubCategory', subgroup)
    },
    getProducts (subGroup) {
      const { getters } = this.$store
      return getters.getSubCategoryProducts(subGroup.id)
    },
    isActive (subGroup) {
      const { getters } = this.$store
      return subGroup.id === getters.getSidebaractiveProductGroupId
    },
    setLanguage () {
      this.$root.$on('setLanguage', (language) => {
        if (language) {
          this.currentLanguage = language
        }
      })
    },
    async getGroupProducts (group) {
      const { $store } = this
      if (group) {
        this.products[group] = await $store.dispatch('getCatgoryProducts', group)
      }
    },
    async openCategory () {
      let category = this.$cookie.get('category')
      let subcategory = this.$cookie.get('subcategory')
      await this.onClickCategoryLvl1({id: parseInt(category)}, false)
      await this.onClickCategoryLvl2({id: parseInt(subcategory)}, false)
    },
    goToProduct (product) {
      this.$router.push(`/${this.currentLanguage}/product/${product.replace('/', '%2F')}`)
    }
  }
}
</script>
