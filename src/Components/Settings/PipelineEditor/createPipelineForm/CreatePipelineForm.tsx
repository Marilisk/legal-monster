import { FC } from 'react';
import c from './../PipelineEditor.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { SalesPhaseType } from '../../../../types/clientsTypes';
import { LoadingStatusEnum } from '../../../../types/userTypes';
import { isThereMissingNum } from '../../../../assets/functions/isThereMissingNum';
import { Form, Formik } from 'formik';
import FormTextField from '../../../../assets/input elements/formTextField/FormTextField';
import { NoBorderButton } from '../../../../assets/input elements/NoBorderButton/NoBorderButton';
import { basicLengthValidate, isNumberValidate } from '../../../Calendar/AddEventForm/validateForm';
import ColorPicker from '../../../../assets/input elements/ColorPicker/ColorPicker';
import { fetchAddPipeline } from '../../../../redux/authSlice';


interface ICreatePipeLineFormProps {
    pipeline: SalesPhaseType[]
    setShowForm: (arg: boolean) => void
}

export const CreatePipeLineForm: FC<ICreatePipeLineFormProps> = ({ pipeline, setShowForm }: ICreatePipeLineFormProps) => {

    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(s => s.clients.clients.status === LoadingStatusEnum.loading)

    const existingNums: number[] = []
    pipeline.forEach(el => existingNums.push(el.stepNumber))

    const missingNum = isThereMissingNum(existingNums)

    const initialValues = {
        stepNumber: (missingNum || (pipeline.length + 1)).toString(),
        title: '',
        color: '#ffffff',
    }


    return <div className={c.formWrap}>
        <h2>Добавление нового элемента:</h2>

        <Formik initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                const newItem = {
                    stepNumber: Number(values.stepNumber),
                    title: values.title,
                    color: values.color,
                }
                const response = await dispatch(fetchAddPipeline([...pipeline, newItem]))
                if (response.meta.requestStatus === "fulfilled") {
                    actions.resetForm()
                    setShowForm(false)
                }
            }}
        >
            {props => (
                <Form>
                    <div className={c.firstLine}>
                        <FormTextField name='stepNumber'
                            value={props.values.stepNumber}
                            label='номер по порядку'
                            error={props.errors.stepNumber}
                            validate={(value) => isNumberValidate(value, existingNums)}
                            touched={props.touched.stepNumber} />

                        <ColorPicker name='color'
                            value={props.values.color}
                            onChange={(v) => props.setFieldValue('color', v)} />
                    </div>

                    <FormTextField name='title'
                        value={props.values.title}
                        label='наименование'
                        error={props.errors.title}
                        validate={(value) => basicLengthValidate(value, 3)}
                        touched={props.touched.title} />

                    <NoBorderButton type='submit'
                        disabled={isLoading || Boolean(Object.keys(props.errors).length)}>
                        <span>добавить</span>
                    </NoBorderButton>

                    <NoBorderButton type='button' callBack={() => setShowForm(false)} >
                        <span>отменить</span>
                    </NoBorderButton>

                </Form>
            )}
        </Formik>

    </div>
}


