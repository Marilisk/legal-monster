import React, { FC } from 'react'
import { IContactPerson } from '../../../../../../types/clientsTypes'

interface IProps {
    contactPersons: IContactPerson[]
}

const ContactsList: FC<IProps> = ({ contactPersons }: IProps) => {
    return (
        <div>
            {contactPersons.map((person, i) => (
                <div key={i}>
                    <div>{person.name}</div>
                    <div>{person.job}</div>
                    <div>{person.phone}</div>
                </div>
            ))}
        </div>
    )
}

export default ContactsList