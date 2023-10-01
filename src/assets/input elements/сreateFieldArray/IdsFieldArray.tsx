import { Field, FieldArray } from 'formik';
import { FC } from 'react';
import c from './ContactsFieldArray.module.scss'

interface ICreateFieldArrayProps {
    name: string
    array: string[]
    title: string
}

const IdsFieldArray: FC<ICreateFieldArrayProps> = ({ name, array, title }: ICreateFieldArrayProps) => {


    return <div className={c.arrayWrapper}>
        <FieldArray name={name}>

            {({ insert, remove, push }) => <>

                <div className={c.header} >
                    <h3>{title}</h3>
                </div>

                <div className={c.grid} >

                    {
                        array.length > 0 &&
                        array.map((elem, index) => (
                            <div key={index} className={c.line} >
                                <label className={c.arrayLabel}>
                                    <Field name={`${name}.${index}`} type="text" />
                                </label>

                                <button type="button"
                                    className={c.btn}
                                    onClick={() => remove(index)}>
                                    <p>удалить</p>
                                </button>

                            </div>
                        ))
                    }

                </div>

                <button className={c.addBtn} type="button" onClick={() => push('')} >
                    добавить
                    {/* <PlusIcon fill={'#475B73'} /> */}
                </button>

            </>}

        </FieldArray>
    </div>
};

export default IdsFieldArray;