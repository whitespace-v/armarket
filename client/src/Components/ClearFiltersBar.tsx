import React from 'react';
import {clearFilters} from "../store/ActionCreators/Setting";
import UIButton from "../UIKIT/UIButton";
import {useAppDispatch} from "../hooks/redux";

const ClearFiltersBar = () => {
    const dispatch = useAppDispatch()
    return (
        <UIButton type={"link"} onClick={() => dispatch(clearFilters())}>
            Сбросить фильтры
        </UIButton>
    );
};

export default ClearFiltersBar;