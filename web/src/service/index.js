import vue from 'vue'
import async from 'async'

const API_PROXY_URL = `/api/proxy`
const API_URL = `/api`

export default {
  async authenticate ({email, password, language}) {
    const { body } = await vue.http.post(`${API_URL}/authenticate`, { email, password, language })
    return body
  },
  async authenticateByToken ({token}) {
    const { body } = await vue.http.post(`${API_URL}/authenticate_by_token`, { token })
    return body
  },
  async signUp ({ email, password, first_name, last_name, company_name, vat_number, language }) {
    const { body } = await vue.http.post(`${API_URL}/registration`, { email, password, first_name, last_name, company_name, vat_number, language })
    return body
  },
  async fetchProductGroups () {
    const { body } = await vue.http.get(`${API_URL}/categories`)
    return body
    // return body.records
    //            .map(cat => ({
    //              name: cat.name,
    //              id: cat.id,
    //              productGroupID: cat.productGroupID,
    //              _: cat
    //            }))
  },
  async fetchProductSubGroups ({id}) {
    const { body } = await vue.http.get(`${API_URL}/categories/${id}`)
    return body
  },
  async fetchSearchProducts ({name}) {
    const { body } = await vue.http.get(`${API_URL}/products?search=${name}`)
    return body
  },
  async fetchGroupProducts ({id}) {
    const { body } = await vue.http.get(`${API_URL}/categories/${id}/products`)
    return body
  },
  async fetchCategoryProducts ({categoryId}) {
    const { body } = await vue.http.get(`${API_PROXY_URL}/getProducts&groupID=${categoryId}`)
    return body.records
  },
  async fetchProductDetail ({name}) {
    const { body } = await vue.http.get(`${API_URL}/products/${name}`)
    return body
    // const { body } = await vue.http.get(`${API_PROXY_URL}/getProducts&getProductPictures=1&getProductStock=1&displayedInWebshop=1&getMatrixVariations=1&getRelatedFiles=1&posGetVariationDescription=1&attributes=1&getFIFOCost=1&getStockInfo=1&productID=${id}`)
    // return body.records
  },
  fetchProductsDetails: ({productsIds}) => new Promise((resolve, reject) => {
    const urls = []

    while (productsIds.length > 20) {
      urls.push(`${API_PROXY_URL}/getProducts&productIDs=${productsIds.slice(0, 19)}`)
      productsIds = productsIds.slice(19)
    }
    urls.push(`${API_PROXY_URL}/getProducts&productIDs=${productsIds}`)

    async.map(urls, async (url, callback) => {
      const { body } = await vue.http.get(url)
      callback(null, body.records)
    }, function (err, products) {
      if (err) {
        return reject(err)
      }

      return resolve(Array.prototype.concat(...products))
    })
  }),
  async addToCart ({userId, product, quantity, language}) {
    const { body } = await vue.http.post(`${API_URL}/add_to_cart`, { userId, product, quantity, language })
    return body
  },
  async reset ({email, language}) {
    const { body } = await vue.http.post(`${API_URL}/reset`, { email, language })
    return body
  },
  async SetNewPassword ({ token, password, language }) {
    const { body } = await vue.http.post(`${API_URL}/new_password`, { token, password, language })
    return body
  },
  async getProductFromCart ({userId}) {
    const { body } = await vue.http.get(`${API_URL}/get_cart_products/${userId}`)
    return body
  },
  async getFee ({authenticated}) {
    const { body } = await vue.http.get(`${API_URL}/fee/${authenticated}`)
    return body
  },
  async getDiscounts ({authenticated}) {
    const { body } = await vue.http.get(`${API_URL}/discounts/${authenticated}`)
    return body
  },
  async deleteFromCart ({id}) {
    const { body } = await vue.http.delete(`${API_URL}/delete_from_cart/${id}`)
    return body
  },
  async storeOrder ({userId, language}) {
    const { body } = await vue.http.post(`${API_URL}/store_order/${userId}`, { language: language })
    return body
  },
  async getCatgoryProducts ({id}) {
    const { body } = await vue.http.get(`${API_URL}/categories/${id}/products`)
    return body
  },
  async changeCategoriesOrder ({id, oldOrder, newOrder, parent_category}) {
    const { body } = await vue.http.put(`${API_URL}/change_order`, { id, oldOrder, newOrder, parent_category })
    return body
  },
  async createCategory ({name, nameEt, nameFi, parentCategoryId}) {
    const { body } = await vue.http.post(`${API_URL}/create_category`, { name, nameEt, nameFi, parentCategoryId })
    return body
  },
  async deleteCategory ({id}) {
    const { body } = await vue.http.delete(`${API_URL}/delete_category/${id}`)
    return body
  },
  async getCategoryList () {
    const { body } = await vue.http.get(`${API_URL}/category_list`)
    return body
  },
  async moveCategory ({id, new_parent, type}) {
    const { body } = await vue.http.put(`${API_URL}/move_category`, { id, new_parent, type })
    return body
  }
}
