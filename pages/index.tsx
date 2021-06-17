import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import MainHeader from 'components/base/MainHeader'
import Footer from 'components/base/Footer'
import HomeNotConnected from './home-not-connected'
import HomeConnected from './home-connected'
import Stars from 'components/assets/Stars'

export default function Home() {
  const [user, setUser] = useState(null)
  return (
    <>
      <Head>
        <title>BSC ETH Bridge</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="BSC ETH Bridge, by Ternoa." />
      </Head>
      <div className={"mainContainer"}>
        <MainHeader user={user} setUser={setUser} />
        {!user ?
          <HomeNotConnected setUser={setUser} />
          :
          <HomeConnected user={user} />
        }
        <Footer />
        <Stars className={"stars"} />
      </div>
    </>
  )
}
