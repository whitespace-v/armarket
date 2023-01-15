import React from 'react';
import classes from '../styles/Contacts.module.scss'
import Layout from "../UIKIT/Layout";
import NavBar from "../Components/NavBar";
import logo from '../assets/logo.png'

const Contacts = () => {
    return (
        <Layout>
            <NavBar/>
            <div className={classes['Contacts']}>
                <div className={classes['Contacts__column']}>
                    <img src={logo} alt=""/>
                </div>
                <div className={classes['Contacts__column']}>
                    <b>Реквизиты</b> <br/><br/>
                    <div className={classes['Contacts__column-credentials']}>
                        <br/><span>Наименование:</span> <p>ИП Борисенко Никита Андреевич</p>
                        <br/><span>ОГРНИП:</span> <p>322253600082896</p>
                        <br/><span>ИНН:</span> <p>254007082871</p>
                        <br/><span>Вид предпринимательства:</span> <p>Индивидуальный предприниматель</p>
                        <br/><span>Дата регистрации:</span> <p>21 ноября 2022 г.</p>
                        <br/><span>Адрес:</span> <p>г. Владивосток, ул. Станюковича д. 10, кв. 62</p>
                    </div>
                </div>
            </div>
        </Layout>


    );
};

export default Contacts;