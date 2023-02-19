import React, {useState, useEffect} from 'react'
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
    const [_inputCache, _setInputCache] = useState<string>("")

    const handleAmountOfTicketsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        _setInputCache(e.target.value);
    };
      
    useEffect(() => {
        const parsedValue = parseInt(_inputCache);
        const ticketsLeft = props.lottery.totalTickets - props.lottery.ticketsSold
        
        if (!isNaN(parsedValue) && parsedValue > 0) {
            // if the value is larger then totaltickets, set it to totaltickets - ticketsSold
            if(parsedValue > props.lottery.totalTickets - props.lottery.ticketsSold){
                setAmountOfTickets(ticketsLeft)
                _setInputCache(ticketsLeft.toString())
            } else {
                setAmountOfTickets(parsedValue);
            }
        } else {
            setAmountOfTickets(0);
        }
        
    }, [_inputCache]);

    const handleBuyTickets = async () => {
        const options = {
            value: ethers.utils.parseEther((amountOfTickets * props.lottery.ticketPrice).toString()),
            gasLimit: 10000000
        }
        try{
            const tx = await contractSigner.buyTickets(lotteryId, amountOfTickets, options)
            setTransactionToCheck(tx)
        } catch (e) {
            console.log(e)
        }
        
    }


    return (
    <div className='fixed top-0 left-0 backdrop-blur-sm w-screen h-screen absolute z-20 flex justify-center items-center'
    onClick={()=>{props.setModalOpen(false)}}
    >
        <div className='
        bg-funPurple rounded md:p-12 px-4 py-2
        border-8 border-white z-40' 
        onClick={(e) => e.stopPropagation()}>
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
                value={_inputCache}
                onChange={(e) => handleAmountOfTicketsChange(e)}
                />
            </div>

            <div className='mt-2'>
                {/* cost: {isNaN(amountOfTickets) ? 0 : amountOfTickets * props.lottery.ticketPrice} ICZ */}
            </div>
            <div className='mt-2'>
                <button className='
                hover:bg-funBlue hover:text-funPurple border 
                border-white text-white rounded-md p-4 font-bold
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