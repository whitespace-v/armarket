import React from 'react';
import classes from '../styles/UIKIT/UIInput.module.scss'

interface IUIInput{
    placeholder: string;
    type: 'primary';
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const UIInput = (props: IUIInput) =>
    <div className={classes['UIInput']}>
        <input type="text" value={props.value} onChange={props.onChange} required/>
        <div className={classes['UIInput-placeholder']}>{props.placeholder}</div>
    </div>


export default UIInput;