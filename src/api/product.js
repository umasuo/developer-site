import { http } from 'src/api/client'

export default {
  async fetchProdcutTypes () {
    const productTypes = (await http.get('products/types')).data
    return productTypes
  }
}
