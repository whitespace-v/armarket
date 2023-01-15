import React from 'react';
import Layout from "../UIKIT/Layout";
import classes from '../styles/About.module.scss'
import NavBar from "../Components/NavBar";

const About = () => {
    return (
        <Layout>
            <NavBar/>
            <div className={classes['About']}>
                Компания АРМ ТАКТИКА существует с 5 ноября 2022г. , но уже за такой короткий срок зарекомендовала себя поставками одежды и обуви<br/>
                высочайшего качества, на равне с мировыми Европейскими брендами. <br/>
                Наши фабрики находятся в Турции. г. Стамбул.  <br/>
                Отправки осуществляются в любую точку мира.
            </div>
        </Layout>
    );
};

export default About;