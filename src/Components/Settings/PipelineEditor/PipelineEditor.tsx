import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { SalesPhaseType } from '../../../types/clientsTypes';
import c from './PipelineEditor.module.scss'
import { CrossIcon } from '../../../assets/Icons/CrossIcon/CrossIcon';
import { Button } from '../../../assets/input elements/button/Button';
//import { savePipelineItem, setSalesPipeline } from '../../../redux/clientsSlice';
import { CreatePipeLineForm } from './createPipelineForm/CreatePipelineForm';
import { PipeLineItem } from './PipelineItem';
import { fetchAddPipeline } from '../../../redux/authSlice';


const PipelineEditor = () => {

    const dispatch = useAppDispatch()

    const [showForm, setShowForm] = useState(false)
    //const [wasPipelineChanged, setWasPipelineChanged] = useState(false)

    let pipeline = useAppSelector(s => s.auth.loginData.data?.ownerSettings.salesPipeline.pipeline)
    /* const defaultPipeline = useAppSelector(s => s.clients.salesPipeline)
    const isCustom = pipelineState?.isCustom
    let pipeline = isCustom ? pipelineState.pipeline : defaultPipeline */

    if (!pipeline) {
        return <div>NO PIPELINE</div>
    }

    /* const savePipeline = () => {
        if (pipeline) {
            dispatch(fetchAddPipeline(pipeline))
            //dispatch(setSalesPipeline(pipeline))
            setWasPipelineChanged(false)
        }
    } */
    const savePipelineElem = async (newItem: SalesPhaseType, index: number) => {
        //newPipeline
        //let newItemIndex = pipeline?.findIndex(el => el.)
        if (pipeline) {
            let newPipeline = [...pipeline]
            newPipeline[index] = newItem
            dispatch(fetchAddPipeline(newPipeline))
            /* try {
                const response = await 
                if (response) dispatch(savePipelineItem(newItem))
            } catch (error) {
                console.log(error)
            } */
        }
    }

    const onDelete = (i: number) => {
        if (pipeline) {
            const newPipeline = [...pipeline].filter((_, index) => index !== i)
            dispatch(fetchAddPipeline(newPipeline))
        }
    }

    pipeline = pipeline.slice().sort((el, nextEl) => el.stepNumber - nextEl.stepNumber)

    return (
        <div className={c.wrap}>
            {
                showForm ?
                    <CreatePipeLineForm pipeline={pipeline} setShowForm={setShowForm} />
                    :
                    <button className={c.addBtn} onClick={() => setShowForm(true)}>
                        <CrossIcon size='32px' color='#36403E' rotate={'45'} />
                    </button>
            }
            <div>
                {pipeline.map((el, i) => {
                    return <PipeLineItem key={i} element={el}
                        index={i}
                        saveItem={savePipelineElem}
                        onDelete={() => onDelete(i)} />
                })}
            </div>

            {/* <div>
                {wasPipelineChanged &&
                    <Button type='button' callBack={savePipeline} >
                        <div>
                            сохранить
                        </div>
                    </Button>
                }
            </div> */}
        </div>
    );
};

export default PipelineEditor;



