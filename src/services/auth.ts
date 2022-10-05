import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastPromise } from '../app/utils'

const axios = require('axios').default

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
})

export type LoginCredentials = {
  username: string
  password: string
}

type LoginAPIResponse = {
  token: string
}

type LoginAPIError = {
  message: string
  response: {
    data: string
    status: number
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials): Promise<LoginAPIResponse> => {
    const response = await axiosInstance
      .post('/login', credentials)
      .catch((error: LoginAPIError) => {
        throw new Error(error.response.data || error.message)
      })

    return (await response.data) as LoginAPIResponse
  },
)

export const loginWithToast = toastPromise(login, {
  pending: 'Выполняется вход в аккаунт...',
  error: {
    render: ({ data }) => {
      return data.message
    },
  },
  success: 'Вход в аккаунт успешно выполнен.',
})
