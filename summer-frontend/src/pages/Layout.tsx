import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import classes from '../components/Main.module.css'
import { LayoutType } from '../types/layout'

const Layout = ({ children }: LayoutType) => {
  return (
    <>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
