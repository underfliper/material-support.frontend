import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </>
  )
}

export default Layout
