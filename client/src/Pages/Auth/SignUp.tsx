import React, {useState} from 'react';
import classes from '../../styles/Auth/Auth.module.scss'
import Layout from "../../UIKIT/Layout";
import UIInput from "../../UIKIT/UIInput";
import UIButton from "../../UIKIT/UIButton";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {signUp} from "../../store/ActionCreators/userAPI";

const SignUp = () => {
    const dispatch = useAppDispatch()
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        dispatch(signUp(login, password)).then(() => navigate('/'))
    }

    return (
        <Layout>
            <div className={classes['Auth']}>
                <div className={classes['Auth__container']}>
                    <div className={classes['Auth__container-name']}>Регистрация</div>
                    <UIInput type={"primary"} placeholder={'Логин'} value={login} onChange={e => setLogin(e.currentTarget.value)}/>
                    <UIInput type={"primary"} placeholder={'Пароль'} value={password} onChange={e => setPassword(e.currentTarget.value)}/>
                    <div className={classes['Auth__container-buttons']}>
                        <UIButton type={'primary-small'} onClick={e => clickHandler(e)}>Создать</UIButton>
                        <UIButton type={'link'} onClick={() => navigate('/auth')}>Есть аккаунт?</UIButton>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default SignUp;