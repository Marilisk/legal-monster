import { FC, useState } from 'react'
import c from './Tabs.module.scss'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

interface ITabsProps {
    tabsArray: {
        name: string
        component: JSX.Element
    }[]
}


export const Tabs: FC<ITabsProps> = ({ tabsArray }: ITabsProps) => {

    const tabNames = tabsArray.map(tab => tab.name)

    const [currentTabI, setCurrentTabI] = useState(0)

    return <div className={c.wrap}>
        <ToggleButtonGroup value={currentTabI}>
            {tabNames.map((name, i) => (
                <ToggleButton key={i} value={i} onClick={() => setCurrentTabI(i)}>
                    {name}
                </ToggleButton>
            ))
            }
        </ToggleButtonGroup>

        {
            tabsArray.map((tab, i) => {

                if (i === currentTabI) {
                    return <div key={i} >

                        <div className={c.componentWrap}>
                            {tab.component}
                        </div>
                    </div>
                } else return null
            })
        }
    </div>
}