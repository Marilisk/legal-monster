import c from './InviteStaffForm.module.scss'
import { Form, Formik } from 'formik';
import FormTextField from '../../../../assets/input elements/formTextField/FormTextField';
import { Button } from '../../../../assets/input elements/button/Button';
import { validateEmail } from '../../../Calendar/AddEventForm/validateForm';
import { RadioBtnsGroup } from '../../../../assets/input elements/RadioBtnsGroup/RadioBtnsGroup';
import { ICreateStaffPayload } from '../../../../types/userTypes';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchCreateStaff } from '../../../../redux/staffSlice';

interface IInviteStaffFormProps {
    serverMessage: string
}

const InviteStaffForm = ({serverMessage}:IInviteStaffFormProps) => {

    const dispatch = useAppDispatch()
    const loadingStatus = useAppSelector(s => s.staff.managers.status)

    const initialValues = {
        email: '',
        role: 'менеджер',
    }


    return <div className={c.wrap}>

        <Formik initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                console.log('values', values)
                const payload: ICreateStaffPayload = {
                    email: values.email,
                    role: values.role === 'менеджер' ? 'manager' : 'lawyer',
                }
                dispatch(fetchCreateStaff(payload))
                if (serverMessage) {
                    actions.resetForm()
                }
            }}>

            {props => (
                <Form>

                    <div className={c.formBodyWrap}>


                        <RadioBtnsGroup values={['менеджер', 'юрист']}
                            chosenValue={props.values.role}
                            name='role' />

                        <FormTextField name="email" value={props.values.email} 
                            label='email сотрудника'
                            error={props.errors.email}
                            validate={validateEmail}
                            touched={props.touched.email} />

                            {props.errors.email}
                            

                        <div className={c.btnsContainer}>
                            <Button type="submit" 
                                disabled={Boolean(props.errors.email)}>
                                <span>отправить</span>
                            </Button>
                        </div>
                    </div>

                </Form>

            )}

        </Formik>

       


    </div>

};

export default InviteStaffForm;