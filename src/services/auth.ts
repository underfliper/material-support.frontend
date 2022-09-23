import { createAsyncThunk } from '@reduxjs/toolkit'

const axios = require('axios').default

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
})

type LoginCredentials = {
  username: string
  password: string
}

export const login = createAsyncThunk<{ token: string }, LoginCredentials>(
  'auth/login',
  async (credentials) => {
    const response = await axiosInstance
      .post('/login', credentials)
      .catch((err: { response: { data: string } }) => {
        throw new Error(err.response.data)
      })
    return response.data
  },
)
