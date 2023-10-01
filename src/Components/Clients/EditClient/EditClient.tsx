import { FC } from 'react'
import c from './../NewClient/NewClient.module.scss'
import EditClientForm from './EditClientForm/EditClientForm';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { LoadingDotsPreloader } from '../../../assets/LoadingDots/LoadingDotsPreloader';
import { LoadingStatusEnum } from '../../../types/userTypes';

interface IEditClientProps {
    clientId: string
}

const EditClient: FC<IEditClientProps> = ({ clientId }: IEditClientProps) => {

    const dispatch = useAppDispatch()

    //const clientId = useAppSelector(s => s.clients.showEditClientPopup.clientId)
    const client = useAppSelector(s => s.clients.clients.items.find(c => c._id === clientId))
    const isLoading = useAppSelector(s => s.clients.clients.status === LoadingStatusEnum.loading)
    //const handleCloseEditClientPopup = () => dispatch(setShowEditClientPopup({ isOpened: false, id: '' }))

    if (!client) {
        return <div>NO client</div>
    }

    return <div id='editClientPopup' className={c.wrap}>
        <EditClientForm client={client} />
    </div>

};

export default EditClient;



{/* <div id='editClientPopup' className={c.wrap}>
    <EditClientForm client={client}
        handleCloseEditClientPopup={handleCloseEditClientPopup} />
</div> */}