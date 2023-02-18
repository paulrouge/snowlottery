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
            <div className='px-2 md:text-4xl my-4'>
                1. buy tickets
                2. wait for the draw 
                3. win! or not!
            </div>
            <div className='text-2xl mt-8 flex px-4'>
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