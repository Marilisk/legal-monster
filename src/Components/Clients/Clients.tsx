import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ClientLine } from "./ClientLine/ClientLine";
import c from './Clients.module.scss';
import { Button } from "../../assets/input elements/button/Button";
import { TableHeader } from "./TableHeader/TableHeader";
import NewClient from "./NewClient/NewClient";
import { setOpenedFilter } from "../../redux/clientsSlice";
import { IClient, SalesPhaseType } from "../../types/clientsTypes";
import { filterClients } from "./functions/filter";
import { createModal } from "../../utils/DialogCreator/DialogCreator";

interface IClientsProps {
    clients: IClient[]
    showNewClientPopup: boolean
    showEditClientPopup: boolean
}


export const Clients: FC<IClientsProps> = ({ clients, showNewClientPopup, showEditClientPopup }: IClientsProps) => {

    const dispatch = useAppDispatch()
    //const setShowNewClientPop = (value: boolean) => dispatch(setShowNewClientPopup(value))

    const filters = useAppSelector(s => s.clients.clientsFilters)
    const filteredClients: IClient[] = filterClients(filters, clients)
    /* const sortedClients = filteredClients.sort((cl, nextCl) => new Date(cl.updatedAt).getTime() - new Date(nextCl.updatedAt).getTime() )
    console.log(new Date(filteredClients[0].updatedAt).getTime())

    const testArr = [5, 2, 10]
    console.log(testArr.sort((a, b) => a - b)) */

    const pipelineState = useAppSelector(s => s.auth.loginData.data?.ownerSettings.salesPipeline)
    const defaultPipeline = useAppSelector(s => s.clients.salesPipeline)
    let salesPipeline = pipelineState?.isCustom ? pipelineState.pipeline : defaultPipeline
    const openedFilter = useAppSelector(s => s.clients.openedFilter)
    const handleSelectFilter = (e: React.MouseEvent) => {
        const element = (e.target as HTMLElement).closest('[id]') as HTMLElement
        let id
        if (element) { id = element.id }
        if (id) dispatch(setOpenedFilter(id))
    }

    if (!salesPipeline) return null


    return <div className={c.wrapper}
        onClick={handleSelectFilter} >

        <div className={c.header}>
            <Button callBack={() => createModal({ component: <NewClient /> })} >
                новый клиент
            </Button>

            <div>
                <label>поиск
                    <input type="text" />
                </label>
            </div>
            <div>период</div>

        </div>

        <div className={c.main}>

            <div className={c.rightCol}>

                <TableHeader clients={clients} salesPipeline={salesPipeline} openedFilter={openedFilter} />

                <div className={c.table}>
                    {filteredClients.map((el, i) => {
                        let salesphase = salesPipeline.find((phase: SalesPhaseType) => phase.stepNumber === el.phase.number) || null
                        return <ClientLine key={i} client={el} salesphase={salesphase} />
                    })}
                </div>

                {!clients.length && <div>Пока нет клиентов</div>}

            </div>
        </div>

    </div>
}

