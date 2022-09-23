import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { login } from '../../services/auth'

export type AllowedRole = 'Student' | 'Moderator' | 'Admin' | 'Guest'

type AuthState = {
  token: string
  user: {
    role: AllowedRole
  }
  isAuthenticated: boolean
  loading: boolean
  error: string | undefined
}

type AuthPayload = {
  token: string
}

export type AuthToken = {
  role: 'Student' | 'Moderator' | 'Admin'
  exp: number
}

const initialState: AuthState = {
  token: '',
  user: {
    role: 'Guest',
  },
  isAuthenticated: false,
  loading: false,
  error: '',
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    userAuthenticated: (state, action: PayloadAction<AuthPayload>) => {
      return {
        ...state,
        ...{
          token: action.payload.token,
          user: {
            role: jwtDecode<AuthToken>(action.payload.token).role,
          },
          isAuthenticated: true,
          loading: false,
        },
      }
    },
    logout: (state) => {
      sessionStorage.clear()

      return {
        ...state,
        ...{
          token: '',
          user: {
            role: 'Guest',
          },
          isAuthenticated: false,
        },
      }
    },
    tokenExpire: (state) => {
      sessionStorage.clear()

      return {
        ...state,
        ...{
          token: '',
          user: {
            role: 'Guest',
          },
          isAuthenticated: false,
        },
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.token = action.payload.token
        state.user = {
          role: jwtDecode<AuthToken>(action.payload.token).role,
        }

        sessionStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.token = ''
        state.user = {
          role: 'Guest',
        }
        state.error = action.error.message
      })
  },
})

export const { userAuthenticated, logout, tokenExpire } = authSlice.actions

export default authSlice.reducer
