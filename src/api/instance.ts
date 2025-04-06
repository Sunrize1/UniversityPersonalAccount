import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://lk-stud.api.kreosoft.space/api',
})