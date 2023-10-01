import { FC, useState } from 'react';
import { IContactPerson } from '../../types/clientsTypes';
import c from './ContactsPresenter.module.scss'
import { Arrow } from '../Icons/ArrowIcon/Arrow';
import { ExpandMoreIcon } from '../Icons/ExpandMore';
import { PhoneIcon } from '../Icons/PhoneIcon';

interface IContactsPresenterProps {
    contacts: IContactPerson[]
}

const ContactsPresenter: FC<IContactsPresenterProps> = ({ contacts }: IContactsPresenterProps) => {

    let mainContactIdx = contacts.findIndex(contact => contact.isMain === true)
    if (mainContactIdx === -1) mainContactIdx = 0

    const [showAll, setShowAll] = useState(false)

    return (
        <div className={c.contactContent}>

            <div className={showAll ? c.otherItems : c.hiddenItems}>
                {contacts.map((el, i) => {
                    if (i === mainContactIdx || showAll) {
                        return <div key={i} className={c.item}>
                            <p>
                                {el.name}
                            </p>
                            <PhoneIcon size={16} color='#fff' />
                            <p>
                                {el.phone}
                            </p>
                            <p>
                                {el.email}
                            </p>
                            <p>
                                {el.preferredMethod}
                            </p>
                        </div>
                    } else return null

                })}
            </div>

            {contacts.length > 1 && !showAll &&
                <button onClick={() => setShowAll(!showAll)} type='button'>
                    <ExpandMoreIcon size={30} color='#fff' />
                </button>
            }

        </div>
    );
};

export default ContactsPresenter;