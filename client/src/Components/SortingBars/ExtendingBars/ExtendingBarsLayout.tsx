import React, {useRef, useState} from 'react';
import classes from '../../../styles/Components/SortingBars/ExtendingBarsLayout.module.scss'
import AvailabilityBar from "./AvailabilityBar";
import BrandBar from "./BrandBar";
import ClearFiltersBar from "../../ClearFiltersBar";
import useWindowSize from "../../../hof/useWindowSize";
import SortingBar from "../SortingBar";
import UIButton from "../../../UIKIT/UIButton";
import {FaSlidersH} from "react-icons/fa";
import useOnClickOutside from "../../../hof/useOnClickOutside";

const ExtendingBarsLayout = () => {
    const {width} = useWindowSize()
    const ref = useRef(null)
    const [active, setActive] = useState<boolean>(false)
    useOnClickOutside(ref, () => setActive(false))

    return (
        <div className={classes['ExtendingBarsLayout']}>
            <SortingBar/>
            {width > 1250 ?
                <>
                    <AvailabilityBar/>
                    <BrandBar/>
                    <ClearFiltersBar/>
                </>
                :
                <UIButton type={"primary-small"} onClick={() => setActive(!active)}><FaSlidersH/> &nbsp; Фильтры</UIButton>
            }
            {active &&
            <div className={classes['ExtendingBarsLayout-filters']}>
                <div className={classes['ExtendingBarsLayout-filters-items']} ref={ref}>
                    <AvailabilityBar/>
                    <BrandBar/>
                    <ClearFiltersBar/>
                </div>
            </div>
            }
        </div>
    );
};

export default ExtendingBarsLayout;