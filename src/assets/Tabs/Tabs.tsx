import { FC, useState } from 'react'
import c from './Tabs.module.scss'
import { Button } from '../input elements/button/Button'
import { TabButton } from '../input elements/tabButton/TabButton'

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
        <div className={c.header}>
            {tabNames.map((name, i) => <div key={i}>
                <div>
                    <TabButton isActive={i === currentTabI} callBack={() => setCurrentTabI(i)}>
                        <div>{name}</div>
                    </TabButton>
                </div>
            </div>)
            }
        </div>

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