import React, { useState } from 'react'

import './input.scss'

type InputProps = {
  className?: string
  name?: string
  label?: string
  type?: 'text' | 'password'
  placeholder?: string
  value?: string
  readonly?: boolean
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ type = 'text', ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const showPasswordClick = () => setShowPassword(!showPassword)

  return (
    <div className={props.className ? `input ${props.className}` : 'input'}>
      <div
        className={`input__label ${
          props.className && `${props.className}__label`
        }`}>
        <label>{props.label}</label>
        {props.error && (
          <span
            className={`input__error ${
              props.className && `${props.className}__error`
            }`}>
            {props.error}
          </span>
        )}
      </div>

      <div
        className={`input__wrapper ${
          props.className && `${props.className}__wrapper`
        }`}>
        <input
          className={props.readonly ? 'readonly' : ''}
          name={props.name}
          type={showPassword ? 'text' : type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          readOnly={props.readonly ? true : false}
        />
        {type === 'password' && (
          <button
            title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            type="button"
            className={`input__show ${
              props.className && `${props.className}__show`
            }`}
            onClick={showPasswordClick}>
            <i className={`icon-${showPassword ? 'eye' : 'eye-off'}`} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
