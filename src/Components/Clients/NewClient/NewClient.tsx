import { FC } from "react";
import { NewClientForm } from './NewClientForm/NewClientForm';
import PopupWrapper from "../../../assets/PopupWrapper/PopupWrapper";

interface INewClientProps {


}
const NewClient: FC<INewClientProps> = ({ }: INewClientProps) => {


    return (
        <PopupWrapper title={'Новый клиент'} >
            <NewClientForm />
        </PopupWrapper>
    )
}

export default NewClient;



