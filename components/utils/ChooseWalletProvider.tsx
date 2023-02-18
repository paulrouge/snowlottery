import React from 'react'
import { useGlobalContext } from '../../utils/context/globalContext'
import { ConnectToHana, ConnectToMetaMask } from '../../utils/connectWallet'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

type Props = {
    name: string
}

// extend on MetaMaskEthereumProvider type
type MetaMaskEthereumProvider = {
    request: (args: { method: string }) => Promise<string[]>
}

const WalletProvider = ({name}: Props) => {
    const { setAccount, setConnectModalOpen, setProvider } = useGlobalContext()

    const handleClick = async () => {
        const provider = await detectEthereumProvider() as MetaMaskEthereumProvider
        
        if (provider) {
            const _account = await provider.request({ method: 'eth_requestAccounts' })
            setAccount(_account[0])
            const _provider = new ethers.providers.Web3Provider(provider)
            console.log(_provider)
            setProvider(_provider)    
        }

   



        // if (name === 'Hana') {
        //     const _account = await ConnectToHana()
        //     if (_account === null){
        //         return alert('Make sure you have Hana Wallet installed!')
        //     }
        //     try {
        //         setAccount(_account)
        //     } catch (err) {
        //         alert(err)
        //     }
        // } else if (name === 'Metamask') {
        //     const _account = await ConnectToMetaMask()
        //     if (_account === null){
        //         return alert('Make sure you have Metamask installed!')
        //     }
        //     try {
        //         setAccount(_account)
        //     } catch (err) {
        //         alert(err)
        //     }
        // }  else {
        //     alert('Something went wrong!')
        // }
        setConnectModalOpen(false)
    }

    return (
    <div 
    onClick={handleClick}
    className='p-4 m-2 bg-customBlue rounded-md text-white cursor-pointer z-40'
    >
        {name}
    </div>
)}
        
const ChooseWalletProvider = () => {
    const {setConnectModalOpen} = useGlobalContext()

    return (
    <div className='
    relative fixed top-0 left-0 w-screen h-screen 
    bg-cover bg-center backdrop-filter backdrop-blur-sm
    flex justify-center items-center
    font-customFont font-bold text-2xl
    '
    onClick={()=>{setConnectModalOpen(false)}}
    >
        <WalletProvider name='Hana'/>
        <WalletProvider name='Metamask'/>
    </div>
  )
}

export default ChooseWalletProvider