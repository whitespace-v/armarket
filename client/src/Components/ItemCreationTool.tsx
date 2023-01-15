import React, {useState} from 'react';
import {FaCheck, FaPlus, FaTimes} from "react-icons/fa";
import UIButton from "../UIKIT/UIButton";
import classes from '../styles/Components/ItemCreationTool.module.scss'
import UIInput from "../UIKIT/UIInput";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import imageCompression from 'browser-image-compression';
import {createItem} from "../store/ActionCreators/Creating";
import {fetchItems} from "../store/ActionCreators/Fetching";

const ItemCreationTool = () => {
    const dispatch = useAppDispatch()
    const {currentAvailability, currentSubcategory, currentCategory, currentBrand, currentSort, currentPage, limit, query} = useAppSelector(state => state.categoryReducer)
    const [creationMode, setCreationMode] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [images, setImages] = useState<FileList | null>(null)

    const createHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (name && description && price && images && !!currentCategory.name
            && !!currentSubcategory.name && !!currentBrand.name && !!currentAvailability.name){
            let compressedImages = []
            for (let i = 0; i < images.length; i++){
                let c = await imageCompression(images[i],
                    {maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true}
                )
                compressedImages.push(c)
            }
            dispatch(createItem(name, description, price, compressedImages, currentAvailability, currentBrand, currentCategory, currentSubcategory))
            dispatch(fetchItems(currentCategory, currentSubcategory, currentAvailability, currentBrand, currentSort, currentPage, limit, query))
            setCreationMode(false)
            setName('')
            setDescription('')
            setPrice('')
            setImages(null)
        } else {
            alert('Заполните все поля и выберите категории !')
        }
    }

    return (
        <div className={classes['ItemCreationTool']}>
            {creationMode ?
                <div className={classes['ItemCreationTool-creation']}>
                    <input type="file" minLength={2} multiple onChange={e => setImages(e.target.files)}/>
                    <UIInput value={name} onChange={e => setName(e.currentTarget.value)} type={"primary"} placeholder={'Название...'}/>
                    <UIInput value={description} onChange={e => setDescription(e.currentTarget.value)} type={"primary"} placeholder={'Описание...'}/>
                    <UIInput value={price} onChange={e => setPrice(e.currentTarget.value)} type={"primary"} placeholder={'Цена...'}/>

                    <div className={classes['ItemCreationTool-creation-buttons']}>
                        <UIButton type={'icon'} onClick={e => createHandler(e)}><FaCheck/></UIButton>
                        <UIButton type={'icon'} onClick={() => setCreationMode(false)}><FaTimes/></UIButton>
                    </div>

                </div>
                :
                <UIButton type={'icon'} onClick={() => setCreationMode(true)}>Добавить товар &nbsp; <FaPlus/></UIButton>
            }

        </div>
    );
};

export default ItemCreationTool;