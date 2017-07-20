import { http } from 'src/api/client'

export default {
  async fetchProdcutTypes () {
    const productTypes = (await http.get('products/types')).data
    return productTypes
  },

  async createProduct (productDraft) {
    const hasAllRequire = productDraft &&
                          productDraft.name &&
                          productDraft.productTypeId &&
                          productDraft.type
    if (!hasAllRequire) {
      throw new Error('name, productTypeId and type are required')
    }

    const product = (await http.post('products', productDraft)).data
    return product
  },

  async updateProduct (pid, request) {
    const product = (await http.put('products/' + pid, request)).data
    return product
  },

  async deleteProduct (pid, version) {
    await http.delete(`products/${pid}?version=${version}`)
  },

  async fetchProduct (pid) {
    const product = (await http.get('products/' + pid)).data
    return product
  },

  async fetchDeveloperProducts (developerId) {
    const products = (await http.get('products/')).data
    return products
  },

  async generateUnionId (productId, quantity) {
    const ids = await http.post('devices/unions', {
      productId,
      quantity
    })
    return ids.data
  },

  async publishProduct (pid, version) {
    const product = await http.put(`products/${pid}/status`, {
      type: 'PUBLISH', version: version
    })
    return product
  },

  async revokeProduct (pid, version) {
    const product = await http.put(`products/${pid}/status`, {
      type: 'REVOKE', version: version
    })
    return product
  }
}
