import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {


    state = {
        orderForm: {
            name: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'text' ,
                    placeholder: 'Your name'
                } ,
                value: ''
            },
            street: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'text' ,
                    placeholder: 'Your street'
                } ,
                value: ''
            } ,
            country: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'text' ,
                    placeholder: 'Your country'
                } ,
                value: ''
            } ,
            zipCode: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'text' ,
                    placeholder: 'Your zipcode'
                } ,
                value: ''
            } ,
            email: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'email' ,
                    placeholder: 'Your email'
                } ,
                value: ''
            }   ,
            orderType: {
                elementType: 'select' ,
                elementConfig: {
                   options: [{value: 'fastest' , displayValue: 'Fastest'} ,
                             {value: 'cheapest' , displayValue: 'Cheapest'}]
                } ,
                value: ''
            }
        },
        loading: false

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = {};
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            formData ,
            ingredients: this.props.ingredients , 
            price: this.props.price ,
            
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false });
                this.props.history.push('/');
            });

    }
    onChangeHandler = (event , inputIdentifier) => {
 
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedValueForm = {
            ...updatedForm[inputIdentifier]
        }
        updatedValueForm.value = event.target.value;
        updatedForm[inputIdentifier] = updatedValueForm;

        this.setState({orderForm: updatedForm});

    }

    render () {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key , 
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input key={formElement.id}
                       elementType={formElement.config.elementType} 
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       changed={(event) => this.onChangeHandler(event , formElement.id)} />
            ))}
            <Button btnType="Success"  >Order now</Button>
        </form>);
        if (this.state.loading) {
            form = (<Spinner />);
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your information</h4>
                    {form}
            </div>
        );
    }
}

export default ContactData;