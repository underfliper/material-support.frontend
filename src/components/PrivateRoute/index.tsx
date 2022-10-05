import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import jwtDecode from 'jwt-decode'
import { AllowedRole, AuthToken, tokenExpire } from '../../app/store/authSlice'
import Loader from '../Loader'

type PrivateRouteProps = {
  children: React.ReactNode
  roles: Array<AllowedRole>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  roles = [],
}) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.auth,
  )

  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if (token) {
      const { exp } = jwtDecode<AuthToken>(token)

      if (exp * 1000 < Date.now()) {
        dispatch(tokenExpire())
      }
    }
  })

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" state={{ from: location }} />
  }

  const userHasRequiredRole = user && roles.includes(user.role)

  if (isAuthenticated && !userHasRequiredRole) {
    return <Navigate to="/home" state={{ from: location }} />
  }
  return <>{children}</>
}

export default PrivateRoute
