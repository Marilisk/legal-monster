import { FC } from "react";
import { NewClientForm } from './NewClientForm/NewClientForm';
import PopupWrapper from "../../../assets/PopupWrapper/PopupWrapper";

const NewClient: FC = () => {

    return (
        <PopupWrapper title={'Новый клиент'} >
            <NewClientForm />
        </PopupWrapper>
    )
}

export default NewClient;



