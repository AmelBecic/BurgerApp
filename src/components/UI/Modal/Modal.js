import React from 'react';

import classes from './Modal.module.css';
import Auxi from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    
    return (
        <Auxi>
            
        <Backdrop show={props.ordered}  canceled={props.orderCanceled}/>
        <div className={classes.Modal}
        style={{
            transform: props.ordered ? 'translateY(0)' : 'translateY(-100vh)' ,
            opacity: props.ordered ? '1' : '0'
        }}>
            {props.children};
        </div>
        </Auxi>
    )



}

export default Modal;