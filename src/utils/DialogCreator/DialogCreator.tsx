import { ReactNode, useState, useRef, createContext } from "react"
import { createPortal } from "react-dom"
import c from './DialogCreator.module.scss'
import { createRoot } from "react-dom/client"
import { Provider } from 'react-redux';
import { store } from './../../redux/redux-store';
import { useGetPosition } from "./DialogCreator.hooks";
import { ThemeProvider } from '@mui/material';
import theme from "../../styles/theme";


/**
 * высота и ширина диалогового окна должны задаются в css приходящего компонента
 * @param onClose  - колбек, выполняющийся при закрытии окна
 * 
 */

interface IDialogProps {
    component: ReactNode
    onClose?: () => void  // колбек для дополнительного действия при закрытии окна
}

interface ICloseModalContext {
    closeModal: () => void
}

export const CloseModalContext = createContext({} as ICloseModalContext)


const Dialog = ({ component, onClose }: IDialogProps) => {

    const [isOpen, setOpen] = useState(true)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const { top, left } = useGetPosition(modalRef)

    const closeImperatively = () => {
        onClose && onClose()
        setOpen(false)
        const rootEl = document.getElementById('RootModalContainer');
        rootEl?.remove()
    }

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let id
        const element = (e.target as HTMLElement).closest('[id]') as HTMLElement
        if (element) { id = element.id }
        if (id === 'RootModalContainer') {
            closeImperatively()
        }
    }

    return <div className={c.backGround} onClick={(e) => handleClose(e)} >
        {
            isOpen && createPortal(
                <ThemeProvider theme={theme}>
                    <div className={c.wrapper} ref={modalRef}
                        style={{
                            left: `calc(50vw - ${left}px )`,
                            top: `calc(50vh - ${top}px )`,
                        }}
                    >
                        <CloseModalContext.Provider value={{ closeModal: closeImperatively }}>
                            {component}
                        </CloseModalContext.Provider>
                    </div>
                </ThemeProvider>,
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
    }

    document.body.appendChild(rootEl);
    createRoot(rootEl).render(
        <Provider store={store} >
            <Dialog component={component} />
        </Provider>
    )
}

