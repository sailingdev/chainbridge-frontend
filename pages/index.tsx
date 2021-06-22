import React from 'react'
import HomeConnected from '../components/home-connected'
import { NextPage } from 'next'

export interface HomeProps {
}
const Home: NextPage<HomeProps> = () => {

  return (
    <HomeConnected />
  )
}


export default Home;