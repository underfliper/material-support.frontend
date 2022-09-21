import React from 'react'
import logo from '../../../assets/img/logo.svg'
import logo_mini from '../../../assets/img/logo_mini.svg'

import './header.scss'

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a href="/home" className="logo header__logo">
          <img src={logo} alt="Логотип" className="logo__img full" />
          <img src={logo_mini} alt="Логотип" className="logo__img mini" />
        </a>
      </div>
    </header>
  )
}

export default Header
