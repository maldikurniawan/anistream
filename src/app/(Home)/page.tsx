import { Footer, Header } from '@/components'
import React from 'react'
import Banner from "./Banner"
import Recent from './Recent'

const Home = () => {
  return (
    <main>
      <Header />
      <Banner />
      <Recent />
      <Footer />
    </main>
  )
}

export default Home