import { Footer, Header } from '@/components'
import React from 'react'
import Banner from "./Banner"
import Recent from './Recent'

const Home = () => {
  return (
    <main className='overflow-x-hidden bg-black text-white'>
      <Header />
      <Banner />
      <Recent />
      <Footer />
    </main>
  )
}

export default Home