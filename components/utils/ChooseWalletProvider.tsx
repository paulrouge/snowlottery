import React from 'react'
import { useGlobalContext } from '../../utils/context/globalContext'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

type Props = {
    name: string
}

// extend on MetaMaskEthereumProvider type
type MetaMaskEthereumProvider = {
    request: (args: {method: string }) => Promise<string[]>
}

declare const window: any;

const WalletProvider = ({name}: Props) => {
    const { setAccount, setConnectModalOpen, setProvider, setSigner, chainId } = useGlobalContext()

    // switch chain
    const switchChain = async () => {
        try {
            await window.hanaWallet.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainId }],
            });
          } catch (error) {
                console.log(error)
        }
    }

    const handleClick = async () => {
        if(name === 'MetaMask'){
            try {
                const provider = await detectEthereumProvider({mustBeMetaMask:false}) as MetaMaskEthereumProvider
                
                if (provider) {
                    const _account = await provider.request({ method: 'eth_requestAccounts' })
                    setAccount(_account[0])
                    const _provider = new ethers.providers.Web3Provider(provider)
                    setProvider(_provider) 
                    const _signer = _provider.getSigner()
                    setSigner(_signer)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (name === 'Hana') {
            try {
                if(window !== undefined) {
                    if (window.hanaWallet !== undefined) {
                        const _account = await window.hanaWallet.ethereum.request({ method: 'eth_requestAccounts' })
                        setAccount(_account[0])
                        const _provider = new ethers.providers.Web3Provider(window.hanaWallet.ethereum,)
                        setProvider(_provider)
                        const _signer = _provider.getSigner()
                        setSigner(_signer)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        switchChain()
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
        <WalletProvider name='MetaMask'/>
    </div>
  )
}

export default ChooseWalletProvider