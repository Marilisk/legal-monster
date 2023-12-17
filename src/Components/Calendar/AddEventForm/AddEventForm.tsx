import { FC, useMemo } from "react"
import { Formik, Form, Field } from "formik"
import c from './AddEventForm.module.scss'
import { Button } from "../../../assets/input elements/button/Button";
import { RadioBtnsGroup } from "../../../assets/input elements/RadioBtnsGroup/RadioBtnsGroup";
import { formatDate } from "../../../assets/functions/formatDate";
import DateTimePicker from "../../../assets/input elements/DateTimePicker/DateTimePicker";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IFormPopup, addTask, callDatePickerPopUp, editTask, setEventToForm, } from "../../../redux/calendarSlice";
import FormTextField from "../../../assets/input elements/formTextField/FormTextField";
import { basicLengthValidate } from "./validateForm";
import { getInitialValues } from "./getInitialValues";
import PopupHeader from "../../../assets/popupHeader/PopupHeader";


interface IAddEventForm {
    handleCloseForm: (value: string) => void
    startDate: Date
    popUp: IFormPopup
}

export const handleOpenDatePicker = (e: React.MouseEvent, dispatch: any) => {
    dispatch(callDatePickerPopUp({
        offsetTop: (e.currentTarget as HTMLElement).offsetTop,
        offsetLeft: (e.currentTarget as HTMLElement).offsetLeft,
        id: ((e.target as HTMLElement).closest('[id]') as HTMLElement).id
    }))
}

export const AddEventForm: FC<IAddEventForm> = ({ handleCloseForm, startDate, popUp }: IAddEventForm) => {

    const dispatch = useAppDispatch()
    const datePickerPopUp = useAppSelector(s => s.calendar.datePickerPopUp)

    const editibleTask = popUp.initialTask
    const editMode = Boolean(popUp.initialTask)
    const initialValues = useMemo(
        () => getInitialValues(startDate, editibleTask)
        , [startDate, editibleTask])

    //console.log('in AddEventForm', initialValues.startDate)


    return <div className={c.wrap} onClick={(e) => handleOpenDatePicker(e, dispatch)}>

        <Formik initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                const payload = {
                    startDate: {
                        day: values.startDate.getDate(),
                        year: values.startDate.getFullYear(),
                        month: values.startDate.getMonth(),
                        timeStamp: values.startDate.getTime(),
                    },
                    finishDate: {
                        day: values.finishDate.getDate(),
                        year: values.finishDate.getFullYear(),
                        month: values.finishDate.getMonth(),
                        timeStamp: values.finishDate.getTime(),
                    },
                    title: values.title,
                    description: values.description,
                    client: values.client,
                    type: values.type,
                    _id: values._id
                }
                if (editMode) {
                    dispatch(editTask(payload))
                } else {
                    dispatch(addTask(payload))
                }
                dispatch(setEventToForm(null))
                actions.resetForm()
                handleCloseForm('addEvent')
            }}>

            {props => (
                <Form >

                    <PopupHeader title={editMode ? 'Изменить мероприятие' : 'Новое событие'}
                        /* handleClose={() => {
                            props.handleReset()
                            handleCloseForm('addEvent') // can i remove this? guess no...
                            dispatch(setEventToForm(null))
                        }}  */
                        />

                    <div className={c.formBodyWrap}>

                        <div>тип события</div>
                        <RadioBtnsGroup values={['задача', 'встреча', 'заседание', 'совещание']}
                            chosenValue={props.values.type}
                            name='type' />

                        <div className={c.lineWrap} id="startDate">
                            <label>
                                <Field name='startDate' id='startDate' value={formatDate(props.values.startDate)} />
                                <span className={props.values.startDate ? c.hangedLabel : undefined} >
                                    начало
                                </span>
                            </label>
                            <DateTimePicker currentDate={props.values.startDate} 
                                setValue={props.setFieldValue}
                                fieldName='startDate'
                                showDataPicker={datePickerPopUp.id === 'startDate'}
                                controlledPicker={{ name: 'finishDate', value: props.values.finishDate }} />
                        </div>

                        <div className={c.lineWrap} id="finishDate">
                            <label>
                                <Field name='finishDate' id='finishDate' value={formatDate(props.values.finishDate)} />
                                <span className={props.values.finishDate ? c.hangedLabel : undefined} >
                                    конец
                                </span>
                            </label>
                            <DateTimePicker currentDate={props.values.finishDate} setValue={props.setFieldValue}
                                fieldName='finishDate'
                                showDataPicker={datePickerPopUp.id === 'finishDate'} />
                        </div>

                        <FormTextField name="title" value={props.values.title} label='наименование'
                            error={props.errors.title}
                            validate={(value) => basicLengthValidate(value, 3)}
                            touched={props.touched.title} />

                        <FormTextField name="description" value={props.values.description} label='описание' />

                        {/* сюда еще селект с клиентами надо */}

                        {/* и селект с свыбором ответственного сотрудника если роль руководителя */}

                        <div className={c.btnsContainer}>
                            <Button type="submit" disabled={Boolean(props.errors.title)}>
                                <span>
                                    {editMode ? 'сохранить' : 'добавить'}
                                </span>
                            </Button>


                        </div>
                    </div>
                </Form>
            )}

        </Formik>

    </div>
}

