import React from 'react';
import classes from '../styles/UIKIT/UIButton.module.scss'

interface IUIButton{
    type: 'primary' | 'primary-small-active' | 'primary-small' | 'link' | 'link-active' | 'icon' | 'icon-active'
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const UIButton = (props: IUIButton) => {
    const cls = [classes['UIButton'], classes[props.type]]
    return (
        <div className={cls.join(' ')} onClick={props.onClick}>{props.children}</div>
    );
};

export default UIButton;