<template>
<div class="page-wrapper category-management">
  <notifications ref="notification"/>
  <authentication ref="authentication"/>
  <h3>Categories management</h3>
  <table>
    <tr>
      <td class="category-list">
        <div class="list-group">
          <label for="ordering" class="equalisationLabel">Click to view child items</label><br>
          <label for="ordering" class="equalisationLabel">Drag-and-drop to order</label><br>
          <label for="ordering" class="equalisationLabel">Can delete only new items(for testing to not miss something)</label>
        </div>
        <draggable id="ordering" class="nav side-nav nicescroll-bar list-group" v-model="groups" @start="drag=true" @end="onEndMain">
          <div class="list-group-item" v-for="group in groups" :key="group.id">
            <a @click.prevent="onClickCategoryLvl1(group)" :class="{collapsed: group.open}">
              <!-- <div class="pull-left order-buttons">
                <button @click.stop="changeOrder(group.id, 'up')"><i class="zmdi zmdi-chevron-up"></i></button>
                <button @click.stop="changeOrder(group.id, 'down')"><i class="zmdi zmdi-chevron-down"></i></button>
              </div> -->
              <div class="pull-left">
                <template v-if="currentLanguage=='en'">
                  <span class="right-nav-text">{{group.name}}</span>
                </template>
                <template v-if="currentLanguage=='et'">
                  <span class="right-nav-text">{{group.name_et}}</span>
                </template>
                <template v-if="currentLanguage=='fi'">
                  <span class="right-nav-text">{{group.name_fi}}</span>
                </template>
              </div>
              <div class="pull-right close-button" v-if="checkDate(group.created_at) === 1" @click.stop="showModal(group.id)">X</div>
              <div class="clearfix"></div>
            </a>
            <draggable class="list-group collapse collapse-level-1" @start="drag=true" @end="onEndSub" :class="{in: group.open}">  
              <div class="list-group-item" v-for="subgroup in getGroupSubGroupById(group.id)" 
              :data-parent-category-id="subgroup.parent_category_id"
              :data-id="subgroup.id"
              :data-order="subgroup.order">
                <a @click.prevent="onClickCategoryLvl2(subgroup)" :class="{collapsed: subgroup.open}">
                  <div class="pull-left">
                    <template v-if="currentLanguage=='en'">
                      <span class="right-nav-text">{{subgroup.name}}</span>
                    </template>
                    <template v-if="currentLanguage=='et'">
                      <span class="right-nav-text">{{subgroup.name_et}}</span>
                    </template>
                    <template v-if="currentLanguage=='fi'">
                      <span class="right-nav-text">{{subgroup.name_fi}}</span>
                    </template>
                  </div>
                  <!-- <div class="pull-right">
                    <i :class="subgroup.open ? 'zmdi-caret-up': 'zmdi-caret-down'" class="zmdi"></i>
                  </div> -->
                  <div class="pull-right close-button" v-if="checkDate(subgroup.created_at) === 1" @click.stop="showModal(subgroup.id)">
                    X
                  </div>

                  <div class="clearfix"></div>
                </a>
                <ul :class="{in: subgroup.open}" class="collapse collapse-level-2">
                  <li v-for="product in getSubGroupProductsById(subgroup.id)">
                    <router-link :to="`/${currentLanguage}/product/${product.name}`">{{product.name}}</router-link>
                  </li>
                </ul>
              </div>
              <div class="list-group-item" v-for="product in products[group.id]">
                <router-link :to="`/${currentLanguage}/product/${product.name}`">{{product.name}}</router-link>
              </div>
            </draggable>
          </div>
        </draggable>
      </td>
      <td>

        <div class="tab-struct custom-tab-1 category-management-tabs product-desc-tab">
          <ul role="tablist" class="nav nav-tabs" id="myTabs_7">
            <!--<li role="presentation" class="next"><a><span>Description</span></a></li>-->
            <li role="presentation" v-bind:class="[{ 'active' : activeTab === 'create' }]"><a v-on:click="tabs('create')"><span>Create category</span></a></li>
            <li role="presentation" v-bind:class="[{ 'active' : activeTab === 'equalisation' }]"><a v-on:click="tabs('equalisation')"><span>Equalisation</span></a></li>
            <!--<li role="presentation" class=""><a><span>Review<span class="inline-block">(<span class="review-count">0</span>)</span></span></a></li>-->
          </ul>
          <div class="tab-content">
            <div id="descri_tab_detail" class="tab-pane fade active in pt-0" role="tabpanel">
              <div class="table-wrap">
                <div class="table-responsive">

                  <div v-if="activeTab === 'create'">
                    <div>
                      <label for="parentCategoryId">Append to Category</label>
                      <select class="form-control" name="" v-model="newCategory.parentCategoryId" id="parentCategoryId">
                        <option value="0">Main Category</option>
                        <option v-for="group in groups" :value="group.id">&nbsp-{{group.name}}</option>
                      </select>
                      <label for="name">English Name</label>
                      <input type="text" class="form-control" v-model="newCategory.name" id="name">
                      <label for="nameEt">Estonian Name</label>
                      <input type="text" class="form-control" v-model="newCategory.nameEt" id="nameEt">
                      <label for="nameFi">Finish Name</label>
                      <input type="text" class="form-control" v-model="newCategory.nameFi" id="nameFi">
                      <button @click="createCategory()" class="btn btn-success"><span class="btn-text">{{$t("Create cetegory")}}</span></button>
                    </div>
                  </div>
                  <div v-if="activeTab === 'equalisation'">
                    <label for="parentCategoryId" class="equalisationLabel">Append to Category</label>
                    <select class="form-control" name="" v-model="newCategory.parentCategoryId" id="parentCategoryId">
                      <option value="0">Main Category</option>
                      <option v-for="group in groups" :value="group.id">&nbsp- {{group.name}}</option>
                    </select>
                    <template>
                      <div>
                        <b-form-group>
                          <b-form-radio-group id="radios2" v-model="selected" name="radioSubComponent">
                            <b-form-radio value="all">All categories</b-form-radio>
                            <b-form-radio value="related">Related</b-form-radio>
                            <b-form-radio value="notRelated">Not related</b-form-radio>
                          </b-form-radio-group>
                        </b-form-group>
                      </div>
                    </template>
                    <label for="parentCategoryId" class="equalisationLabel">From Categories</label>
                    <div v-if="selected === 'all'" class="list-group categories">
                      <div class="list-group-item" v-for="category in categories" @click="confirmAppend(category.id, category.parent_category_id)">{{category.name}}</div>
                    </div>
                    <div v-if="selected === 'related'" class="list-group categories">
                      <div class="list-group-item" v-for="category in relatedCategories" @click="confirmAppend(category.id, category.parent_category_id)">{{category.name}}</div>
                    </div>
                    <div v-if="selected === 'notRelated'" class="list-group categories">
                      <div class="list-group-item" v-for="category in notRelatedCategories" @click="confirmAppend(category.id, category.parent_category_id)">{{category.name}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </table>

  <div id="container" v-if="isShowModal" @click="isShowModal = false">
    <div id="exampleModal" class="reveal-modal" @click.stop="">
      <div class="modal-body">
        Delete category and unrelate all child objects?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" @click="isShowModal = false">Close</button>
        <button type="button" class="btn btn-success" data-dismiss="modal" @click.stop="deleteCategory()">Confirm</button>
      </div>
    </div>
  </div>

  <div class="modal" v-if="isConfirmAppending" id="comfirmAppending" @click="isConfirmAppending = false">
    <div class="modal-dialog">
      <div class="modal-content" @click.stop="">

        <!-- Modal Header -->
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click="isConfirmAppending = false">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          Append category to another one or delete it and move all child items to another category?
          <div>
            <b-form-group>
              <b-form-radio-group id="radios3" v-model="equalizeType" name="equalizeType">
                <b-form-radio value="append">Append</b-form-radio>
                <b-form-radio value="move">Equalize</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="isConfirmAppending = false">Close</button>
          <button type="button" class="btn btn-success" data-dismiss="modal" @click.stop="moveCategory()">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import { messages } from '../languages/main'
import Notifications from '@/components/Notifications'
import Authentication from '@/components/Authentication'

export default {
  data () {
    return {
      products: {},
      curentLanguage: 'en',
      dragged: {},
      options: {},
      currentCaegoryId: 0,
      activeTab: 'create',
      categories: [],
      isShowModal: false,
      isConfirmAppending: false,
      selected: 'all',
      equalizeType: '',
      newCategory: {
        name: '',
        nameEt: '',
        nameFi: '',
        parentCategoryId: 0
      },
      currentGroup: null,
      currentSubGroup: null
    }
  },
  components: {
    'draggable': draggable,
    'notifications': Notifications,
    'authentication': Authentication
  },
  async mounted () {
    this.setLanguage()
    this.$refs.authentication.loginRedirect()
  },
  async created () {
    const { $store } = this
    $store.dispatch('fetchProductGroups')
    this.currentLanguage = this.$route.params.language || this.$cookie.get('language') || 'en'
    this.categories = await $store.dispatch('getCategoryList')
  },
  computed: {
    ...mapGetters({
      groups: 'getSidebarProductGroups'
    }),
    relatedCategories () {
      return this.categories.filter(category => {
        if (category.parent_category_id !== null) {
          return category
        }
      })
    },
    notRelatedCategories () {
      return this.categories.filter(category => {
        if (category.parent_category_id === null) {
          return category
        }
      })
    }
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
      this.currentCaegoryId = this.currentCaegoryId !== 0 ? id : 0
      return this.$store.getters.getsidebarGroupSubgroupsById(id)
    },
    async onClickCategoryLvl1 (group) {
      const { $store } = this
      await this.getGroupProducts(group.id)
      await $store.dispatch('fetchSubGroupProducts', group)
      $store.dispatch('toggleCategory', group)
      this.currentGroup = group.id
    },
    async onClickCategoryLvl2 (subgroup) {
      const { $store } = this
      await $store.dispatch('fetchGroupProducts', subgroup)
      $store.dispatch('toggleSubCategory', subgroup)
    },
    onClickCategoryLvl3 (product) {
      const { $route } = this
      $route.go(`/${this.currentLanguage}/product/:${product.name}`)
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
    async onEndMain (evt) {
      const { $store } = this
      const newIndex = evt.newIndex
      const oldIndex = evt.oldIndex
      if (newIndex >= this.groups.length) {
        var k = newIndex - this.groups.length
        while ((k--) + 1) {
          this.groups.push(undefined)
        }
      }
      this.groups.splice(newIndex, 0, this.groups.splice(oldIndex, 1)[0])
      await $store.dispatch('changeCategoriesOrder', {id: this.groups[newIndex].id, oldOrder: oldIndex, newOrder: newIndex, parent_category: this.groups[newIndex].parent_category_id})
    },
    async onEndSub (evt) {
      const { id, parentCategoryId } = evt.item.dataset
      const { $store } = this
      const newIndex = evt.newIndex
      const oldIndex = evt.oldIndex
      await $store.dispatch('changeCategoriesOrder', {id: id, oldOrder: oldIndex, newOrder: newIndex, parent_category: parentCategoryId})
    },
    tabs (tab) {
      this.activeTab = tab
    },
    async createCategory () {
      if (!this.newCategory.name && !this.newCategory.nameEt && !this.newCategory.nameFi) {
        this.$refs.notification.showAlert(messages[this.curentLanguage]['Please fill category name at least on one language'])
        return
      }
      const { $store } = this
      await $store.dispatch('createCategory', this.newCategory)
      $store.dispatch('fetchProductGroups')
      this.categories = await $store.dispatch('getCategoryList')
    },
    checkDate (date) {
      const result = new Date(date) > new Date('Tue Mar 28 2018 03:00:00 GMT+0300 (EEST)') ? 1 : 0
      return result
    },
    showModal (id) {
      console.log(id)
      this.isShowModal = true
      this.categoryIdToDelete = id
    },
    async deleteCategory () {
      const { $store } = this
      await $store.dispatch('deleteCategory', {id: this.categoryIdToDelete})
      await $store.dispatch('fetchProductGroups')
      this.categories = await $store.dispatch('getCategoryList')
      this.isShowModal = false
    },
    confirmAppend (id, parent) {
      this.isConfirmAppending = true
      this.categoryMoveId = id
    },
    async moveCategory () {
      if (!this.equalizeType) {
        return
      }
      const { $store } = this
      await $store.dispatch('moveCategory', {id: this.categoryMoveId, new_parent: this.newCategory.parentCategoryId, type: this.equalizeType})
      await $store.dispatch('fetchProductGroups')
      this.categories = await $store.dispatch('getCategoryList')
      this.isConfirmAppending = false
    }
  }
}
</script>

<style>

.category-management .nav {
  display: block;
}
.category-list li {
  display: block; }
  .category-list li a {
    color: #666666;
    display: block;
    padding: 5px 0; }
  .category-list li i {
    margin-right: 8px;
    color: #3d4d5d; }

  .category-list .navbar-nav>li {
  float: initial;  
}

.category-list>ul>li:nth-child(odd)>a {
  background: #f3f3f3;
}

.category-list>ul>li>a.collapsed {
  background: #c3efff;
}

.category-list>ul>li>a:hover {
  cursor: pointer;
  background: #e5f8ff;
}

.category-list .collapse-level-1 li {
  margin-left: 35px;
}

.category-list .order-buttons {
  margin-right: 10px;
}

.category-list .order-buttons button {
  border: 1px solid #a7a7a7;
  border-radius: 2px;
}

.category-list .order-buttons button:not(.gu-mirror):hover {
  background: #b1dbff;
}

.category-management>table {
  width: 100%;
}
.category-management>table>tr>td {
  width: 50%;
}

.category-management .close-button:hover {
  cursor: pointer;
  color: red;
}

.category-management .modal.showModal {
  display: block;
}

.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter: alpha(opacity=80);
}

.category-management-tabs,
.category-management .list-group {
  width: 90%;
  margin: auto;
}

.category-management-tabs button.btn,
.category-management-tabs #descri_tab_detail {
  margin-top: 20px;
}

