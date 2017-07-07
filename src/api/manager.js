
const apiManager = {
  _modules: [],

  http: {
    get () { return this._modules['http'] }
  },

  developer: {
    get () { return this._modules['developer'] }
  }
}


export default apiManager
