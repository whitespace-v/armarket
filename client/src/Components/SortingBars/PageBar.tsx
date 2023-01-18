import React from 'react';
import classes from '../../styles/Components/SortingBars/PageBar.module.scss'
import UIButton from "../../UIKIT/UIButton";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setCurrentPage} from "../../store/ActionCreators/Setting";

const PageBar = () => {
    const dispatch = useAppDispatch()
    const {currentPage, pages} = useAppSelector(state => state.categoryReducer)
    const statePages = []

    for (let i = 0; i < pages; i++){
        statePages.push(i + 1)
    }

    return (
        <div className={classes['PageBar']}>
            {statePages.map(i => (
                <UIButton
                    key={i}
                    onClick={() => {dispatch(setCurrentPage(i))}}
                    type={i === currentPage ? 'link-active' : 'link'}
                >
                    {i}
                </UIButton>
            ))}
        </div>
    );
};

export default PageBar;