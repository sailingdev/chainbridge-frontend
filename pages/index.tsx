import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import MainHeader from 'components/base/MainHeader'
import Footer from 'components/base/Footer'
import HomeNotConnected from './home-not-connected'
import HomeConnected from './home-connected'
import Stars from 'components/assets/Stars'
import { UserWallet } from 'interfaces'
import { USER_WALLET_STORAGE_KEY } from 'const'
import { NextPage } from 'next'

export interface HomeProps {
}
const Home: NextPage<HomeProps> = () => {
  const [user, setUser] = useState<UserWallet | null>(null)
  const setUserWallet = (userWallet: UserWallet) => {
    setUser(userWallet);
    localStorage.setItem(USER_WALLET_STORAGE_KEY, JSON.stringify(userWallet));
  }
  useEffect(() => {
    const userStorage = localStorage.getItem(USER_WALLET_STORAGE_KEY);
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);
  return (
    <>
      <Head>
        <title>BSC ETH Bridge</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="BSC ETH Bridge, by Ternoa." />
      </Head>
      <div className={"mainContainer"}>
        <MainHeader user={user} setUser={setUserWallet} />
        {!user ?
          <HomeNotConnected setUser={setUserWallet} />
          :
          <HomeConnected user={user} setUser={setUserWallet} />
        }
        <Footer />
        <Stars className={"stars"} />
      </div>
    </>
  )
}


export default Home;