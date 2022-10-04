import React from 'react'

import './button.scss'

type ButtonProps = {
  className?: string
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ type = 'button', ...props }) => {
  return (
    <button
      className={props.className ? `button ${props.className}` : 'button'}
      type={type}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
