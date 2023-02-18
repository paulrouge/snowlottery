import React from 'react'
import ConnectedAddress from './ConnectedAddress'
import { useGlobalContext } from '../utils/context/globalContext'
import LotteryInstance from './LotteryInstance'

const Main = () => {
    const { account } = useGlobalContext() 
  
    return (
    <div className='w-screen h-screen'>
        <div className='w-full h-full bg-funYellow flex flex-col justify-center items-center overflow-scroll pt-28'>
            <div className='pt-12
            flex flex-col items-center justify-center w-full md:text-8xl text-4xl
            font-bold'>
                the snow lottery!
            </div>
            <div className='px-2 md:text-2xl my-4 font-bold'>
                
            </div>
            <div className='md:text-2xl mx-4'>
                winner is picked every sunday - check twitter @snowlottery
            </div>
            <div className='md:text-xl mt-8 flex px-4'>
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