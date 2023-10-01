import { Field } from "formik"
import { memo, FC } from "react"
import c from './FormTextField.module.scss'

interface IFormTextFieldProps {
    name: string
    value: string
    label?: string
    validate?: (arg: string) => void
    error?: string
    touched?: boolean
    type?: 'text' | 'password'
    autocomplete?: string
    as?: 'textarea' | 'select' | 'input'
}

const FormTextField: FC<IFormTextFieldProps> = ({ name, value, label = '', validate, error, touched, type, autocomplete, as = 'input' }: IFormTextFieldProps) => {


    return <div className={c.lineWrap}>
        <label>
            <Field name={name}
                validate={validate}
                type={type}
                autoComplete={autocomplete}
                as={as} />
            <span className={value.length > 0 ? c.hangedLabel : undefined} >
                {label}
            </span>
        </label>
        {error && touched ?
            <span className={c.error}>{error}</span>
            : null}
    </div>
}

export default memo(FormTextField)