.category-management-tabs .form-control {
  margin-bottom: 5px;
}

.category-management h3 {
  margin: 0 0 20px 30px
}

.category-management .list-group.categories {
  overflow-y: scroll;
  height: 500px;
}

.category-management #radios2 label{
  width: 20%;
}

.category-management .equalisationLabel {
  color: #212121
}

.list-group-item {
    position: relative;
    border: 1px solid;
    border-radius: 3px;
    padding: 10px;
    margin: 3px;
}
.category-management-tabs .form-control {
  display: block;
}
.category-management .list-group .collapse-level-1 {
  display: none;
}
.category-management .list-group .collapse-level-1.in {
  display: block;
}
.close-button {
  float: right;
  height: 22px;
  width: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
  color: red;
  border-radius: 3px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding-top: 2px;
}
.close-button:hover {
  cursor: pointer;
}
.category-management-tabs.product-desc-tab  ul li {
  width: 25%;
  display: inline-block;
  text-align: center;
  height: 29px;
  padding-top: 4px;
}
.category-management-tabs.product-desc-tab  ul li.active {
  background: #c5e4ff;
}

#container {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background-color: rgba(22,22,22,0.5); /* complimenting your modal colors */
    visibility: visible;
    display: block;
}
.reveal-modal {
  position: relative;
  top: 25%;
  WIDTH: 50%;
  margin-left: AUTO;
  MARGIN-RIGHT: AUTO;
  height: 200px;
  background: #fff;
  text-align: center;
  padding-top: 40px;
}
.modal-footer {
  margin-top: 40px;
}
.modal-body {
  font-size: 18px;
}
</style>
