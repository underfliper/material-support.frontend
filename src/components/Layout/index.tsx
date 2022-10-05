import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <ToastContainer theme="colored" autoClose={2000} />
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </>
  )
}

export default Layout
