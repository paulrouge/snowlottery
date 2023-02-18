import React from 'react'
import ConnectedAddress from './ConnectedAddress'
import { useGlobalContext } from '../utils/context/globalContext'
import LotteryInstance from './LotteryInstance'

const Main = () => {
    const { account } = useGlobalContext() 
  
    return (
    <div className='w-screen h-screen'>
        <div className={`w-full h-full 
        bg-funYellow flex flex-col justify-center 
        items-center overflow-scroll pb-20 ${account == '' ? 'pt-0' : 'pt-60'}`} >
            <div className='
            pt-12 flex flex-col items-center j
            ustify-center w-full md:text-8xl text-4xl
            font-bold'>
                the snow lottery!
            </div>
            
            <div className='
            flex flex-col md:flex-row md:text-2xl 
            mx-4 justify-center items-center
            '>
                <div className='mx-4'>
                    winner is picked onchain, every sunday
                </div>
                <div className='mx-4'>
                    twitter @snowlottery
                </div>
            </div>
            <div className='md:text-xl mt-8 flex px-4'>
                {account ? 
                    <ConnectedAddress/> :
                    <div>use q-nect to connect Hana or MetaMask!</div>
                }
            </div>
            <LotteryInstance/>
        </div>
    </div>
  )
}

export default Main