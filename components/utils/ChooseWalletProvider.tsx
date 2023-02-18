import React from 'react'
import { useGlobalContext } from '../../utils/context/globalContext'
import { ConnectToHana, ConnectToMetaMask } from '../../utils/connectWallet'

type Props = {
    name: string
}

const WalletProvider = ({name}: Props) => {
    const { setAccount, setConnectModalOpen } = useGlobalContext()

    const handleClick = async () => {
        if (name === 'Hana') {
            const _account = await ConnectToHana()
            if (_account === null){
                return alert('Make sure you have Hana Wallet installed!')
            }
            setAccount(_account)
        } else if (name === 'Metamask') {
            const _account = await ConnectToMetaMask()
            if (_account === null){
                return alert('Make sure you have Metamask installed!')
            }
            setAccount(_account)
        }   
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