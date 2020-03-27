import React from 'react';
import classes from './Order.module.css';


const Order = (props) => {

    const ingredients = props.ingredients.map(ingredient => {
        return (<p>{ingredient}</p>);
    });

    return (
        <div className={classes.Order}>
            <p>{ingredients}</p>
            <p>{props.price}</p>
        </div>
    );


}

export default Order;