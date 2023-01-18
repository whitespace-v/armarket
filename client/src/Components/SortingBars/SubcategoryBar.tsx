import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import classes from '../../styles/Components/SortingBars/SubcategoryBar.module.scss'
import {createSubcategory} from "../../store/ActionCreators/Creating";
import UIButton from "../../UIKIT/UIButton";
import UIInput from "../../UIKIT/UIInput";
import {FaCheck, FaPlus, FaTimes} from "react-icons/fa";
import {fetchCategories} from "../../store/ActionCreators/Fetching";
import {setCurrentSubcategory} from "../../store/ActionCreators/Setting";

const SubcategoryBar = () => {
    const {subcategories, currentSubcategory, currentCategory, user} = useAppSelector(state => state.categoryReducer)
    const dispatch = useAppDispatch()

    const [subcategoryCreation, setSubcategoryCreation] = useState<boolean>(false)
    const [subcategoryCreationName, setSubcategoryCreationName] = useState<string>('')

    const subcategoryCreationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (!subcategoryCreationName){
            alert('Заполните все поля !')
        }
        if (!(!!currentCategory.name)){
            alert('Выберите категорию !')
        }
        if (subcategoryCreationName && !!currentCategory.name) {
            dispatch(createSubcategory(subcategoryCreationName, currentCategory)).then(() => dispatch(fetchCategories()))
            setSubcategoryCreation(false)
            setSubcategoryCreationName('')
        }
    }

    return (
        <div className={classes['SubcategoryBar']}>
            <div className={classes['SubcategoryBar__items']}>
                {subcategories.map(i => (
                    <UIButton
                        type={i === currentSubcategory ? 'link-active' : 'link'}
                        onClick={() => dispatch(setCurrentSubcategory(i))}
                        key={i.id}
                    >{i.name}</UIButton>
                ))
                }
                {subcategoryCreation ?
                    <>
                        {user === 'Admin' && <>
                            <UIInput
                                value={subcategoryCreationName}
                                type={'primary'}
                                placeholder={'Подкатегория...'}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setSubcategoryCreationName(e.currentTarget.value)}
                            />
                            <>
                                <UIButton type={'icon'} onClick={e => subcategoryCreationHandler(e)}><FaCheck/></UIButton>
                                <UIButton type={'icon'} onClick={() => {
                                    setSubcategoryCreation(false);
                                    setSubcategoryCreationName('')
                                }}><FaTimes/></UIButton>
                            </>
                        </>
                        }
                    </>
                    :
                    <>
                        {user === 'Admin' && <UIButton type={'icon'} onClick={() => setSubcategoryCreation(true)}><FaPlus/></UIButton> }
                    </>
                }
            </div>
        </div>
    );
};

export default SubcategoryBar;
