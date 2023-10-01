import { FC } from "react";
import { NewClientForm } from './NewClientForm/NewClientForm';
import c from './NewClient.module.scss'
import { SalesPhaseType } from "../../../types/clientsTypes";

interface INewClientProps {
    //setShowNewClientPopup: (arg: boolean) => void

}
const NewClient: FC<INewClientProps> = ({ /* setShowNewClientPopup */ }:INewClientProps) => {
  

    return <div className={c.wrap} id="newClientPopup">
        <NewClientForm /* setShowNewClientPopup={setShowNewClientPopup} */ />

    </div>
}

export default NewClient;



