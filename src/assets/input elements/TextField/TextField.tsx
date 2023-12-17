import { Field } from "formik"
import { memo, FC, useEffect, useState } from "react"
import c from './FormTextField.module.scss'
import { TextField } from "@mui/material"

interface IFormTextFieldProps {
    name: string
    value: string
    label?: string
    validate?: (arg: string) => void
    localValidate?: (arg: string) => string
    error?: string
    touched?: boolean
    type?: 'text' | 'password'
    autocomplete?: string
    as?: 'textarea' | 'select' | 'input'
}

const FormTextField: FC<IFormTextFieldProps> = ({ 
    name, 
    value, 
    label = '', 
    validate, 
    error,  
    touched, 
    type, autocomplete, 
    as = 'input',
    localValidate,
 }: IFormTextFieldProps) => {

    const [localError, setLocalError] = useState('')
    

    useEffect(() => {
        if (localValidate) {
            const err = localValidate(value)
            if (err) setLocalError(err)
        }
    }, [value, localValidate])

    return <div className={c.lineWrap}>
        <label>
            <TextField name={name}
                // validate={validate}
                type={type}
                autoComplete={autocomplete}
                // as={as}
                 />
            <span className={value.length > 0 ? c.hangedLabel : undefined} >
                {label}
            </span>
        </label>
        { (error || localError) && touched ?
            <span className={c.error}>{error}</span>
            : null}
    </div>
}

export default memo(FormTextField)