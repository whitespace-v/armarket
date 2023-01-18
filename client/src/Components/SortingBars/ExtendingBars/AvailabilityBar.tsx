import React, {useEffect, useState} from 'react';
import classes from '../../../styles/Components/SortingBars/ExtendingBar.module.scss'
import UIButton from "../../../UIKIT/UIButton";
import UIInput from "../../../UIKIT/UIInput";
import {FaCheck, FaPlus, FaTimes} from "react-icons/fa";
import {createAvailability} from "../../../store/ActionCreators/Creating";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchAvailabilities} from "../../../store/ActionCreators/Fetching";
import {setCurrentAvailability} from "../../../store/ActionCreators/Setting";

const AvailabilityBar = () => {
    const dispatch = useAppDispatch()
    const {availabilities, currentAvailability,user} = useAppSelector(state => state.categoryReducer)
    const [contentActive, setContentActive] = useState<boolean>(false)
    const [availabilityCreation, setAvailabilityCreation] = useState<boolean>(false)
    const [availabilityCreationName, setAvailabilityCreationName] = useState<string>('')

    const availableCreationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (availabilityCreationName) {
            dispatch(createAvailability(availabilityCreationName)).then(() => dispatch(fetchAvailabilities()))
            setAvailabilityCreation(false)
            setAvailabilityCreationName('')
        } else{
            alert('Заполните все поля !')
        }
    }

    useEffect(() => {
        dispatch(fetchAvailabilities())
    }, [])

    return (
        <div className={classes['AvailabilityBar']}>
            <div className={classes['ExtendingBar__bar']}>
                {currentAvailability.name ?
                    <UIButton type={"primary-small"} onClick={() => setContentActive(!contentActive)}>Наличие: <span>&nbsp; {currentAvailability.name}</span> </UIButton>
                    :
                    <UIButton type={"primary-small"} onClick={() => setContentActive(!contentActive)}>Наличие</UIButton>
                }
            </div>
            {contentActive &&
                <div className={classes['ExtendingBar__content']}>
                    {availabilities.map(i => (
                        <UIButton
                            key={i.id}
                            type={currentAvailability === i ? 'link-active' : 'link'}
                            onClick={() => {
                                dispatch(setCurrentAvailability(i))
                                setContentActive(false)
                            }}
                        >{i.name}</UIButton>
                    ))}

                    {availabilityCreation ?
                        <>
                            {user === 'Admin' &&
                                <div className={classes['ExtendingBar__content-creation']}>
                                    <UIInput
                                        value={availabilityCreationName}
                                        type={'primary'}
                                        placeholder={'Наличие...'}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => setAvailabilityCreationName(e.currentTarget.value)}
                                    />
                                    <UIButton type={'icon'} onClick={e => availableCreationHandler(e)}><FaCheck/></UIButton>
                                    <UIButton type={'icon'} onClick={() => {
                                        setAvailabilityCreation(false);
                                        setAvailabilityCreationName('')}}
                                    ><FaTimes/></UIButton>
                                </div>
                            }
                        </>
                        :
                        <> {user ==='Admin' && <UIButton type={'icon'} onClick={() => setAvailabilityCreation(true)}><FaPlus/></UIButton>}</>
                    }
                </div>
            }

        </div>

    );
};

export default AvailabilityBar;