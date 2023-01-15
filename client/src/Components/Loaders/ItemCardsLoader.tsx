import React from 'react';
import classes from '../../styles/Components/Loaders/ItemCardsLoader.module.scss'
import Skeleton from "react-loading-skeleton";

const ItemCardsLoader = () => {

    return (
        <div className={classes['ItemCardsLoader']}>
            {Array.from(Array(15).keys()).map((_, index) => (
                <div className={classes['ItemCardsLoader__item']} key={index}>
                    <div className={classes['ItemCardsLoader__item-image']}>
                        <Skeleton height={100} width={100} />
                    </div>
                    <div className={classes['ItemCardsLoader__item-name']}>
                        <Skeleton />
                    </div>
                    <div className={classes['ItemCardsLoader__item-description']}>
                        <Skeleton count={3}/>
                    </div>
                    <div className={classes['ItemCardsLoader__item-mark']}>
                        <Skeleton width={100}/>
                        <br/>
                        <Skeleton width={150}/>
                    </div>
                    <div className={classes['ItemCardsLoader__item-price']}>
                        <Skeleton width={100} height={30}/>
                        <Skeleton width={50} height={50}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemCardsLoader;