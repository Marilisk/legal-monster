import { Form, Formik } from "formik";
import { useState } from "react"
import FormTextField from "../../../assets/input elements/formTextField/FormTextField";
import { validateEmail, validatePassword } from "../../Calendar/AddEventForm/validateForm";
import c from './LoginForm.module.scss'
import CheckBox from "../../../assets/input elements/checkbox/CheckBox";
import { Button } from "../../../assets/input elements/button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { EyeIcon } from "../../../assets/Icons/EyeIcon";
import { fetchAuth } from "../../../redux/authSlice";
import { LoadingDots } from "../../../assets/LoadingDots/LoadingDots";
import { LoadingStatusEnum } from "../../../types/userTypes";

interface ILoginFormProps {
    loadingStatus: LoadingStatusEnum
}

export const LoginForm = ({ loadingStatus }: ILoginFormProps) => {
    const dispatch = useAppDispatch()
    const serverMsg = useAppSelector(s => s.auth.loginData.serverMessage)
    const [showPassword, toggleShowPassword] = useState(false)

    const emailInLS = localStorage.getItem('email')
    const initialValues = emailInLS ? { email: emailInLS, password: '', rememberMe: true }
        : { email: '', password: '', rememberMe: true, }

    return <div className={c.wrap}>
        <Formik initialValues={initialValues}
            onSubmit={async (values, actions) => {
                const payload = { email: values.email, password: values.password };
                console.log(payload)
                await dispatch(fetchAuth(payload));
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
                        <Button type="submit">
                            {loadingStatus === LoadingStatusEnum.loading ?
                                <LoadingDots /> :
                                <div>Войти</div>}
                        </Button>
                    </div>


                </Form>
            )}

        </Formik>
    </div>
}