import { useEffect,useState } from 'react'
import Layout from '../components/Layout'
import { useGlobalContext } from '../utils/context/globalContext'
import ChooseWalletProvider from '../components/utils/ChooseWalletProvider'
import ConnectButton from '../components/ConnectButton'
import Main from '../components/Main'
import AwaitTransactionModal from '../components/utils/AwaitTransactionModal'

const IndexPage = () => {
  const { 
    connectModalOpen, 
    transactionToCheck,
  } = useGlobalContext()
  
  return (
  <Layout title="Snow Lottery">
    <div className="flex flex-col items-center justify-center font-customFont">
      { connectModalOpen && <ChooseWalletProvider/> }
      <ConnectButton/>
      <Main/>
    </div>
    {transactionToCheck && <AwaitTransactionModal/> }
  </Layout>

  )
}

export default IndexPage
