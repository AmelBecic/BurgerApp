import React from 'react';
import classes from './Order.module.css';


const Order = (props) => {

    let ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({amount: props.ingredients[ingredientName] , name: ingredientName})
    }

    const ingredientList = ingredients.map(ig => {
        return (<span style={{textTransform: 'Capitalize' 
                            , display: 'inline-block' ,
                             border: '1px solid black', 
                             margin: '0 8px',
                             padding: '8px'}}>{ig.name} {ig.amount} </span>);
    })


    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientList}</p>
            <p>{props.price.toFixed(2)}</p>
        </div>
    );


}

export default Order;