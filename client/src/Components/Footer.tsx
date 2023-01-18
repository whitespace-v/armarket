import React from 'react';
import classes from '../styles/Footer.module.scss'
import logo from '../assets/logo.png'
import UIButton from "../UIKIT/UIButton";
import Layout from "../UIKIT/Layout";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";

const Footer = () => {
    const navigate = useNavigate()
    const {user} = useAppSelector(state => state.categoryReducer)
    return (
        <div className={classes['Footer']}>
            <Layout>
                <div className={classes['Footer-container']}>
                    <div className={classes['Footer__column']}>
                        <img src={logo} alt=""/>
                    </div>
                    <div className={classes['Footer__column']}>
                        <UIButton type={"link"} onClick={() => navigate('/')}>Главная</UIButton>
                        <UIButton type={"link"} onClick={() => navigate('/about')}>О Нас</UIButton>
                        <UIButton type={"link"} onClick={() => navigate('/contacts')}>Контакты</UIButton>
                        {!user && <UIButton type={"link"} onClick={() => navigate('/auth')}>Авторизация</UIButton>}
                    </div>
                    <div className={classes['Footer__column']}>
                        {/*<UIButton type={"link"} onClick={() => {}}>Доставка</UIButton>*/}
                        <UIButton type={"link"} onClick={() => navigate('/privacy')}>Политика конфиденциальности</UIButton>
                        {/*<UIButton type={"link"} onClick={() => {}}>Возврат товара</UIButton>*/}
                    </div>
                    <div className={classes['Footer__column']}>
                        <div className={classes['Footer__column-phone']}>
                            <UIButton type={"link"} onClick={() => {}}>+7 (999) 999-92-96</UIButton>
                            <p>Россия</p>
                        </div>
                        <div className={classes['Footer__column-phone']}>
                            <UIButton type={"link"} onClick={() => {}}>@ar_militarym</UIButton>
                            <p>Telegram</p>
                        </div>
                    </div>
                </div>
                <div className={classes["Footer-row"]}>
                    ИП "Борисенко Никита Андреевич" ИНН: 254007082871 ОГРН: 322253600082896
                </div>
            </Layout>
        </div>
    );
};

export default Footer;