import { memo, FC, useEffect, useState } from "react"
import { TextField } from "@mui/material"

interface IFormTextFieldProps {
    value: string
    label?: string
    validate?: (arg: string) => void
    localValidate?: (arg: string) => string
    error?: string
    
    type?: 'text' | 'password'
    autocomplete?: string
    as?: 'textarea' | 'select' | 'input'
    onChange: (v: string) => void
}

const TextFieldMui: FC<IFormTextFieldProps> = ({ 
    value, 
    label = '', 
    onChange,
    validate, 
    error,  
    
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

    return <div>
       
            <TextField 
                // validate={validate}
                onChange={(e) => onChange(e.target.value)}
                error={!!localError}
                label={label}
                variant="standard"
                type={type}
                autoComplete={autocomplete}
                fullWidth
                 />
            
       
    </div>
}

export default memo(TextFieldMui)