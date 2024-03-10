import { useContext, useEffect } from "react"
import { fetchCreateClient, setEditClientStatus } from "../../../../redux/clientsSlice"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { CloseModalContext } from "../../../../utils/DialogCreator/DialogCreator"
import { LoadingStatusEnum } from "../../../../types/userTypes"


export const initialValues = {
    name: '',
    form: 'юридическое лицо',
    INNnumber: '',
    contactPersonName: '',
    contactPersonPhone: '',
    contactPersonJob: '',
    contactPersonNote: '',
    phase: {
        number: 1,
        assignDateTimestamp: 0,
    },
    managers: [],
    lawyers: [],
    contracts: [],
    projects: [],
    events: [],
}

export type ValuesType = typeof initialValues

export const useSubmit = (values: ValuesType, setValues: (a: ValuesType) => void) => {

    const dispatch = useAppDispatch()

    const payload = {
        name: values.name,
        form: values.form,
        INNnumber: values.INNnumber,
        contactPersons: [{
            name: values.contactPersonName,
            phone: values.contactPersonPhone,
            job: values.contactPersonJob,
            note: values.contactPersonNote,
        }],
        phase: { number: values.phase.number, assignDateTimestamp: values.phase.assignDateTimestamp },
        managers: [],
        lawyers: [],
        contracts: [],
        projects: [],
        events: [],
        notes: [],
    }

    return () => {
        dispatch(fetchCreateClient(payload))
        // setValues(initialValues)
    }
}

export const useCloseModal = (setValues: (a: ValuesType) => void) => {

    const loadingStatus = useAppSelector(s => s.clients.clients.createClientStatus)
    const dispatch = useAppDispatch()

    const { closeModal } = useContext(CloseModalContext)

    useEffect(() => {
        if (loadingStatus === LoadingStatusEnum.loaded ) {
            closeModal()
            dispatch(setEditClientStatus(LoadingStatusEnum.empty))
            setValues(initialValues)
        }
    }, [loadingStatus])
}