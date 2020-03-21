import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {Label: 'Salad' , type: 'salad'} , 
    {Label: 'Bacon' , type: 'bacon'} ,
    {Label: 'Meat' , type: 'meat'} ,
    {Label: 'Cheese' , type: 'cheese'} 
]

const BuildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <p>Current price is <strong>{props.price.toFixed(2)}</strong> $</p>
            {controls.map(controls => (
            <BuildControl disabled={props.disabled[controls.type]} removed={() => props.remove(controls.type)} added={() => props.ingredientUpdate(controls.type)} Label={controls.Label} key={controls.Label} />)
        )} 
                
        <button onClick={props.ordered} className={classes.OrderButton} disabled={!props.orderDisable}>ORDER NOW</button>    
        </div>
    );



}

export default BuildControls;