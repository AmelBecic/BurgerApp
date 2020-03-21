import React from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';


const OrderSummary = (props) => {

    const ingredientsList = Object.keys(props.ingredients)
                                .map(igKey => {
                                    return ( <li key={igKey}>
                                        {igKey} : {props.ingredients[igKey]}
                                    </li>)
                                })




    return (
        <Auxi>
            <h3>Your order is:</h3>
            <p>A delicius burger with these ingredients:</p>
            <ul>

            {ingredientsList}

            </ul>

            <p>Total price is : {props.price.toFixed(2)} $</p>

            <p>Do you want to checkout?</p>

            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>

            

        </Auxi>
    )




}

export default OrderSummary;