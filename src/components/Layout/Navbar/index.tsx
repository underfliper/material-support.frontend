import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks'
import { logout } from '../../../app/store/authSlice'
import Menu from '../../Menu'

import './navbar.scss'

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const navbarToggle = useRef<HTMLInputElement>(null)

  const closeNavbar = () => {
    if (navbarToggle.current === null) return

    if (navbarToggle.current.checked) {
      navbarToggle.current.checked = false
    }
  }

  const handleClickLogout = () => {
    dispatch(logout())
    closeNavbar()
  }

  useEffect(() => {
    window.onresize = () => {
      closeNavbar()
    }
  })

  return (
    <>
      <nav className="navbar">
        <input id="navbar__toggle" type="checkbox" ref={navbarToggle} />
        <label className="navbar__toggle-button" htmlFor="navbar__toggle">
          <span></span>
        </label>
        <Menu
          className="navbar__menu"
          itemClassName="navbar__item"
          linkClassName="navbar__link primary"
          buttonClassName="navbar__button primary">
          {user.role === 'Guest' && (
            <Menu.Link content="Главная" to="home" onClick={closeNavbar} />
          )}
          {(user.role === 'Guest' || user.role === 'Student') && (
            <Menu.Link
              content="Информация для студентов"
              to="information"
              onClick={closeNavbar}
            />
          )}
          {user.role === 'Student' && (
            <Menu.Link
              content="Личный кабинет"
              to="profile"
              onClick={closeNavbar}
            />
          )}
          {user.role === 'Student' && (
            <Menu.Link
              content="Подать заявление"
              to="apply"
              onClick={closeNavbar}
            />
          )}
          {(user.role === 'Admin' || user.role === 'Moderator') && (
            <Menu.Link
              content="Панель администрирования"
              to="admin-panel"
              onClick={closeNavbar}
            />
          )}
          {(user.role === 'Admin' || user.role === 'Moderator') && (
            <Menu.Link
              content="Управление заявлениями"
              to="applications"
              onClick={closeNavbar}
            />
          )}
          {user.role !== 'Guest' && (
            <Menu.Button
              content={<i title="Выйти" className="icon-exit" />}
              onClick={handleClickLogout}
            />
          )}
        </Menu>
      </nav>
    </>
  )
}

export default NavBar
