import { Field, FieldAttributes } from "formik"
import { FC } from "react"
import c from './FormTextField.module.scss'
import { TextField, styled } from "@mui/material"

export const StyledTextField = styled(TextField)({
    '.MuiInputBase-root': {
        backgroundColor: '#fff'
    }
}) as typeof TextField

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

const FormTextField: FC<IFormTextFieldProps> = ({ 
        name, value, label = '', validate, error, touched, type, autocomplete, as = 'input', 
    }: IFormTextFieldProps) => {


    return <div className={c.lineWrap}>
        <Field name={name}  >
            {
                ({ field, form, meta }: FieldAttributes<any>) => (
                    <>
                        <StyledTextField
                            {...field}
                            label={label}
                            fullWidth
                            error={!!(error && touched)}
                            type={type}
                        />
                        { meta.error && meta.touched ?
                            <span className={c.error}>{error}</span>
                            : null }
                    </>
                )
            }
        </Field>
    </div>
}

export default FormTextField 
