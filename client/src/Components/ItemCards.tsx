import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import classes from '../styles/Components/ItemCards.module.scss'
import {FaMinus, FaPlus, FaStar} from "react-icons/fa";
import {RiShoppingCartLine} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import {addToCart, cartItemCountControl} from "../store/ActionCreators/Setting";
import {isItemInCart} from "../hof/isItemInCart";
import useWindowSize from "../hof/useWindowSize";

const ItemCards = () => {
    const navigate = useNavigate()
    const {items, cartItems, usd} = useAppSelector(state => state.categoryReducer)
    const {width} = useWindowSize()
    return (
        <div className={classes['ItemCards']}>
            {items.rows.map(i => (
                <div key={i.id} className={classes['ItemCards__item']} onClick={() => navigate(`item/${i.id}`)}>
                    <div className={classes['ItemCards__item-vendor']}
                    >
                        {i.vendor}

                    </div>
                    {width > 600 ?
                        <>
                            <div className={classes['ItemCards__item-image']}
                                 style={{backgroundImage: `url("${process.env.REACT_APP_API_URL}${i.image}")`}}
                            />
                            <div className={classes['ItemCards__item-name']}>
                                {i.name}
                            </div>
                            <div className={classes['ItemCards__item-description']}>
                                {i.description.length > 70 ? `${i.description.substring(0, 70)}...` : i.description}
                            </div>
                        </>
                        :
                        <div className={classes['ItemCards__item-flex']}>
                            <div className={classes['ItemCards__item-image']}
                                 style={{backgroundImage: `url("${process.env.REACT_APP_API_URL}${i.image}")`}}
                            />
                            <div>
                                <div className={classes['ItemCards__item-name']}>
                                    {i.name}
                                </div>
                                <div className={classes['ItemCards__item-description']}>
                                    {i.description.length > 70 ? `${i.description.substring(0, 70)}...` : i.description}
                                </div>
                            </div>
                        </div>

                    }

                    {
                        i.mark > 0 ?
                            <div className={classes['ItemCards__item-mark']}>
                                <div className={classes['ItemCards__item-mark-stars']}>
                                    {Array.from(Array(i.mark).keys()).map((_, index) => (
                                        <div className={classes['ItemCards__item-mark-stars-full']} key={index}>
                                            <FaStar/>
                                        </div>
                                    ))}
                                    {Array.from(Array(5-i.mark).keys()).map((_, index) => (
                                        <div className={classes['ItemCards__item-mark-stars-empty']} key={index}>
                                            <FaStar/>
                                        </div>
                                    ))}
                                    <div className={classes['ItemCards__item-mark-stars-mark']}>
                                        {i.marksCount}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={classes['ItemCards__item-mark']}>
                                <div className={classes['ItemCards__item-mark-stars']}>
                                    <div className={classes['ItemCards__item-mark-stars-empty']}>
                                        <FaStar/>
                                    </div>
                                    <div className={classes['ItemCards__item-mark-stars-mark']}>
                                        нет отзывов
                                    </div>
                                </div>
                            </div>
                    }
                    <div className={classes['ItemCards__item-availability']}>
                        <b>Наличие: </b><span>{i.availability}</span>
                    </div>
                    <div className={classes['ItemCards__item-buttons']} style={width < 650 && isItemInCart(i, cartItems) ? {flexDirection: 'column'} : {}}>
                        {i.oldPrice > 0 ?
                            <div className={classes['ItemCards__item-buttons-sale']}>
                                <div className={classes['ItemCards__item-buttons-sale-current']}>{i.price} ₽</div>
                                <div className={classes['ItemCards__item-buttons-sale-old']}>{i.oldPrice}</div>
                            </div>
                            :
                            <div className={classes['ItemCards__item-buttons-price']}>
                                {(i.price * usd).toLocaleString('ru')} ₽
                            </div>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemCards;