import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks/hooks'
import { AllowedRole } from '../../app/store/authSlice'

type PrivateRouteProps = {
  children: React.ReactNode
  roles: Array<AllowedRole>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  roles = [],
}) => {
  const location = useLocation()
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.auth,
  )

  if (loading) {
    return <p>Checking auth...</p>
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
