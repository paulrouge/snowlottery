import React,{useEffect, useState} from 'react'
import { ethers } from 'ethers'
import lotteryAbi from '../utils/contracts/lottery_abi.json'
import { ContractAddresses } from '../utils/constants/addresses'
import { useGlobalContext } from '../utils/context/globalContext'
import BuyTicketsModal from './BuyTicketsModal'
import ListTicketOwners from './ListTicketOwners'

type Ticket = {
    address: string,
    id: number,
}

type LotteryInstanceProps = {
    id: number,
    ticketPrice: number,
    totalTickets: number,
    ticketsSold: number,
    closed: boolean,
    exists: boolean,
    owner: string,
}

const LotteryInstance = () => {
    const { provider, account, signer, setTransactionToCheck, lotteryId ,setLotteryId} = useGlobalContext()
  
    const [ownerOfContract, setOwnerOfContract] = useState<string>('')
    const [accountIsOwner, setAccountIsOwner] = useState<boolean>(false)
    const [lotteryInstance, setLotteryInstance] = useState<LotteryInstanceProps|null>(null)
    const [buyTicketsModalOpen, setBuyTicketsModalOpen] = useState<boolean>(false)
    const [ticketOwners, setTicketOwners] = useState<Ticket[]>([])
    const [ticketAmountOwnerByAccount, setTicketAmountOwnerByAccount] = useState<number>(0)
    
    const [contractCaller, setContractCaller] = useState<ethers.Contract|null>(null)
    const [contractSigner, setContractSigner] = useState<ethers.Contract|null>(null)
    const [toggleGetter, setToggleGetter] = useState<boolean>(false)


    useEffect(() => {
        const call = async () => {
            const _lotteryId = await contractCaller.lotteryCounter()
            setLotteryId(Number(_lotteryId))
        }
        if(contractCaller){
            call()
        }
    }, [contractCaller])

    useEffect(() => {
        if(window){
            // if eventlister not already exists, add it
            if(!window.hasOwnProperty('txdone')){
                window.addEventListener('txdone', async () => {
                    setToggleGetter(!toggleGetter)
                    setBuyTicketsModalOpen(false)
                })
            }
        }
        return () => {
            if(window){
                window.removeEventListener('txdone', () => {})
            }
        }
    }, [account])

    useEffect(() => {
        if(provider){
            const contractCaller = new ethers.Contract(ContractAddresses.lotteryContract, lotteryAbi.abi, provider)
            setContractCaller(contractCaller)
        }
    }, [provider])

    useEffect(() => {
        if(signer){
            const contractSigner = new ethers.Contract(ContractAddresses.lotteryContract, lotteryAbi.abi, signer)
            setContractSigner(contractSigner)
        }
    }, [signer])

    useEffect(() => {
        const getOwner = async () => {
            const res = await contractCaller.owner()
            setOwnerOfContract(res)
        }
        if(contractCaller){
            getOwner()
        }
    }, [contractCaller])

    useEffect(() => {
        if(ownerOfContract === account && account !== ''){
            setAccountIsOwner(true)
        } else {
            setAccountIsOwner(false)
        }
    }, [ownerOfContract, account])

    useEffect(() => {
        const getLottery = async () => {
            const res = await contractCaller.lotteries(lotteryId)
            const _lotteryInstance: LotteryInstanceProps = {
                id: lotteryId,
                ticketPrice: Number(res.ticketPrice) / 10 ** 18,
                totalTickets: Number(res.totalTickets),
                ticketsSold: Number(res.ticketsSold),
                closed: res.closed,
                exists: res.exists,
                owner: res.owner,
            }

            setLotteryInstance(_lotteryInstance)
        }
        if(contractCaller){
            getLottery()
        }
       
    }, [contractCaller, toggleGetter, lotteryId])

    useEffect(() => {
        const getOwners = async () => {
            const res = await contractCaller.lotteries(lotteryId)
            const ticketsSold = Number(res.ticketsSold)
            let _cache = [];
            
            for(let i = 0; i < ticketsSold; i++){
                const owner:string = await contractCaller.ticketOwners(lotteryId,i)        
                const _ticket: Ticket = {
                    address: owner,
                    id: i,
                }
                _cache.push(_ticket)
             
            }
            setTicketOwners(_cache)
        }
        if(contractCaller){
            getOwners()
        }
    }, [contractCaller, toggleGetter, lotteryId])
  
    useEffect(() => {
        setTicketAmountOwnerByAccount(0)
        const getAmountOwned = async () => {
            for(let i = 0; i < ticketOwners.length; i++){
                if(ticketOwners[i].address.toLowerCase() === account.toLowerCase()){
                    setTicketAmountOwnerByAccount(prev => prev + 1)
                }
            }
        }
        if(contractCaller){
            getAmountOwned()
        }
    }, [contractCaller, ticketOwners])

    const createNewLottery = async () => {
        const options = {
            gasLimit: 1000000,
        }

        const ticketPrice = ethers.utils.parseEther('100')
        const totalTickets = 10000
        
        try{
            const tx = await contractSigner.createLottery(ticketPrice, totalTickets, options)
            setTransactionToCheck(tx)
        } catch (e) {
            console.log(e)
        }
    }

    const closeLottery = async () => {
        const options = {
            gasLimit: 1000000,
        }

        try{
            const tx = await contractSigner.closeLottery(lotteryId, options)
            setTransactionToCheck(tx)
        } catch (e) {
            console.log(e)
        }
    }

    return (
    <div className=' 
    flex flex-col items-center justify-center
    md:w-5/12  md:p-4 md:m-8 w-11/12
    bg-funRed text-white z-10 shadow-2xl rounded-xl
    '>

        {lotteryInstance &&
        <div className='w-full p-2'>
            <div className='text-2xl font-bold px-6'>
            lottery #{lotteryInstance.id}
            </div>

            <div className='mt-6 px-6'>
                <div>
                your tickets: {ticketAmountOwnerByAccount}
                </div>
                <div>
                prize pool: {(lotteryInstance.ticketsSold * lotteryInstance.ticketPrice * 0.97).toFixed(2)} ICZ
                </div>
                <div className=''>
                ticket price:  {lotteryInstance.ticketPrice} ICZ
                </div>
                <div>
                tickets left: {lotteryInstance.totalTickets}
                </div>
                <div>
                total tickets sold: {lotteryInstance.ticketsSold}
                </div>
            </div>

            <div className='mt-6 flex justify-center bg-funPurple py-4 px-8 md:p-4 rounded-md hover:bg-funBlue cursor-pointer shadow-2xl'>
            {!lotteryInstance.closed ? 
                <div 
                className='text-2xl font-bold'
                onClick={() => setBuyTicketsModalOpen(true)}
                
                >
                    get your tickets!
                </div>
                :
                <div className='text-2xl font-bold'>
                    lottery closed
                </div>
            }
            </div>
            <ListTicketOwners ticketOwners={ticketOwners} />
        </div>
        }

        { buyTicketsModalOpen &&
        <BuyTicketsModal lottery={lotteryInstance} modalOpen={buyTicketsModalOpen} setModalOpen={setBuyTicketsModalOpen}/>}


        { accountIsOwner &&
            <div className='mt-12'>
                <div>owner panel:</div>
                <div 
                className='m-2 order-4 border-white text-xl text-black p-4 rounded-md hover:bg-funBlue cursor-pointer'
                onClick={closeLottery}
                >
                    draw winner
                </div>
                <div 
                className='m-2 text-xl text-black p-4 rounded-md hover:bg-funBlue cursor-pointer'
                onClick={createNewLottery}
                >
                    create new lottery
                </div>
                
            </div>
            
        }

        

    </div>
  )
}

export default LotteryInstance