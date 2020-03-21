import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../NavigationItems/Navigationitems';
import Drawertoggler from '../Sidedrawer/Drawertoggler/Drawertoggler';

const Toolbar = (props) => (

    <header className={classes.Toolbar}>
        <Drawertoggler clicked={props.showed}/>
        <Logo />
        <ul>

            <Navigationitems/>

        </ul>



    </header>


);

export default Toolbar;