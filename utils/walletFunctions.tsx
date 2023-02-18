declare const window: any;

export const SwitchChain = async (chainId:number) => {
    // get localstorage
    const wallet = localStorage.getItem('wallet');
    
    if (wallet === 'hana') {
        try {
            await window.hanaWallet.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
            });
        } catch (error) {
                console.log(error)
        }
    } else if (wallet === 'metamask') {
        try {
            await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
            });
        } catch (error) {
                console.log(error)
        }
    } else {
        console.log('No wallet found...')
    }
}
