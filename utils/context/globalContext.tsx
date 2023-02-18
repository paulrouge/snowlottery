import React, {useState} from 'react';
import { ethers } from 'ethers';

export type globalContextValueType = {
    account: string,
    setAccount: React.Dispatch<React.SetStateAction<string>>,
    balance: number,
    setBalance: React.Dispatch<React.SetStateAction<number>>,
    chainId: number,
    setChainId: React.Dispatch<React.SetStateAction<number>>,
    provider: ethers.BrowserProvider | null,
    setProvider: React.Dispatch<React.SetStateAction<ethers.BrowserProvider | null>>,
    signer: ethers.Signer | null,
    setSigner: React.Dispatch<React.SetStateAction<ethers.Signer | null>>,
    globalLoading: boolean,
    setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>,
    transactionToCheck: ethers.ContractTransactionResponse | null,
    setTransactionToCheck: React.Dispatch<React.SetStateAction<ethers.ContractTransactionResponse | null>>,
    connectModalOpen: boolean,
    setConnectModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    deviceIsMobile: boolean,
    setDeviceIsMobile: React.Dispatch<React.SetStateAction<boolean>>,
    // for the lottery project only
    lotteryId: number,
}

export const GlobalContext = React.createContext<globalContextValueType | null>(null)
export const useGlobalContext = () => React.useContext(GlobalContext)!;

export const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {
    const [account, setAccount] = useState<string>("")
    const [balance, setBalance] = useState<number>(0)
    const [chainId, setChainId] = useState<number>(553)
    const [provider, setProvider] = useState<ethers.BrowserProvider|null>(null)
    const [signer, setSigner] = useState<ethers.Signer|null>(null)
    const [globalLoading, setGlobalLoading] = useState<boolean>(false)
    const [transactionToCheck, setTransactionToCheck] = useState<ethers.ContractTransactionResponse|null>(null)
    const [connectModalOpen, setConnectModalOpen] = useState<boolean>(false)
    const [deviceIsMobile, setDeviceIsMobile] = useState<boolean>(true)

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
        deviceIsMobile: deviceIsMobile,
        setDeviceIsMobile: setDeviceIsMobile,
        // for the lottery project only
        lotteryId: 1,
    }

    return(
        <GlobalContext.Provider value={value}>
            {children}  
        </GlobalContext.Provider>
    )

}