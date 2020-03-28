import React from 'react';
import classes from './Input.module.css';


const Input = (props) => {

    let inputType = null;

    switch(props.elementType) {
        case('input'):
            inputType = <input onChange={props.changed}  className={classes.InputElement} {...props.elementConfig} value={props.value} />
            break;
        case('textarea'):
            inputType = <textarea onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value} />
            break;
        case('select'):
            inputType = <select onChange={props.changed} className={classes.InputElement} value={props.value}>
                            {props.elementConfig.options.map(Option => (
                                <option key={Option.value} value={Option.value}>{Option.displayValue}</option>
                            ))}   
                        </select>
            break;
        default: 
            inputType= <input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value} />
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputType}
        </div>
    );



}
export default Input;