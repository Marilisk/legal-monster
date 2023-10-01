import { FC } from "react";
import c from './StaffLine.module.scss';
import { brieflyformatDate } from "../../../assets/functions/formatDate";
import { NoBorderButton } from "../../../assets/input elements/NoBorderButton/NoBorderButton";
import { useAppDispatch } from "../../../redux/hooks";
import { IUser } from "../../../types/userTypes";

interface IStaffLineProps {
    user: IUser
}

export const StaffLine: FC<IStaffLineProps> = ({ user }: IStaffLineProps) => {

    const dispatch = useAppDispatch()



    const callEditUserPopup = () => {
        //dispatch(setShowEditClientPopup({isOpened: true, id: user._id }))
    }


    return <div className={c.wrap} id="clientLine" onClick={callEditUserPopup} >

        <div className={c.flexLine}>

            <div className={c.nameCol}>
                {user.fullName}
            </div>

            <div className={c.personCol}>
                <div>
                    {user.email}
                </div>
                <div>
                    {user.phone}
                </div>

            </div>

            <div className={c.powersCol}>
                {user.powers.canSeeOtherClients && 'может видеть чужих клиентов'}
            </div>



            <div className={c.btnCol}>
                <NoBorderButton type="button">
                    <div>
                        изменить
                    </div>
                </NoBorderButton>
            </div>

        </div>
    </div>

}