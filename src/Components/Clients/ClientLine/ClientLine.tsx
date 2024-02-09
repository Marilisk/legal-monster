import { FC } from "react";
import c from './ClientLine.module.scss';
import { brieflyformatDate } from "../../../assets/functions/formatDate";
import { NoBorderButton } from "../../../assets/input elements/NoBorderButton/NoBorderButton";
import { IClient, SalesPhaseType } from "../../../types/clientsTypes";
import { NavLink } from "react-router-dom";

interface IClientLineProps {
    client: IClient
    salesphase: SalesPhaseType | null
}

export const ClientLine: FC<IClientLineProps> = ({ client, salesphase }: IClientLineProps) => {

    let closestEvent = new Date();
    if (client.events.length) {
        const timestamps: number[] = []
        client.events.forEach(event => timestamps.push(event.deadLine))
        closestEvent = new Date(Math.min(...timestamps))
    }


    return <>
        <NavLink to={`/client/${client._id}`}>
            <div className={c.wrap} id="clientLine"  >

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
                        <div style={{ background: `${salesphase?.color}` }} />
                        {salesphase?.title}
                    </div>

                    <div className={c.nextEventCol}>
                        <div>{client.events.length ? brieflyformatDate(new Date(closestEvent)) : null}</div>
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