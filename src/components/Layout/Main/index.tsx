import React from 'react'
import './main.scss'

type MainProps = {
  children?: React.ReactNode
}

const Main: React.FC<MainProps> = (props) => {
  return (
    <main className="main">
      <div className="main__container">{props.children}</div>
    </main>
  )
}

export default Main
