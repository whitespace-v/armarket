import React, {useState} from 'react';
import classes from '../styles/Components/Accordion.module.scss'
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

interface IAccordion {
    children: any[]
    placeholder: string
    child: string
}

const Accordion = (props: IAccordion) => {
    const [opened,setOpened] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>('')
    return (
        <div className={classes['Accordion']}>
            <div className={classes['Accordion-button']} onClick={() => setOpened(!opened)}>
                {selected ? selected : props.placeholder}
                {opened ?  <FaAngleUp/>: <FaAngleDown/>}
            </div>
            {opened &&
            <div className={classes['Accordion-body']}>
                {props.children.map(i =>
                    <div className={classes['Accordion-body__child']} key={i.id} onClick={() => {
                        setSelected(i[props.child])
                        setOpened(!opened)
                    }}>
                        {i[props.child]}
                    </div>
                )}
            </div>
            }
        </div>

    );
};

export default Accordion;