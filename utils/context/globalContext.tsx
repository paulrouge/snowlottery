import React, {useState} from 'react';
import { ethers} from 'ethers';



export type globalContextValueType = {
    account: string,
    setAccount: React.Dispatch<React.SetStateAction<string>>,
    balance: number,
    setBalance: React.Dispatch<React.SetStateAction<number>>,
    chainId: number,
    setChainId: React.Dispatch<React.SetStateAction<number>>,
    provider: ethers.providers.Web3Provider | null,
    setProvider: React.Dispatch<React.SetStateAction<ethers.providers.Web3Provider|null>>,
    signer: ethers.Signer | null,
    setSigner: React.Dispatch<React.SetStateAction<ethers.Signer | null>>,
    globalLoading: boolean,
    setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>,
    transactionToCheck: any | null,
    setTransactionToCheck: React.Dispatch<React.SetStateAction<any| null>>,
    connectModalOpen: boolean,
    setConnectModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    // set 
    callBackTransaction: string | null,
    setCallBackTransaction: React.Dispatch<React.SetStateAction<string | null>>,
    // for the lottery project only
    lotteryId: number,
}

export const GlobalContext = React.createContext<globalContextValueType | null>(null)
export const useGlobalContext = () => React.useContext(GlobalContext)!;

export const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {
    const [account, setAccount] = useState<string>("")
    const [balance, setBalance] = useState<number>(0)
    const [chainId, setChainId] = useState<number>(553)
    const [provider, setProvider] = useState<ethers.providers.Web3Provider|null>(null)
    const [signer, setSigner] = useState<ethers.Signer|null>(null)
    const [globalLoading, setGlobalLoading] = useState<boolean>(false)
    const [transactionToCheck, setTransactionToCheck] = useState<any|null>(null)
    const [connectModalOpen, setConnectModalOpen] = useState<boolean>(false)
    const [callBackTransaction, setCallBackTransaction] = useState<string|null>(null)

    const value: globalContextValueType = {
        account,
        setAccount,
        balance,
        setBalance,
        chainId,
        setChainId,
        provider,
        setProvider,
        signer,
        setSigner,
        globalLoading,
        setGlobalLoading: setGlobalLoading,
        transactionToCheck: transactionToCheck,
        setTransactionToCheck: setTransactionToCheck,
        connectModalOpen: connectModalOpen,
        setConnectModalOpen: setConnectModalOpen,
        callBackTransaction: callBackTransaction,
        setCallBackTransaction: setCallBackTransaction,
        // for the lottery project only
        lotteryId: 1,
    }

    return(
        <GlobalContext.Provider value={value}>
            {children}  
        </GlobalContext.Provider>
    )

}