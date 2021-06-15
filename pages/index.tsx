import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import MainHeader from 'components/base/MainHeader'
import Footer from 'components/base/Footer'
import HomeNotConnected from 'components/pages/HomeNotConnected'
import Stars from 'components/assets/Stars'
import { ethers } from "ethers";

export default function Home() {
  const [user, setUser] = useState(null)
  /*const [signer, setSigner] = useState()
  let provider:any;
  
  useEffect(()=>{
    if (window && (window as any).ethereum) {
        provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any')
        const signer = provider.getSigner()
    }
  }, [])
  
  const connect = async () => {
    await provider.send("eth_requestAccounts", []);
    setSigner(provider.getSigner())
  }*/

  return (
    <>
      <Head>
        <title>BSC ETH Bridge</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="BSC ETH Bridge, by Ternoa." />
      </Head>
      <div className={"mainContainer"}>
        <MainHeader user={user} setUser={setUser}/>
        {!user && <HomeNotConnected setUser={setUser}/>}
        <Footer/>
        <Stars className={"stars"}/>
      </div>
    </>
  )
}
