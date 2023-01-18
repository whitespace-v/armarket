import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useParams} from "react-router-dom";
import Layout from "../../UIKIT/Layout";
import classes from '../../styles/Item/Item.module.scss'
import classesItemCards from '../../styles/Components/ItemCards.module.scss'
import {fetchItem} from "../../store/ActionCreators/Fetching";
import NavBar from "../../Components/NavBar";
import SearchBar from "../../Components/SearchBar";
import {isItemInCart} from "../../hof/isItemInCart";
import {addToCart, cartItemCountControl} from "../../store/ActionCreators/Setting";
import {FaStar} from "react-icons/fa";
import {check} from "../../store/ActionCreators/userAPI";
import Footer from "../../Components/Footer";
import Accordion from "../../Components/Accordion";
import ItemReviews from "./ItemReviews";
import ItemSetReview from "./ItemSetReview";
import ItemName from "./ItemName";

const Item = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const [stateImage, setStateImage] = useState<string>('')
    const {user, currentItem, usd, selectedSize} = useAppSelector(state => state.categoryReducer)

    useEffect(() => {
        dispatch(check())
        dispatch(fetchItem(id))
    },[])

    useEffect(() => {
        setStateImage(currentItem.image)
    }, [currentItem])

    const addToCartHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (currentItem.sizes.length > 0 && selectedSize) {
        //   open size
        } else {
            dispatch(addToCart(currentItem))
        }

    }

    return (
        <>
            <Layout>
                <NavBar/>
                <SearchBar/>
                <div className={classes['Item']}>
                    <ItemName id={id} currentItem={currentItem} user={user}/>
                    <div className={classes['Item__card']}>
                        <div className={classes['Item__card-images']}>
                            <div className={classes['Item__card-images-extended']}>
                                {currentItem.images.map(i => (
                                    <div className={classes['Item__card-images-extended-item']}
                                         key={i.img}
                                         style={{backgroundImage: `url("${process.env.REACT_APP_API_URL}${i.img}")`}}
                                         onMouseEnter={() => setStateImage(i.img)}
                                    />
                                ))}
                            </div>
                            <div className={classes['Item__card-images-main']}
                                 style={{backgroundImage: `url("${process.env.REACT_APP_API_URL}${stateImage}")`}}
                            />
                        </div>
                        <div className={classes['Item__card-info']}>
                            <div className={classes['Item__card-info-description']}>
                                {currentItem.description}
                            </div>
                            <div className={classes['Item__card-info-vendor']}>
                                Артикул: {currentItem.vendor}
                            </div>
                            {
                                currentItem.mark > 0 ?
                                    <div className={classesItemCards['ItemCards__item-mark']}>
                                        <div className={classesItemCards['ItemCards__item-mark-stars']}>
                                            {Array.from(Array(currentItem.mark).keys()).map((_, index) => (
                                                <div className={classesItemCards['ItemCards__item-mark-stars-full']} key={index}>
                                                    <FaStar/>
                                                </div>
                                            ))}
                                            {Array.from(Array(5-currentItem.mark).keys()).map((_, index) => (
                                                <div className={classesItemCards['ItemCards__item-mark-stars-empty']} key={index}>
                                                    <FaStar/>
                                                </div>
                                            ))}
                                            <div className={classesItemCards['ItemCards__item-mark-stars-mark']}>
                                                {currentItem.marksCount}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={classesItemCards['ItemCards__item-mark']}>
                                        <div className={classesItemCards['ItemCards__item-mark-stars']}>
                                            <div className={classesItemCards['ItemCards__item-mark-stars-empty']}>
                                                <FaStar/>
                                            </div>
                                            <div className={classesItemCards['ItemCards__item-mark-stars-mark']}>
                                                нет отзывов
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div className={classes['Item__card-info-availability']}>
                                Наличие: <b>{currentItem.availability}</b>
                            </div>
                            {currentItem.sizes.length > 0 &&
                                <div className={classes['Item__card-info-sizes']}>
                                    <Accordion
                                        children={currentItem.sizes}
                                        placeholder={'Выберите размер'}
                                        child={'size'}
                                    />
                                </div>
                            }
                            <div className={classes['Item__card-info-price-container']}>
                                {currentItem.oldPrice > 0 ?
                                    <div className={classesItemCards['ItemCards__item-buttons-sale']}>
                                        <div className={classesItemCards['ItemCards__item-buttons-sale-current']}>{currentItem.price.toLocaleString('ru')} ₽</div>
                                        <div className={classesItemCards['ItemCards__item-buttons-sale-old']}>{currentItem.oldPrice}</div>
                                    </div>
                                    :
                                    <div className={classesItemCards['ItemCards__item-buttons-price']}>
                                        {(currentItem.price * usd).toLocaleString('ru')} ₽
                                    </div>
                                }
                                <div>
                                    <div className={classesItemCards['ItemCards__item-buttons-interactions']}>
                                        <div className={classesItemCards['ItemCards__item-buttons-interactions-add']} onClick={e => addToCartHandler(e)}>
                                            Добавить в корзину
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ItemSetReview currentItem={currentItem}/>
                            <ItemReviews currentItem={currentItem}/>
                        </div>
                    </div>
                </div>
            </Layout>
            <Footer/>
        </>
    );
};

export default Item;