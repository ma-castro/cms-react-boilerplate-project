import axios from 'axios'

export const axiosInstance = axios.create({
  // @TODO: this should be saved in secret
  baseURL: 'https://45697099.hs-sites.com/_hcms/api'
})
