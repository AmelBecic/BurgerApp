import React , {Component} from 'react';

import classes from './Modal.module.css';
import Auxi from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop';

class  Modal extends Component {

    shouldComponentUpdate (nextProos, nextState) {
        return (nextProos.show !== this.props.show || nextProos.children !== this.props.children);
    }
    

    render () 
    {
        return (
        <Auxi>
            
        <Backdrop show={this.props.ordered}  canceled={this.props.orderCanceled}/>
        <div className={classes.Modal}
        style={{
            transform: this.props.ordered ? 'translateY(0)' : 'translateY(-100vh)' ,
            opacity: this.props.ordered ? '1' : '0'
        }}>
            {this.props.children};
        </div>
        </Auxi>
    );
}



}

export default Modal;