import React from 'react';
import {ICurrentItem} from "../../models/DataBaseItems";
import classes from "../../styles/Item/Item.module.scss";
import {FaStar} from "react-icons/fa";

const ItemReviews = ({currentItem}: {currentItem: ICurrentItem}) => {
    return (
        <>
            <div className={classes['Item__card-info-commentsTitle']}>
                Отзывы об этом товаре:
            </div>
            {currentItem.reviews.length ?
                <div className={classes['Item__card-info-comments']}>
                    {currentItem.reviews.map(i => (
                            <div className={classes['Item__card-info-comments-item']} key={i.id}>
                                <div className={classes['Item__card-info-comments-item-comment']}>
                                    {i.comment}
                                </div>
                                <div className={classes['Item__card-info-comments-item-mark']}>
                                    {Array.from(Array(5)).map((_, index) => (
                                        <div key={index} className={i.mark > index ? classes['Item__card-info-comments-item-mark-full'] : classes['Item__card-info-comments-item-mark-empty']}
                                        >
                                            <FaStar/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
                :
                <div className={classes['Item__card-info-comments']}>
                    <div className={classes['Item__card-info-comments-empty']}>
                        Отзывов на этот товар ещё нет
                    </div>
                </div>
            }
        </>
    );
};

export default ItemReviews;