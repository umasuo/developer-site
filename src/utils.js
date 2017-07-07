export default {
  validateEmail (email) {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return re.test(email)
  },

  validatePassword (password) {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=\S+$).{8,}$/
    return re.test(password)
  }
}
