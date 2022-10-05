import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks'
import { LoginCredentials, loginWithToast } from '../../../services/auth'
import Button from '../../Button'
import Input from '../../Input'

import './home.scss'

type LoginErrors = {
  [key: string]: string
}

const Home: React.FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [formErrors, setFormErrors] = useState({} as LoginErrors)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Object.keys(formErrors).length !== 0) {
      const errors = Object.assign({}, formErrors)
      delete errors[e.target.name]
      setFormErrors(errors)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const credentials: LoginCredentials = {
      username: (
        e.currentTarget.elements.namedItem('username') as HTMLInputElement
      ).value,
      password: (
        e.currentTarget.elements.namedItem('password') as HTMLInputElement
      ).value,
    }

    const errors = validate(credentials)

    if (Object.keys(errors).length !== 0) setFormErrors(errors)
    else loginWithToast(dispatch, credentials)
  }

  const validate = (values: LoginCredentials) => {
    const errors = {} as LoginErrors

    if (!values.username) {
      errors.username = 'Поле должно быть заполнено!'
    }

    if (!values.password) {
      errors.password = 'Поле должно быть заполнено!'
    }

    return errors
  }

  if (isAuthenticated) {
    if (location.state)
      return (
        <Navigate
          to={location.state.from.pathname}
          state={{ from: location }}
        />
      )
    if (user.role === 'Student')
      return <Navigate to={'/profile'} state={{ from: location }} />

    if (user.role === 'Admin' || user.role === 'Moderator')
      return <Navigate to={'/applications'} state={{ from: location }} />
  }

  return (
    <div className="home">
      <h1 className="home__title">
        Система для электронной подачи заявлений на выделение материальной
        помощи
      </h1>
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Войти в личный кабинет</h1>
        <Input
          className="login__input"
          name="username"
          type="text"
          label="Логин"
          placeholder="Введите логин"
          onChange={handleChange}
          error={formErrors.username}
        />
        <Input
          className="login__input"
          name="password"
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          onChange={handleChange}
          error={formErrors.password}
        />
        <Button className="login__button primary" type="submit">
          Войти
        </Button>
      </form>
    </div>
  )
}

export default Home
