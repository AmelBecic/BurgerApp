import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navigationitem.module.css';


const Navigationitem = (props) => {


    return (

    <li className={classes.Navigationitem}><NavLink to={props.link} activeClassName={classes.active} exact>{props.children}</NavLink> </li>


    );



}

export default Navigationitem;