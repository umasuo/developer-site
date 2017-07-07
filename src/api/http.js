import manager from 'manager'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://192.168.1.22:8804/v1/',
  timeout: 1000
})

manager._modules['http'] = http
