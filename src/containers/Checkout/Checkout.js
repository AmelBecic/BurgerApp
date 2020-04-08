import React , {Component} from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSUmmary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';


class Checkout extends Component {

    
    
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary checkoutCanceled={this.checkoutCanceledHandler} 
                                 checkoutContinue={this.checkoutContinueHandler}  
                                 ingredients={this.props.ings} 
                />
                <Route path={this.props.match.path + '/contact-data'} 
                       component={ContactData} />
            </div>
        );
    }



}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);