import React from 'react'
import { MenuItem } from '.'

interface MenuItemButton extends MenuItem {}

const MenuButton: React.FC<MenuItemButton> = (props) => {
  return (
    <button
      className={
        props.className ? `menu__button ${props.className}` : 'menu__button'
      }
      onClick={props.onClick}>
      {props.content}
    </button>
  )
}

export default MenuButton
