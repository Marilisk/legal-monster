import { FC, useCallback, useEffect, useState } from 'react'
import { StyledTextField } from '../input elements/formTextField/FormTextField'
import dadataApi from '../../redux/api/dadataApi'
import { Autocomplete, MenuItem } from '@mui/material'
import { IDadataCompany } from '../../types/clientsTypes'

interface IProps {
    value: string
    name: string
    setFieldValue: (f: string, v: string) => void
}

const CompanySuggester: FC<IProps> = ({
    value,
    setFieldValue,

}: IProps) => {

    const [tipsData, setTipsData] = useState<IDadataCompany[]>([])

    const getTips = useCallback(async (value: string) => {
        if (value.length > 3) {
            try {
                const response = await dadataApi.post('suggestions/api/4_1/rs/suggest/party',
                    { query: value })
                setTipsData(response.data.suggestions)
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => getTips(value), 1000)
        return () => clearTimeout(timer)
    }, [value])

    const options = tipsData.map((item, i) => ({
        ...item,
        label: item.value,
        key: `${item.data?.inn}${i}` || i,
    }))

    const onChange = (newValue: IDadataCompany | null) => {
        
        if (newValue) {
            console.log('newValue', newValue)
            
            newValue?.value && setFieldValue('name', newValue?.value)
            newValue?.data?.inn && setFieldValue('INNnumber', newValue?.data.inn)
        }
    }
     


    return (
        <div>
            <Autocomplete
                autoComplete
                options={options}
                onChange={(event: any, newValue: IDadataCompany | null) => {
                    onChange(newValue);
                  }}
                renderInput={(params) => {
                    return <StyledTextField
                        {...params} 
                        // value={value}
                        label="Введите наименование" 
                        onChange={(e) => setFieldValue('name', e.target.value)}
                    />
                }}
                inputValue={value}

                /* onInputChange={(event, newInputValue) => {
                    setFieldValue('name',newInputValue);
                  }} */
             renderOption={(props, option) => {
                 console.log('props', props)
                 console.log('option', option)
                 return <MenuItem key={props.id}  {...props} >
                     {option.value}
                 </MenuItem>
             }}
            />            
        </div>
    )
}

export default CompanySuggester