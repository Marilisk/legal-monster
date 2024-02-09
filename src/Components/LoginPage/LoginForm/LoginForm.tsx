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
    const [isError, setError] = useState(false)

    const emailInLS = localStorage.getItem('email')
    const initialValues = emailInLS ? { email: emailInLS, password: '', rememberMe: true }
        : { email: '', password: '', rememberMe: true, }

    const [values, setValues] = useState(initialValues)
    const handleChange = (name: keyof typeof initialValues, v: string | boolean) => {
        setValues({
            ...values,
            [name]: v,
        })
    }

    return <div className={c.wrap}>

        <FormTextField value={values.email}
            label="e-mail"
            validate={validateEmail}
            onChange={(v) => handleChange('email', v)}
            onErrorDetect={(v) => setError(v)}
        />

        <div className={c.passwordLineWrap}>
            <FormTextField value={values.password}
                label="пароль"
                type={showPassword ? 'text' : 'password'}
                validate={validatePassword}
                onChange={(v) => handleChange('password', v)}
                onErrorDetect={(v) => setError(v)}
            />
            <EyeIcon cb={() => toggleShowPassword(!showPassword)}
                fill={showPassword ? '#36403E' : '#C8CACA'} />
        </div>

        <CheckBox checked={values.rememberMe}
            callback={(v: boolean) => handleChange('rememberMe', v)}
        />
        <span>запомнить меня</span>

        {serverMsg && <p className={c.error}>{serverMsg}</p>}

        <div className={c.btnWrap}>
            <Button
                disabled={isError}
                callBack={() => dispatch(fetchAuth(values))}>
                {loadingStatus === LoadingStatusEnum.loading ?
                    <LoadingDots /> :
                    <div>Войти</div>}
            </Button>
        </div>


    </div>
}