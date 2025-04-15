import { Footer, Header } from '@/components'
import React from 'react'
import Banner from "./Banner"
import Anime from './Anime'

const Home = () => {
  return (
    <main className='overflow-x-hidden bg-black text-white'>
      <Header />
      <Banner />
      <Anime />
      <Footer />
    </main>
  )
}

export default Home