import { FC } from "react";
import c from './ClientLine.module.scss';
import { brieflyformatDate } from "../../../assets/functions/formatDate";
import { NoBorderButton } from "../../../assets/input elements/NoBorderButton/NoBorderButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IClient, SalesPhaseType } from "../../../types/clientsTypes";
import { editClientOnClosePopup } from "../ClientsContainer";
import { createModal } from "../../../utils/DialogCreator/DialogCreator";
import EditClient from "../EditClient/Client";
import { NavLink } from "react-router-dom";

interface IClientLineProps {
    client: IClient
    salesphase: SalesPhaseType | null
}

export const ClientLine: FC<IClientLineProps> = ({ client, salesphase }: IClientLineProps) => {

    const dispatch = useAppDispatch()
    const showEditClientPopup = useAppSelector(s => s.clients.showEditClientPopup)

    let closestEvent= new Date();
    if (client.events.length) {
        const timestamps: number[] = []
        client.events.forEach(event => timestamps.push(event.deadLine))
        closestEvent = new Date(Math.min(...timestamps))
    }

    const callEditClientPopup = () => {
        createModal({component: <EditClient clientId={client._id} />, })
        /* if (showEditClientPopup.isOpened) {
            if (client) editClientOnClosePopup(client, dispatch)
            dispatch(setShowEditClientPopup({ isOpened: false, id: '' } ))
        } else {
            dispatch(setShowEditClientPopup({ isOpened: true, id: client._id } ))
        }  */
    }
    

    return <>
    <NavLink to={`/client/${client._id}`}> 
    <div className={c.wrap} id="clientLine" /* onClick={callEditClientPopup} */ >

        <div className={c.flexLine}>

            <div className={c.nameCol}>
                <div>{client.name}</div>
                {/* <div>{client._id}</div> */}
            </div>

            <div className={c.personCol}>
                <div>
                    {client.contactPersons[0]?.name}
                </div>
                <div>
                    {client.contactPersons[0]?.phone}
                </div>
                <div>
                    {client.contactPersons[0]?.job}
                </div>
            </div>

            <div className={c.phaseCol}>
                <div style={{background: `${salesphase?.color}`}} />
                {salesphase?.title}
            </div>

            <div className={c.nextEventCol}>
                <div>{ client.events.length ? brieflyformatDate(new Date(closestEvent)) : null}</div>
            </div>

            <div className={c.btnCol}>
                <NoBorderButton type="button">
                    <div>
                        подробнее
                    </div>
                </NoBorderButton>
            </div>

        </div>
    </div>
    </NavLink>
    </>

}