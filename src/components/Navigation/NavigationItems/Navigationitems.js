import React from 'react';
import Navigationitem from './Navigationitem/Navigationitem';
import classes from './Navigationitems.module.css';


const Navigationitems = (props) => {


    return (

        <ul className={classes.Navigationitems}>

            <Navigationitem link="/" active>BurgerBuilder</Navigationitem>
            <Navigationitem link="/">Checkout</Navigationitem>

        </ul>



    );



}

export default Navigationitems;