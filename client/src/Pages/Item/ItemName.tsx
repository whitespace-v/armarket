import React, {useState} from 'react';
import classes from "../../styles/Item/Item.module.scss";
import UIButton from "../../UIKIT/UIButton";
import UIInput from "../../UIKIT/UIInput";
import {addSize, deleteItem} from "../../store/ActionCreators/Creating";
import {fetchItem} from "../../store/ActionCreators/Fetching";
import {FaCheck, FaTimes} from "react-icons/fa";
import {useAppDispatch} from "../../hooks/redux";
import {ICurrentItem} from "../../models/DataBaseItems";
import {useNavigate} from "react-router-dom";

interface IItemName{
    currentItem: ICurrentItem
    user: string
    id: string | undefined
}


const ItemName = (props: IItemName) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [sizeCreation, setSizeCreation] = useState<boolean>(false)
    const [size, setSize] = useState<string>('')

    const deleteItemHandler = () => {
        dispatch(deleteItem(props.currentItem.id))
        navigate('/')
    }

    return (
        <div className={classes['Item__name']}>
            {props.currentItem.name}
            <div style={{display: 'flex', marginTop: 15, gap: 15}}>
                {props.user === 'Admin' &&
                    <UIButton type={"primary-small"} onClick={() => deleteItemHandler()}>Удалить товар</UIButton>
                }
                {sizeCreation ?
                    <div className={classes['Item__name-sizeCreation']} style={{display: 'flex', gap: 15}}>
                        <UIInput type={"primary"} placeholder={'Размер'} onChange={e => setSize(e.currentTarget.value)} value={size}/>
                        <UIButton type={"icon"} onClick={() => {
                            dispatch(addSize(props.currentItem.id.toString(), size))
                            dispatch(fetchItem(props.id))
                        }}><FaCheck/></UIButton>
                        <UIButton type={"icon"} onClick={() => setSizeCreation(false)}><FaTimes/></UIButton>
                    </div>
                    :
                    <>
                        {
                            props.user === 'Admin' &&
                            <UIButton type={"primary-small"} onClick={() => setSizeCreation(true)}>Добавить размер</UIButton>
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default ItemName;