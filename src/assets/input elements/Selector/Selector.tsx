import { FC, useState } from 'react';
import c from './Selector.module.scss'

interface ISelectorProps {
    values: { title: string, systemValue: string }[]
    onChange: (arg: string) => void
    chosenValue: { title: string, systemValue: string }
    title?: string
    icon?: JSX.Element
}

const Selector: FC<ISelectorProps> = ({ onChange, values, chosenValue, title, icon }: ISelectorProps) => {


    const [visible, setVisible] = useState(false)

    return (
        <div className={c.wrap}>
            <div className={c.mainWrap} onClick={() => setVisible(!visible)}>
                <div className={c.title}>
                    {
                        title && <div>
                            {icon}
                            <h2>
                                {title}
                            </h2>
                        </div>
                    }
                </div>

                <div className={c.chosen}>
                    <span>{chosenValue.title}</span>
                </div>
            </div>

            <div className={visible ? c.visible : c.inVisible}>
                {values.map((v, i) => {
                    if (v.systemValue === chosenValue.systemValue) return null
                    return <div key={i} className={visible ? c.visibleItem : c.inVisibleItem}
                        onClick={() =>{
                            onChange(v.systemValue)
                            setVisible(false)
                        }} >
                        <span>{v.title}</span>
                    </div>
                })}
            </div>

            <div></div>
            <div></div>
        </div>
    );
};

export default Selector;