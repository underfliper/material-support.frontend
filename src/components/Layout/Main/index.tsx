import React from 'react'
import './main.scss'

type MainProps = {
  children?: React.ReactNode
}

const Main: React.FC<MainProps> = (props) => {
  return <main className="main">{props.children}</main>
}

export default Main
