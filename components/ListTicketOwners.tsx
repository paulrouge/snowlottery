import React from 'react'

type Ticket = {
    address: string,
    id: number,
}

const TicketOwner = (props:Ticket) => {
    return (
        <div>
           ticket #{props.id} - {props.address.slice(0, 6) + '...' + props.address.slice(-4)}
        </div>
    )
}

const ListTicketOwners = ({ticketOwners}) => {
    return (
    <div className='mt-4 bg-funBlue p-2 rounded'>
        <div className='text-xl mb-2'>Entries:</div>
        <div className='h-48 overflow-scroll bg-funRed rounded p-2'>
        {ticketOwners.length > 0 && ticketOwners.map((ticket, index) => {
            return <TicketOwner key={index} address={ticket.address} id={ticket.id}/>
        })}
        </div>
    </div>
  )
}

export default ListTicketOwners