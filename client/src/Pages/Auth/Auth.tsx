import React, {useEffect, useState} from 'react';
import classes from '../../styles/Auth/Auth.module.scss'
import Layout from "../../UIKIT/Layout";
import UIInput from "../../UIKIT/UIInput";
import UIButton from "../../UIKIT/UIButton";
import {useNavigate} from "react-router-dom";
import {signIn} from "../../store/ActionCreators/userAPI";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import Loader from "../../UIKIT/Loaders/Loader";

const Auth = () => {
    const dispatch = useAppDispatch()
    const {loginError, isAuth, authLoading} = useAppSelector(state => state.categoryReducer)
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        dispatch(signIn(login, password))
    }
    useEffect(() => {
        if (isAuth){
            navigate('/')
        }
    }, [isAuth])


    useEffect(() => {
        loginError && alert('Такого пользователя не существует!')
    }, [loginError])

    return (
        <>
            <Layout>
                <div className={classes['Auth']}>
                    <div className={classes['Auth__container']}>
                        <div className={classes['Auth__container-name']}>Авторизация</div>
                        <UIInput type={"primary"} placeholder={'Логин'} value={login} onChange={e => setLogin(e.currentTarget.value)}/>
                        <UIInput type={"primary"} placeholder={'Пароль'} value={password} onChange={e => setPassword(e.currentTarget.value)}/>
                        <div className={classes['Auth__container-buttons']}>
                            <UIButton type={'primary-small'} onClick={e => clickHandler(e)}>Вход</UIButton>
                            <UIButton type={'link'} onClick={() => navigate('/signup')}>Нет аккаунта?</UIButton>
                        </div>
                    </div>
                </div>
            </Layout>
            {authLoading && <Loader/>}
        </>

    );
};

export default Auth;