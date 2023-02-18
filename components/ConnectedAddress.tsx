import React from 'react'
import { useGlobalContext } from '../utils/context/globalContext'

const ConnectedAddress = () => {
    const { account, provider } = useGlobalContext()

    // console.log('global provider',provider)

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