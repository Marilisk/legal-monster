import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import c from './InviteStaff.module.scss'
import InviteStaffForm from './InviteStaffForm/InviteStaffForm';
import { fetchGetCandidates } from '../../../redux/staffSlice';
import { LoadingStatusEnum } from '../../../types/userTypes';

const InviteStaff = () => {

    const dispatch = useAppDispatch()
    const serverMessage = useAppSelector(s => s.staff.serverMessage)
    const candidates = useAppSelector(s => s.staff.candidates.items)
    const loadingStatus = useAppSelector(s => s.staff.candidates.status)

    useEffect(() => {
        dispatch(fetchGetCandidates())
    }, [dispatch])

    if (loadingStatus === LoadingStatusEnum.loading) {
        return <div>loading...</div>
    }

    return <div className={c.wrap} >
        invite


        <InviteStaffForm serverMessage={serverMessage} />

        {serverMessage && <div>{serverMessage}</div>}


        {Boolean(candidates.length) && <div>
            <h2>Ожидают регистрации:</h2>
            <span>e-mail исчезнет из списка, когда сотрудник с этим e-mail пройдет регистрацию</span>
            {candidates.map(el => {

                return <div key={el._id}>{el.email} - {el.role}</div>
            })}
        </div>}

    </div>

};

export default InviteStaff;