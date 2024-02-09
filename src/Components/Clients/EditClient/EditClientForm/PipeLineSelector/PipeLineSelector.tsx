import { FC } from 'react'
import c from './PipeLineSelector.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { fetchEditClient } from '../../../../../redux/clientsSlice';
import { Step, StepLabel, Stepper } from '@mui/material';
import { QontoConnector, stepSx } from './PipeLineSelector.styled';


interface IPipeLineSelectorProps {
    value: number
    clientId?: string
    onChange?: (phase: {
        number: number,
        assignDateTimestamp: number
    }) => void
}

const PipeLineSelector: FC<IPipeLineSelectorProps> = ({ value, clientId, onChange }: IPipeLineSelectorProps) => {

    // const pipeline = useAppSelector(s => s.clients.salesPipeline)

    const pipelineState = useAppSelector(s => s.auth.loginData.data?.ownerSettings.salesPipeline)
    const defaultPipeline = useAppSelector(s => s.clients.salesPipeline)
    const pipeline = pipelineState?.isCustom ? pipelineState.pipeline : defaultPipeline

    const dispatch = useAppDispatch()

    const setValue = (stepNumber: number) => {
        const payload = {
            number: stepNumber,
            assignDateTimestamp: Date.now()
        }
        if (!clientId && onChange) {
            onChange(payload)
        } else {
            dispatch(fetchEditClient({
                phase: payload,
                _id: clientId,
            }))
        }
    }

    return (
        <div className={c.stepsWrapper}>
            <Stepper activeStep={value - 1} alternativeLabel connector={<QontoConnector />} >
                {pipeline.map((stage, i) => {
                    return <Step key={i} sx={stepSx}
                        onClick={() => setValue(stage.stepNumber)}
                    >
                        <StepLabel >
                            {stage.title}
                        </StepLabel>
                    </Step>
                })}
            </Stepper>
        </div>
    );
};

export default PipeLineSelector;