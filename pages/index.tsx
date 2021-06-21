import React, { useState, useEffect } from 'react'
import HomeConnected from '../components/home-connected'
import { USER_WALLET_STORAGE_KEY } from 'const'
import { NextPage } from 'next'
import { useAppDispatch } from 'redux/hooks'
import { actions } from 'redux/walletUser/actions'

export interface HomeProps {
}
const Home: NextPage<HomeProps> = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userStorage = localStorage.getItem(USER_WALLET_STORAGE_KEY);
    if (userStorage) {
      dispatch(actions.login(JSON.parse(userStorage)))
    }
  }, []);
  return (
    <HomeConnected/>
  )
}


export default Home;