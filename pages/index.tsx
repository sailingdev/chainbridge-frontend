import React, { useState, useEffect } from 'react'
import HomeNotConnected from './home-not-connected'
import HomeConnected from './home-connected'
import { UserWallet } from 'interfaces'
import { USER_WALLET_STORAGE_KEY } from 'const'
import { NextPage } from 'next'

export interface HomeProps {
}
const Home: NextPage<HomeProps> = () => {
  const [user, setUser] = useState<UserWallet | null>(null)
  useEffect(() => {
    const userStorage = localStorage.getItem(USER_WALLET_STORAGE_KEY);
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);
  return (
    <>
      {!user ?
        <HomeNotConnected user={user} setUser={setUser} />
        :
        <HomeConnected user={user} setUser={setUser} />
      }
    </>)
}


export default Home;