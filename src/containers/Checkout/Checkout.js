import React , {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSUmmary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1 ,
            meat: 1 , 
            bacon: 1 , 
            cheese: 1
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {}
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }
    
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary checkoutCanceled={this.checkoutCanceledHandler} checkoutContinue={this.checkoutContinueHandler}  ingredients={this.state.ingredients} />
            </div>
        );
    }



}

export default Checkout;