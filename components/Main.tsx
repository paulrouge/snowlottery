import React from 'react'
import ConnectedAddress from './ConnectedAddress'
import { useGlobalContext } from '../utils/context/globalContext'
import LotteryInstance from './LotteryInstance'

const Main = () => {
    const { account } = useGlobalContext() 
  
    return (
    <div className='w-screen h-auto'>
        <div className='
        w-full h-full bg-funYellow flex flex-col 
        justify-center items-center overflow-scroll 
        pt-28 pb-20'>
            <div className='
            pt-12 flex flex-col items-center j
            ustify-center w-full md:text-8xl text-4xl
            font-bold'>
                the snow lottery!
            </div>
            <div className='px-2 md:text-2xl my-4 font-bold'>
                
            </div>
            <div className='
            flex flex-col md:flex-row md:text-2xl 
            mx-4 justify-center items-center
            '>
                <div className='mx-4'>
                    winner is picked every sunday
                </div>
                <div className='mx-4'>
                    twitter @snowlottery
                </div>
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