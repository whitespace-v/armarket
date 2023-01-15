import React, {useRef, useState} from 'react';
import UIButton from "../UIKIT/UIButton";
import {useNavigate} from "react-router-dom";
import classes from '../styles/Components/NavBar.module.scss'
import {useAppSelector} from "../hooks/redux";
import useWindowSize from "../hof/useWindowSize";
import {FaBars} from "react-icons/fa";
import useOnClickOutside from "../hof/useOnClickOutside";
import {Transition} from "react-transition-group";
import logo from '../assets/logo.png'

const NavBar = () => {
    const navigate = useNavigate()
    const {isAuth} = useAppSelector(state => state.categoryReducer)
    const {width} = useWindowSize()
    const ref = useRef(null)
    const [sideBarActive, setSideBarActive] = useState<boolean>(false)

    useOnClickOutside(ref,() => setSideBarActive(false))

    return (
        <div className={classes['NavBar']}>
            {width > 850 ?
                <div className={classes['NavBar-nav']}>
                    <UIButton type={"link"} onClick={() => navigate('/')}>Главная</UIButton>
                    <UIButton type={"link"} onClick={() => navigate('/about')}>О нас</UIButton>
                    <UIButton type={"link"} onClick={() => navigate('/contacts')}>Контакты</UIButton>
                    {!isAuth && <UIButton type={"link"} onClick={() => navigate('/auth')}>Авторизация</UIButton>}
                </div>
                :
                <div className={classes['NavBar-burger']}>
                    <Transition in={sideBarActive} timeout={500} mountOnEnter unmountOnExit>
                        { state =>
                            <div className={classes['NavBar-burger-sidebar'] + ' ' + classes[state]} ref={ref}>
                                <div className={classes['NavBar-burger-sidebar-items']}>
                                    <div className={classes['NavBar-burger-sidebar-items-logo']}>
                                        <img src={logo} alt=""/>
                                    </div>
                                    <UIButton type={"link"} onClick={() => navigate('/')}>Главная</UIButton>
                                    <UIButton type={"link"} onClick={() => navigate('/about')}>О нас</UIButton>
                                    <UIButton type={"link"} onClick={() => navigate('/contacts')}>Контакты</UIButton>
                                    {!isAuth && <UIButton type={"link"} onClick={() => navigate('/auth')}>Авторизация</UIButton>}
                                    {width < 520 &&
                                        <div className={classes['NavBar-burger-sidebar-items-message']}>
                                            <UIButton type={"primary-small"} onClick={() => navigate('/')}>Напишите нам</UIButton>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </Transition>

                    {!sideBarActive &&
                        <div className={classes['NavBar-burger-button']}>
                            <UIButton type={"primary-small"} onClick={() => setSideBarActive(true)}><FaBars/></UIButton>
                        </div>
                    }
                </div>
            }


            <div className={classes['NavBar-contact']}>
                <UIButton type={width > 520 ? 'link' : "primary-small"} onClick={() => window.open('tel:+79999999296','self')}>+7 (999) 999-92-96</UIButton>
                {width > 520 &&
                    <div className={classes['NavBar-contact-message']}>
                        <UIButton type={"primary-small"} onClick={() => window.open('mailto:orders@armtaktika.ru','self')}>Напишите нам</UIButton>
                    </div>
                }
            </div>
        </div>
    );
};

export default NavBar;