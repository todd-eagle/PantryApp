import axios from 'axios'
// require('dotenv').config()

  export default axios.create({
    baseURL: "http://192.168.86.46:3030",
  })