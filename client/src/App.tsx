import React, {useEffect} from 'react';
import Shop from "./Pages/Shop/Shop";
import {useAppDispatch} from "./hooks/redux";
import {check} from "./store/ActionCreators/userAPI";
import {fetchUSD} from "./store/ActionCreators/Fetching";

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(check())
        dispatch(fetchUSD())
    }, [])

    return <Shop/>
};

export default App;