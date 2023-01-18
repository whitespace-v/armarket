import React, {useState} from 'react';
import classes from "../../styles/Item/Item.module.scss";
import UIInput from "../../UIKIT/UIInput";
import {FaCheck, FaStar, FaTimes} from "react-icons/fa";
import UIButton from "../../UIKIT/UIButton";
import {commentCreate} from "../../store/ActionCreators/Creating";
import {ICurrentItem} from "../../models/DataBaseItems";
import {useAppDispatch} from "../../hooks/redux";

interface IItemSetReview {
    currentItem: ICurrentItem
}

const ItemSetReview = (props: IItemSetReview) => {
    const dispatch = useAppDispatch()
    const [comment,setComment] = useState<string>('')
    const [mark,setMark] = useState<number>(3)
    const [commentCreation, setCommentCreation] = useState<boolean>(false)

    const commentCreationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        dispatch(commentCreate(props.currentItem, comment, mark))
        setComment('')
    }

    return (
        <div className={classes['Item__card-info-setComment']}>
            {commentCreation ?
                <div className={classes['Item__card-info-setComment-container']}>
                    <UIInput type={"primary"} placeholder={'Ваш комментарий'} onChange={e => setComment(e.currentTarget.value)} value={comment}/>
                    <div className={classes['Item__card-info-setComment-mark']}>
                        <span>Оценка:</span>
                        {Array.from(Array(5)).map((_, index) => (
                            <div key={index} className={mark > index ? classes['Item__card-info-setComment-mark-full'] : classes['Item__card-info-setComment-mark-empty']}
                                 onClick={() =>setMark(index + 1)}
                            >
                                <FaStar/>
                            </div>
                        ))}
                    </div>
                    <div className={classes['Item__card-info-setComment-buttons']}>
                        <UIButton type={'icon'} onClick={e => commentCreationHandler(e)}><FaCheck/></UIButton>
                        <UIButton type={'icon'} onClick={() => {
                            setCommentCreation(false);
                            setComment('')
                        }}><FaTimes/></UIButton>
                    </div>
                </div>
                :
                <div className={classes['Item__card-info-setComment-button']}>
                    <UIButton type={"primary-small"} onClick={() => setCommentCreation(true)}>
                        Оставить отзыв
                    </UIButton>
                </div>
            }
        </div>
    );
};

export default ItemSetReview;