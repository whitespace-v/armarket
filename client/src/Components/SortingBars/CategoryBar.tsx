import React, {useEffect, useState} from 'react';
import UIButton from "../../UIKIT/UIButton";
import {FaCheck, FaPlus, FaTimes} from "react-icons/fa";
import classes from '../../styles/Components/SortingBars/CategoryBar.module.scss'
import UIInput from "../../UIKIT/UIInput";
import {createCategory} from "../../store/ActionCreators/Creating";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchCategories} from "../../store/ActionCreators/Fetching";
import {setCurrentCategory} from "../../store/ActionCreators/Setting";

const CategoryBar = () => {
    const {categories, currentCategory, user} = useAppSelector(state => state.categoryReducer)
    const dispatch = useAppDispatch()

    const [categoryCreation, setCategoryCreation] = useState<boolean>(false)
    const [categoryCreationName, setCategoryCreationName] = useState<string>('')

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const categoryCreationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (categoryCreationName) {
            dispatch(createCategory(categoryCreationName)).then(() => dispatch(fetchCategories()))
            setCategoryCreation(false)
            setCategoryCreationName('')
        } else{
            alert('Заполните все поля !')
        }
    }

    return (
        <div className={classes['CategoryBar']}>
            <div className={classes['CategoryBar__items']}>

                { categories && categories.map(i => (
                    <UIButton
                        type={i === currentCategory ? 'primary-small-active' : 'primary-small'}
                        onClick={() => dispatch(setCurrentCategory(i))}
                        key={i.id}
                    >{i.name}</UIButton>
                ))}

                {categoryCreation ?
                    <>
                        {user === 'Admin' &&
                            <>
                                <UIInput
                                    value={categoryCreationName}
                                    type={'primary'}
                                    placeholder={'Категория...'}
                                    onChange={(e: React.FormEvent<HTMLInputElement>) => setCategoryCreationName(e.currentTarget.value)}
                                />
                                <>
                                    <UIButton type={'icon'} onClick={e => categoryCreationHandler(e)}><FaCheck/></UIButton>
                                    <UIButton type={'icon'} onClick={() => {
                                        setCategoryCreation(false);
                                        setCategoryCreationName('')
                                    }}><FaTimes/></UIButton>
                                </>
                            </>
                        }
                    </>
                    :
                    <>
                        {user === 'Admin' && <UIButton type={'icon'} onClick={() => setCategoryCreation(true)}><FaPlus/></UIButton>}
                    </>
                }
            </div>
        </div>
    );
};

export default CategoryBar;