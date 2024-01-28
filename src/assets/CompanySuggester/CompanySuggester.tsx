import { ChangeEvent, FC, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { StyledTextField } from '../input elements/formTextField/FormTextField'
import dadataApi from '../../redux/api/dadataApi'
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material'
import { IDadataCompany } from '../../types/clientsTypes'

interface IProps {
    value: string
    name: string
    handleChange: (companyData: IDadataCompany) => void
    onInputChange: (e: string) => void
}

const CompanySuggester: FC<IProps> = ({
    value,
    name,
    handleChange,
    onInputChange,

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

    const options = tipsData.map(item =>({
        ...item,
        label: item.value,
        key: item.data.inn,
    }))

    const onChange = (event: SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined) => {
        console.log(event)
        // handleChange()
    }


    return (
        <div>
            <Autocomplete
                // disablePortal
                autoComplete
                options={options}
                renderInput={(params) => {
                    // console.log('params', params)
                    return <StyledTextField
                    {...params}
                    // name={name}
                    value={value}
                    //label="Введите наименование" 
                    onChange={(e) => onInputChange(e.target.value)}
                    />
                } 
                }
                // onChange={onChange}
               /*  renderOption={(props) => {
                    console.log('props', props)
                    return <div key={props.id}  {...props}
                        // onClick={() => props.onChange() }
                        >
                        
                      
                    </div>
                }} */
            />
        </div>
    )
}

export default CompanySuggester