import React, {useState} from 'react'
import { ethers } from 'ethers'
import lotteryAbi from '../utils/contracts/lottery_abi.json'
import { ContractAddresses } from '../utils/constants/addresses'
import { useGlobalContext } from '../utils/context/globalContext'

type LotteryInstanceProps = {
    id: number,
    ticketPrice: number,
    totalTickets: number,
    ticketsSold: number,
    closed: boolean,
    exists: boolean,
    owner: string,
}

type Props = {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    lottery: LotteryInstanceProps
}

const BuyTicketsModal = (props: Props) => {
    const { signer, setTransactionToCheck, lotteryId } = useGlobalContext()
    const contractSigner = new ethers.Contract(ContractAddresses.lotteryContract, lotteryAbi.abi, signer)
    const [amountOfTickets, setAmountOfTickets] = useState<number>(1)

    const handleAmountOfTicketsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountOfTickets(parseInt(e.target.value))
        if (parseInt(e.target.value) > props.lottery.totalTickets) {
            setAmountOfTickets(props.lottery.totalTickets)
        }
    }

    const handleBuyTickets = async () => {
        const options = {
            value: ethers.parseEther((amountOfTickets * props.lottery.ticketPrice).toString()),
            gasLimit: 10000000
        }
        try{
            const tx:ethers.ContractTransactionResponse = await contractSigner.buyTickets(lotteryId, amountOfTickets, options)
            setTransactionToCheck(tx)
        } catch (e) {
            console.log(e)
        }
        
    }


    return (
    <div className='fixed top-0 left-0 backdrop-blur-sm w-screen h-screen absolute z-20 flex justify-center items-center'
    onClick={()=>{props.setModalOpen(false)}}
    >
        <div className=' bg-funPurple rounded md:p-12 border-8 border-white z-40' onClick={(e) => e.stopPropagation()}>
            <div className='font-bold text-5xl text-white'>
            get your tickets!
            </div>
            <div className='mt-4'>
                price per ticket {props.lottery.ticketPrice} ICZ
            </div>
            <div className='mt-2'>
                total tickets left: {props.lottery.totalTickets}
            </div>
            <div className='mt-2'>
                total tickets to buy: {isNaN(amountOfTickets) ? 0 : amountOfTickets}
            </div>
            <div className='mt-2 '>
                <input
                type='number'
                className='w-full bg-funPurple text-white border rounded-md p-2 '
                value={amountOfTickets}
                onChange={(e) => handleAmountOfTicketsChange(e)}
                />
            </div>

            <div className='mt-2'>
                cost: {isNaN(amountOfTickets) ? 0 : amountOfTickets * props.lottery.ticketPrice} ICZ
            </div>
            <div className='mt-2'>
                <button className='
                hover:bg-funBlue hover:text-funPurple border 
                border-white text-white rounded-md p-2 font-bold
                '
                onClick={() => handleBuyTickets()}
                >
                    buy tickets
                </button>
            </div>
        </div>
    </div>
  )
}

export default BuyTicketsModal