import React, {useEffect, useState} from 'react'
import { useGlobalContext } from '../../utils/context/globalContext'

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const AwaitTransactionModal = () => {
    const { setTransactionToCheck, transactionToCheck} = useGlobalContext()
    const [countdown, setCountdown] = useState(30)
    const [status, setStatus] = useState("Waiting for transaction to be mined")
    const [dots, setDots] = useState(".")
    // const [hash, setHash] = useState(transactionToCheck)

    useEffect(() => {
        const interval = setInterval(() => {
            if(countdown > 0) {
                setCountdown(countdown - 1)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [countdown])

    useEffect(() => {
        setCountdown(40)
    }, [transactionToCheck])

    useEffect(() => {
        const checkTx = async () => {
            const receipt = await transactionToCheck.wait()
            const txStatus = receipt.status 
            
            if(txStatus === 1) {
                setStatus("✅ Transaction successful! Closing in 3 seconds")
                setCountdown(3)
                await sleep(3000)
                // emit event to refresh data
                window.dispatchEvent(new Event('txdone'))
                setTransactionToCheck(null)
 
            } else {
                alert("Something went wrong. Check the Snow Tracker.")
            }
        }
        if(transactionToCheck) {
            checkTx()
        }
        // eslint-disable-next-line
    }, [setStatus, setCountdown, setTransactionToCheck])

    useEffect(() => {
        // function that adds a dot every 300ms up to three dots and then resets to one dot
        const interval = setInterval(() => {
            if(dots.length < 3) {
                setDots(dots + ".")
            } else {
                setDots("")
            }
        }, 500)
        return () => clearInterval(interval)
    }, [dots])

    // useEffect(() => {
    //     if(transactionToCheck) {
    //         setHash(transactionToCheck)
    //     }

    // }, [transactionToCheck])

    return (
    <div className='fixed top-0 left-0 backdrop-blur-sm
    w-screen h-screen z-50 flex justify-center items-center'
    >
        <div className='bg-funOrange md:w-3/5 w-11/12 rounded md:p-12 p-2 border-8 border-white' >
            <div className='font-bold md:text-3xl text-xl text-white'>
            {status}{dots}
            {/* place holder blabl status is peniding or success */}
            </div>
            <div className='mt-2 font-bold text-xl text-white'>
                estimated time: {countdown} seconds
                {/* estimated time: 50 seconds */}
            </div>
            <div className='mt-2 font-bold text-xl text-white'>
                {/* doesnt really fit... */}
                {/* tx hash: {transactionToCheck.hash} */}
                {/* tx hash: dummyhash1234567890ummyhash1234567890ummyhash234567 */}
            </div>
        </div>
    </div>
  )
}

export default AwaitTransactionModal