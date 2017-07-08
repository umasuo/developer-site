import client from 'src/api/client'
import developer from 'src/api/developer'
import product from 'src/api/product'

export default {
  client, // config the axios http library & store api state and persist them in localstorage

  // api endpoints import http (axios instance) from Client, set and get state to Client,
  developer,
  product
}
