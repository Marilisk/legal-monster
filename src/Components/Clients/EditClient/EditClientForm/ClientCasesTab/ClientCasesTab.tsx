import React, { FC } from 'react'
import { IClient } from '../../../../../types/clientsTypes'

interface IClientCasesTabProps {
    client: IClient
}

const ClientCasesTab: FC<IClientCasesTabProps> = ({ }: IClientCasesTabProps) => {
    return (
        <div>
            CASES

        </div>
    )
}

export default ClientCasesTab