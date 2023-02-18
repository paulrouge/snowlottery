import { useEffect,useState } from 'react'
import Layout from '../components/Layout'
import { useGlobalContext } from '../utils/context/globalContext'
import ChooseWalletProvider from '../components/utils/ChooseWalletProvider'
import { GetProvider, GetSigner, CheckMobileWallet } from '../utils/connectWallet'
import { SwitchChain } from '../utils/walletFunctions'
import ConnectButton from '../components/ConnectButton'
import ConnectedAddress from '../components/ConnectedAddress'
import Main from '../components/Main'
import AwaitTransactionModal from '../components/utils/AwaitTransactionModal'

const IndexPage = () => {
  const { 
    setProvider, 
    setSigner, 
    chainId, 
    connectModalOpen, 
    deviceIsMobile, 
    setDeviceIsMobile,
    transactionToCheck,
  } = useGlobalContext()
  
  const [deviceIsNotWallet, setDeviceIsNotWallet] = useState<boolean>(false)

  // set the provider and signer and switch to the selected chainid
  const initWeb3Settings = async () => {
    const provider = await GetProvider()
    setProvider(provider)

    const signer = await GetSigner()
    setSigner(signer)
  
    const _chainId = (await provider.getNetwork()).chainId.valueOf()

    if(Number(_chainId) !== chainId){
      await SwitchChain(chainId)
    }
  }

  useEffect(() => {
    // check if window object is available, if not return
    if (typeof window === "undefined") return
    
    // check which mobile wallet is being used
    const checkWhichMobileApp = async () => {
      const _check = await CheckMobileWallet()
      if(_check){
        await initWeb3Settings()
      }
      // if the device is not a mobile wallet, set the deviceIsNotWallet to true
      else {
        setDeviceIsNotWallet(true)
      }
    }

    // if device is mobile:
    if (window.innerWidth <= 768) {
      // check if the device is a mobile wallet, if so check if its metamask or hana
      return ( checkWhichMobileApp(), setDeviceIsMobile(true) )
    } else {
      setDeviceIsMobile(false)
    }

    // The device is not mobile, we now add a listener to the window object that gets triggered
    // when the user presses the Hana or MetaMask button. (see utils/connectWallet.tsx)  
    window.addEventListener('connected', initWeb3Settings)
  }, [])

  return (
  <Layout title="Snow Lottery">
    { !deviceIsMobile && 
      <>
        <ConnectButton/>
        { connectModalOpen && <ChooseWalletProvider/> }
      </>
    }
    
    <div className="flex flex-col items-center justify-center font-customFont">
      { deviceIsNotWallet ? 
        <div>
          On mobile, use the Hana or MetaMask app to connect.
        </div> :
      <>
      <ConnectButton/>
      <Main/>
      </>

      }
    </div>
    
    { transactionToCheck && <AwaitTransactionModal/> }
  </Layout>

  )
}

export default IndexPage
