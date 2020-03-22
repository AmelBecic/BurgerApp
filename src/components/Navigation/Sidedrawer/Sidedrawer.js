import React from 'react';
import Logo from '../../Logo/Logo';
import Navigationitems from '../NavigationItems/Navigationitems';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxi from '../../../hoc/Auxi';


const Sidedrawer = (props) => {

    let attachedClass = [classes.Sidedrawer , classes.Closed];
    if (props.show) {
        attachedClass= [classes.Sidedrawer, classes.Open];
    }

    return (
        <Auxi>
            <Backdrop show={props.show} canceled={props.closed}/>
            <div className={attachedClass.join(' ')}>
                <Logo height="11%"/>
                <nav>
                    <Navigationitems />
                </nav>


            </div>
        </Auxi>

    );



}

export default Sidedrawer;