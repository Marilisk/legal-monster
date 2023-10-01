import { useState } from 'react';
import c from './../LoginForm/LoginForm.module.scss'
import { Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import FormTextField from '../../../assets/input elements/formTextField/FormTextField';
import { validateEmail, validateFullName, validatePassword } from '../LoginForm/loginValidate';
import { Button } from '../../../assets/input elements/button/Button';
import { EyeIcon } from '../../../assets/Icons/EyeIcon';
import CheckBox from '../../../assets/input elements/checkbox/CheckBox';
import { fetchRegister } from '../../../redux/authSlice';
import { LoadingStatusEnum } from '../../../types/userTypes';
import { LoadingDots } from '../../../assets/LoadingDots/LoadingDots';

interface IRegisterFormProps {
    loadingStatus: LoadingStatusEnum
}

const RegisterForm = ({ loadingStatus }: IRegisterFormProps) => {

    const dispatch = useAppDispatch()
    const serverMsg = useAppSelector(s => s.auth.loginData.serverMessage)
    const [showPassword, toggleShowPassword] = useState(false)

    const initialValues = { email: '', fullName: '', password: '', rememberMe: true, }

    return <div className={c.wrap}>
        <Formik initialValues={initialValues}
            onSubmit={async (values, actions) => {
                const payload = {
                    email: values.email,
                    password: values.password,
                    fullName: values.fullName
                }
                await dispatch(fetchRegister(payload));
                if (values.rememberMe) {
                    localStorage.setItem('email', values.email)
                }
            }}>


            {props => (
                <Form>
                    <FormTextField name='email' value={props.values.email}
                        label="e-mail"
                        validate={validateEmail}
                        error={props.errors.email}
                        touched={props.touched.email} />

                    <FormTextField name='fullName' value={props.values.fullName}
                        autocomplete="username"
                        label="имя и фамилия"
                        validate={validateFullName}
                        error={props.errors.fullName}
                        touched={props.touched.fullName} />

                    <div className={c.passwordLineWrap}>
                        <FormTextField name='password' value={props.values.password}
                            label="пароль"
                            type={showPassword ? 'text' : 'password'}
                            validate={validatePassword}
                            error={props.errors.password}
                            autocomplete="current-password"
                            touched={props.touched.password} />
                        <EyeIcon cb={() => toggleShowPassword(!showPassword)}
                            fill={showPassword ? '#36403E' : '#C8CACA'} />
                    </div>

                    <label className={c.rememberLabel}>
                        <CheckBox checked={props.values.rememberMe}
                            callback={props.handleChange}
                            name='rememberMe' />
                        <span>запомнить меня</span>
                    </label>

                    {serverMsg && <p className={c.error}>{serverMsg}</p>}

                    <div className={c.btnWrap}>
                        <Button type="submit"
                            disabled={loadingStatus === LoadingStatusEnum.loading}>
                            {loadingStatus === LoadingStatusEnum.loading ?
                                <LoadingDots />
                                : <div>Зарегистрироваться</div>}

                        </Button>
                    </div>


                </Form>
            )}



        </Formik>
    </div>
};

export default RegisterForm;