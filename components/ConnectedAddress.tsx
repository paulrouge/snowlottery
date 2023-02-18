import React from 'react'
import { useGlobalContext } from '../utils/context/globalContext'

const ConnectedAddress = () => {
    const { account } = useGlobalContext()


    // format the account address
    const formatAddress = (address: string) => {
        if (!address) return ''
  
        return address.slice(0, 6) + '...' + address.slice(-4)
    }
    
    return (
        <div>Connected: {formatAddress(account)}</div>
    )
}

export default ConnectedAddress