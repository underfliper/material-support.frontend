import React from 'react'
import MenuButton from './Button'
import MenuLink from './Link'

import './menu.scss'

export interface MenuItem {
  content: React.ReactNode
  className?: string
  onClick?: () => void
}

type MenuProps = {
  children: React.ReactNode
  className?: string
  itemClassName?: string
  linkClassName?: string
  buttonClassName?: string
}

const Menu: React.FC<MenuProps> = (props) => {
  const getElements = (children: React.ReactNode) =>
    React.Children.map(children, (child, key) => {
      if (!React.isValidElement<MenuItem>(child)) {
        return child
      }

      const elementClassName =
        child.props.className ||
        (child.type === MenuLink && props.linkClassName) ||
        (child.type === MenuButton && props.buttonClassName) ||
        ''

      return (
        <li
          className={
            props.itemClassName
              ? `menu__item ${props.itemClassName}`
              : 'menu__item'
          }>
          {child.type === MenuLink || child.type === MenuButton
            ? React.cloneElement(child, {
                key: key,
                className: elementClassName,
              })
            : child}
        </li>
      )
    })

  return (
    <ul className={props.className ? 'menu ' + props.className : 'menu'}>
      {getElements(props.children)}
    </ul>
  )
}

export default Object.assign(Menu, { Link: MenuLink, Button: MenuButton })
