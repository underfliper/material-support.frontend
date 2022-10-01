import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuItem } from '.'

interface MenuItemLink extends MenuItem {
  to: string
  icon?: React.ReactNode
  iconClassName?: string
}

const MenuLink: React.FC<MenuItemLink> = (props) => {
  return (
    <>
      {props.icon && (
        <div
          className={
            props.iconClassName
              ? `menu__item__icon ${props.iconClassName}`
              : 'menu__item__icon'
          }>
          {props.icon}
        </div>
      )}
      <NavLink
        className={
          props.className ? `menu__link ${props.className}` : 'menu__link'
        }
        to={props.to}
        onClick={props.onClick}>
        {props.content}
      </NavLink>
    </>
  )
}

export default MenuLink
