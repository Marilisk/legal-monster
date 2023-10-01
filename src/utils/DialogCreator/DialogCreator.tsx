import { ReactNode, useState, useRef, useEffect, useDeferredValue } from "react"
import { createPortal } from "react-dom"
import c from './DialogCreator.module.scss'
import { createRoot } from "react-dom/client"
import { Provider } from 'react-redux';
import { store } from './../../redux/redux-store';
import { useGetPosition } from "./DialogCreator.hooks";


/**
 * высота и ширина диалогового окна должны задаются в css приходящего компонента
 * @param onClose  - колбек, выполняющийся при закрытии окна
 * 
 */

interface IDialogProps {
    component: ReactNode
    onClose?: () => void  // колбек для дополнительного действия при закрытии окна
}

const Dialog = ({ component, onClose }: IDialogProps) => {

    const [isOpen, setOpen] = useState(true)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const { top, left } = useGetPosition(modalRef)

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let id
        const element = (e.target as HTMLElement).closest('[id]') as HTMLElement
        if (element) { id = element.id }
        if (id === 'RootModalContainer') {
            onClose && onClose()
            setOpen(false)
            const rootEl = document.getElementById('RootModalContainer');
            rootEl?.remove()
        }
    }
    console.log('in Dialog')
    return <div className={c.backGround} onClick={(e) => handleClose(e)} >
        {
            isOpen && createPortal(
                <div className={c.wrapper} ref={modalRef}
                    style={{
                        left: `calc(50vw - ${left}px )`,
                        // top:`calc(50vh - ${top}px )`, 
                        //border: '2px solid blue'
                    }}
                >
                    {component}
                </div>,
                document.body
            )
        }
    </div>
}


interface IcreateModalProps {
    component: ReactNode

}

export const createModal = ({ component, }: IcreateModalProps) => {

    let rootEl = document.getElementById('RootModalContainer');

    if (!rootEl) {
        rootEl = document.createElement('div');
        rootEl.setAttribute('id', 'RootModalContainer');
        //rootEl.setAttribute('className', c.rootEl)
    }
    console.log('in createModal')

    document.body.appendChild(rootEl);
    createRoot(rootEl).render(
        <Provider store={store} >
            <Dialog component={component}

            />
        </Provider>

    )
}




