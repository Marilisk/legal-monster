import { useEffect } from "react"
import { selectIsOwner } from "../../redux/authSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchGetMyStaff } from "../../redux/staffSlice"
import { LoadingStatusEnum } from "../../types/userTypes"


// для подгрузки всего чего нужно при инициализации приложения в App.tsx

export const useLoadAppData = () => {

    const dispatch = useAppDispatch()

    const isOwner = useAppSelector(selectIsOwner)
    const canChangeResponsibleUser = useAppSelector(s => s.auth.loginData.data?.powers.canChangeResponsibleUser)
    const managersEmpty = useAppSelector(s => s.staff.managers.status) === LoadingStatusEnum.empty
    const lawyersEmpty = useAppSelector(s => s.staff.lawyers.status) === LoadingStatusEnum.empty

    useEffect(() => {
        if ((isOwner || canChangeResponsibleUser)) {
            console.log('in useeff')
            managersEmpty && dispatch(fetchGetMyStaff('manager'))
            lawyersEmpty && dispatch(fetchGetMyStaff('lawyer'))
        }
    }, [canChangeResponsibleUser, isOwner])


}