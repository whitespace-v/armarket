import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import Layout from "../../UIKIT/Layout";
import classes from '../../styles/Item/Item.module.scss'
import classesItemCards from '../../styles/Components/ItemCards.module.scss'
import {fetchItem} from "../../store/ActionCreators/Fetching";
import NavBar from "../../Components/NavBar";
import SearchBar from "../../Components/SearchBar";
import {isItemInCart} from "../../hof/isItemInCart";
import {addToCart, cartItemCountControl} from "../../store/ActionCreators/Setting";
import {FaCheck, FaMinus, FaPlus, FaStar, FaTimes} from "react-icons/fa";
import {RiShoppingCartLine} from "react-icons/ri";
import UIButton from "../../UIKIT/UIButton";
import UIInput from "../../UIKIT/UIInput";
import {addSize, commentCreate, deleteItem} from "../../store/ActionCreators/Creating";
import {IItemSize} from "../../models/DataBaseItems";
import {check} from "../../store/ActionCreators/userAPI";
import Footer from "../../Components/Footer";

const Item = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const [comment,setComment] = useState<string>('')
    const [mark,setMark] = useState<number>(3)
    const [commentCreation, setCommentCreation] = useState<boolean>(false)

    const [stateImage, setStateImage] = useState<string>('')
    const {user,currentItem, cartItems} = useAppSelector(state => state.categoryReducer)
    const navigate = useNavigate()

    const [sizeCreation, setSizeCreation] = useState<boolean>(false)
    const [size, setSize] = useState<string>('')

    useEffect(() => {
        dispatch(check())
    }, [])

    useEffect(() => {
        dispatch(fetchItem(id))
    },[])

    useEffect(() => {
        setStateImage(currentItem.image)
    }, [currentItem])

    const commentCreationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        dispatch(commentCreate(currentItem, comment, mark))
        setComment('')
        dispatch(fetchItem(id))
    }

    const deleteItemHandler = () => {
        dispatch(deleteItem(currentItem.id))
        navigate('/')
    }
    return (
        <>
            <Layout>
                <NavBar/>
                <SearchBar/>
                <div className={classes['Item']}>
                    <div className={classes['Item__name']}>
                        {currentItem.name}
                        <div style={{display: 'flex', marginTop: 15, gap: 15}}>
                            {user === 'Admin' &&
                                <UIButton type={"primary-small"} onClick={() => deleteItemHandler()}>Удалить товар</UIButton>
                            }
                            {sizeCreation ?
                                <div className={classes['Item__name-sizeCreation']} style={{display: 'flex', gap: 15}}>
                                    <UIInput type={"primary"} placeholder={'Размер'} onChange={e => setSize(e.currentTarget.value)} value={size}/>
                                    <UIButton type={"icon"} onClick={() => {
                                        dispatch(addSize(currentItem.id.toString(), size))
                                        dispatch(fetchItem(id))
                                    }}><FaCheck/></UIButton>
                                    <UIButton type={"icon"} onClick={() => setSizeCreation(false)}><FaTimes/></UIButton>
                                </div>
                                :
                                <>
                                    {
                                        user === 'Admin' &&
                                        <UIButton type={"primary-small"} onClick={() => setSizeCreation(true)}>Добавить размер</UIButton>
                                    }
                                </>
                            }
                        </div>
                    </div>
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
                                    Размеры:
                                    {currentItem.sizes.map(i =>
                                        <div className={classes['Item__card-info-sizes-item']}>
                                            <b>{i.size}</b>
                                        </div>
                                    )}
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
                                        {currentItem.price.toLocaleString('ru')} ₽
                                    </div>
                                }
                                <div>
                                    {isItemInCart(currentItem, cartItems) ?
                                        <div className={classesItemCards['ItemCards__item-buttons-interactions']}>
                                            <div className={classesItemCards['ItemCards__item-buttons-interactions-count']} onClick={e => {
                                                e.stopPropagation();
                                                dispatch(addToCart(currentItem))
                                            }}>
                                                <div className={classesItemCards['ItemCards__item-buttons-interactions-count-handler']}
                                                     onClick={e => {
                                                         e.stopPropagation();
                                                         dispatch(cartItemCountControl(currentItem, -1))
                                                     }}
                                                >
                                                    <FaMinus/>
                                                </div>
                                                <div className={classesItemCards['ItemCards__item-buttons-interactions-count-number']}>
                                                    {cartItems[cartItems.findIndex(x => x.item.id === currentItem.id)].count}
                                                </div>
                                                <div className={classesItemCards['ItemCards__item-buttons-interactions-count-handler']}
                                                     onClick={e => {
                                                         e.stopPropagation();
                                                         dispatch(cartItemCountControl(currentItem, 1))
                                                     }}
                                                >
                                                    <FaPlus/>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className={classesItemCards['ItemCards__item-buttons-interactions']}>
                                            <div className={classesItemCards['ItemCards__item-buttons-interactions-add']} onClick={e => {
                                                e.stopPropagation();
                                                dispatch(addToCart(currentItem))
                                            }}>
                                                <RiShoppingCartLine/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
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

                        </div>
                    </div>
                </div>

            </Layout>
            <Footer/>
        </>
    );
};

export default Item;