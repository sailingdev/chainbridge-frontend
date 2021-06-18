import React, { useState, useEffect } from 'react'
import HomeNotConnected from './home-not-connected'
import HomeConnected from './home-connected'
import { UserWallet } from 'interfaces'
import { USER_WALLET_STORAGE_KEY } from 'const'
import { NextPage } from 'next'
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { actions } from 'redux/walletUser/actions'

export interface HomeProps {
}
const Home: NextPage<HomeProps> = () => {
  const dispatch = useAppDispatch()
  const userWallet = useAppSelector((state)=>state.user.userWallet)

  useEffect(() => {
    const userStorage = localStorage.getItem(USER_WALLET_STORAGE_KEY);
    if (userStorage) {
      dispatch(actions.login(JSON.parse(userStorage)))
    }
  }, []);
  return (
    <>
      {!userWallet ?
        <HomeNotConnected/>
        :
        <HomeConnected/>
      }
    </>)
}


export default Home;