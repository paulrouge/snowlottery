import React from 'react'
import ConnectedAddress from './ConnectedAddress'
import { useGlobalContext } from '../utils/context/globalContext'
import LotteryInstance from './LotteryInstance'

const Main = () => {
    const { account } = useGlobalContext() 
  
    return (
    <div className='w-screen h-screen'>
        <div className='w-full h-full bg-funYellow flex flex-col justify-center items-center'>
            <div className='
            flex flex-col items-center justify-center w-full md:text-8xl text-4xl
            font-bold'>
                the snow lottery!
            </div>
            <div className='text-xl'>
                {account ? 
                    <ConnectedAddress/> :
                    <div>use qnect to connect Hana or MetaMask!</div>
                }
            </div>
            <LotteryInstance/>
        </div>
    </div>
  )
}

export default Main