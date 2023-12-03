import React from 'react'
import { useParams } from 'react-router-dom'
import EditClient from './EditClient/Client'
import Client from './EditClient/Client'

const ClientPage = () => {

    const { clientId } = useParams()

    if (!clientId) return null

    return <>
        <Client clientId={clientId} />
    </>
}


export default ClientPage
