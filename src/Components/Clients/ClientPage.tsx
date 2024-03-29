import { useParams } from 'react-router-dom'
import Client from './EditClient/Client'

const ClientPage = () => {

    const { clientId } = useParams()

    if (!clientId) return null

    return <>
        <Client clientId={clientId} />
    </>
}


export default ClientPage
