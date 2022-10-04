import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './app/hooks/hooks'
import jwtDecode from 'jwt-decode'
import {
  AuthToken,
  tokenExpire,
  userAuthenticated,
} from './app/store/authSlice'

import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Pages/Home'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if (token) {
      const { exp } = jwtDecode<AuthToken>(token)

      if (exp * 1000 < Date.now()) {
        dispatch(tokenExpire())
      } else {
        dispatch(userAuthenticated({ token }))
      }
    }
  })

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute roles={['Student']}>
                <>Личный кабинет</>
              </PrivateRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <PrivateRoute roles={['Admin', 'Moderator']}>
                <>Заявления</>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-panel"
            element={
              <PrivateRoute roles={['Admin', 'Moderator']}>
                <>Панель администрации</>
              </PrivateRoute>
            }
          />
          <Route path="/information" element={<>Информация</>} />
          <Route
            path="/apply"
            element={
              <PrivateRoute roles={['Student']}>
                <>Подать заявление</>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h2>Страница не найдена</h2>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
