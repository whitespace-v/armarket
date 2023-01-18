import React, {useEffect, useState} from 'react';
import classes from '../../../styles/Components/SortingBars/ExtendingBar.module.scss'
import UIButton from "../../../UIKIT/UIButton";
import UIInput from "../../../UIKIT/UIInput";
import {FaCheck, FaPlus, FaTimes} from "react-icons/fa";
import {createBrand} from "../../../store/ActionCreators/Creating";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchBrands} from "../../../store/ActionCreators/Fetching";
import {setCurrentBrand} from "../../../store/ActionCreators/Setting";

const BrandBar = () => {
    const dispatch = useAppDispatch()
    const {brands, currentBrand,user} = useAppSelector(state => state.categoryReducer)
    const [contentActive, setContentActive] = useState<boolean>(false)
    const [brandCreation, setBrandCreation] = useState<boolean>(false)
    const [brandCreationName, setBrandCreationName] = useState<string>('')

    const brandCreationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (brandCreationName){
            dispatch(createBrand(brandCreationName)).then(() => dispatch(fetchBrands()))
            setBrandCreation(false)
            setBrandCreationName('')
        } else{
            alert('Заполните все поля !')
        }
    }

    useEffect(() => {
        dispatch(fetchBrands())
    }, [])

    return (
        <div className={classes['BrandBar']}>
            <div className={classes['ExtendingBar__bar']}>
                {currentBrand.name ?
                    <UIButton type={"primary-small"} onClick={() => setContentActive(!contentActive)}>Производитель: <span>&nbsp; {currentBrand.name}</span> </UIButton>
                    :
                    <UIButton type={"primary-small"} onClick={() => setContentActive(!contentActive)}>Производитель</UIButton>
                }
            </div>
            {contentActive &&
                <div className={classes['ExtendingBar__content']}>
                    {brands.map(i => (
                        <UIButton key={i.id}
                                  type={currentBrand === i ? 'link-active' : 'link'}
                                  onClick={() => {
                                      dispatch(setCurrentBrand(i))
                                      setContentActive(!contentActive)
                                  }}

                        >{i.name}</UIButton>
                    ))}

                    {brandCreation ?
                        <>
                            {user === 'Admin' &&
                                <div className={classes['ExtendingBar__content-creation']}>
                                    <UIInput
                                        value={brandCreationName}
                                        type={'primary'}
                                        placeholder={'Производитель...'}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setBrandCreationName(e.currentTarget.value)}
                                    />
                                    <UIButton type={'icon'} onClick={e => brandCreationHandler(e)}><FaCheck/></UIButton>
                                    <UIButton type={'icon'}
                                              onClick={() => {
                                                  setBrandCreation(false);
                                                  setBrandCreationName('')}}
                                    ><FaTimes/></UIButton>
                                </div>}
                        </>
                        :
                        <>
                            {user === 'Admin' && <UIButton type={'icon'} onClick={() => setBrandCreation(true)}><FaPlus/></UIButton>}
                        </>
                    }
                </div>
            }

        </div>

    );
};

export default BrandBar;