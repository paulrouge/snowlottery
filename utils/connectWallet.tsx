import { ethers } from 'ethers';

declare const window: any;

export async function ConnectToHana():Promise<string>{
    alert('Hana wallet detected')
    if(!window.ethereum) return null
    await window.ethereum.enable()
    const accounts = await window.hanaWallet.ethereum.request({ method: 'eth_requestAccounts' })
    // set localstorage
    localStorage.setItem('wallet', 'hana');
    // fire event
    window.dispatchEvent(new CustomEvent('connected'));
    return accounts 
}

export async function ConnectToMetaMask():Promise<string> {
    if (typeof window.ethereum !== 'undefined') {
        alert('MetaMask is installed!');
      } else {
        alert('MetaMask is not installed!');
        }
  
    // if(!window.ethereum) return null
    
    const accounts = await window.ethereum!.request({ method: 'eth_requestAccounts' })
    alert(accounts)
    // set localstorage
    localStorage.setItem('wallet', 'metamask');
    // fire event
    window.dispatchEvent(new CustomEvent('connected'));
    return accounts
}

export const GetProvider = async ():Promise<ethers.BrowserProvider> => {
    // check localstorage
    const wallet = localStorage.getItem('wallet');
    
    if (wallet === 'hana') {
        const _provider =  new ethers.BrowserProvider(window.hanaWallet.ethereum,)
        return _provider
    } else if (wallet === 'metamask') {
        const _provider =  new ethers.BrowserProvider(window.ethereum,)
        return _provider
    } else {
        return null
    }
}

export const GetSigner = async ():Promise<ethers.JsonRpcSigner> => {
    // check localstorage
    const wallet = localStorage.getItem('wallet');
    if (wallet === 'hana') {
        try {
            const _signer =  new ethers.BrowserProvider(window.hanaWallet.ethereum).getSigner()
            return _signer
        } catch (e) {
            console.log(e)
        }
    } else if (wallet === 'metamask') {
        const _signer =  new ethers.BrowserProvider(window.ethereum).getSigner()
        return _signer
    } else {
        return null
    }
}

export const CheckMobileWallet = async ():Promise<string> => {
    if (window.hanaWallet.ethereum.isHanaWallet) {
        localStorage.setItem('wallet', 'hana');
        // alert for testing
        alert('Hana wallet detected')
        return 'hana'
    } else if  (window.ethereum.isMetaMask) {
        localStorage.setItem('wallet', 'metamask');
        // alert for testing
        alert('MetaMask detected')
        return 'metamask'
    }
    return null
}