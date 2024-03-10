import { FC, useState } from "react"
import c from './FormTextField.module.scss'
import { TextField, styled } from "@mui/material"

export const StyledTextField = styled(TextField)({
    '.MuiInputBase-root': {
        backgroundColor: '#fff'
    }
}) as typeof TextField

interface IFormTextFieldProps {
    value: string
    label?: string
    validate?: (arg: string) => string | undefined
    error?: string
    touched?: boolean
    type?: 'text' | 'password'
    onChange: (v: string) => void
    onErrorDetect?: (v: boolean) => void
    multiline?: boolean
}

const FormTextField: FC<IFormTextFieldProps> = ({
    onErrorDetect, value, label = '', validate, onChange, type = 'text', multiline = false, 
}: IFormTextFieldProps) => {

    const [localError, setLocalError] = useState('')


    return <div className={c.lineWrap}>
        <StyledTextField
            value={value}
            label={label}
            fullWidth
            error={!!localError}
            helperText={localError}
            type={type}
            multiline={multiline}
            rows={multiline ? 4 : undefined}
            onChange={(e) => {
                onErrorDetect && onErrorDetect(false)
                onChange(e.target.value)
                const err = validate && validate(e.target.value)
                if (err) {
                    setLocalError(err)
                    onErrorDetect && onErrorDetect(true)
                } else {
                    localError && setLocalError('')
                }
            }}
        />
    </div>
}

export default FormTextField 
