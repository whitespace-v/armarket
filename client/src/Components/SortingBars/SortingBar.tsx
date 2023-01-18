import React, {useState} from 'react';
import classes from '../../styles/Components/SortingBars/ExtendingBar.module.scss'
import UIButton from "../../UIKIT/UIButton";
import {setCurrentSorting} from "../../store/ActionCreators/Setting";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const SortingBar = () => {
    const dispatch = useAppDispatch()
    const [contentActive, setContentActive] = useState<boolean>(false)
    const {currentSort, sorting} = useAppSelector(state => state.categoryReducer)

    return (
        <div className={classes['SortingBar']}>
            <div className={classes['ExtendingBar__bar']}>
                {currentSort.name ?
                    <UIButton type={"primary-small"} onClick={() => setContentActive(!contentActive)}>Сортировка: <span>&nbsp; {currentSort.rus}</span> </UIButton>
                    :
                    <UIButton type={"primary-small"} onClick={() => setContentActive(!contentActive)}>Сортировка</UIButton>
                }
            </div>
            {contentActive &&
                <div className={classes['ExtendingBar__content']}>
                    {sorting.map(i => (
                        <UIButton key={i.name}
                                  type={currentSort === i ? 'link-active' : 'link'}
                                  onClick={() => {
                                      dispatch(setCurrentSorting(i))
                                      setContentActive(!contentActive)
                                  }}

                        >{i.rus}</UIButton>
                    ))}
                </div>
            }
        </div>
    );
};

export default SortingBar;