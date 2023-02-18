import { useGlobalContext } from '../utils/context/globalContext';

export default function ConnectButton() {
    const { setConnectModalOpen } = useGlobalContext();
    
    return (
    <div className='
    fixed top-4 right-4 font-bold md:p-4 p-2
    bg-funPurple text-white flex justify-center items-center rounded-md cursor-pointer
    '
    onClick={()=>setConnectModalOpen(true)}
    >
        QNect
    </div>
    );
}