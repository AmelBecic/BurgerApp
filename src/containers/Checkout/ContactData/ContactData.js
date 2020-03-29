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
                validation: {
                    required: true
                },
                valid: false , 
                value: '',
                touched: false
            },
            street: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'text' ,
                    placeholder: 'Your street'
                } ,
                validation: {
                    required: true
                },
                valid: false ,
                value: '',
                touched: false
            } ,
            country: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'text' ,
                    placeholder: 'Your country'
                } ,
                validation: {
                    required: true
                },
                valid: false ,
                value: '',
                touched: false
            } ,
            zipCode: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'text' ,
                    placeholder: 'Your zipcode'
                } ,
                validation: {
                    required: true
                },
                value: '',
                touched: false
            } ,
            email: {
                elementType: 'input' ,
                elementConfig: {
                    type: 'email' ,
                    placeholder: 'Your email'
                } ,
                validation: {
                    required: true
                },
                valid: false ,
                value: '',
                touched: false
            }   ,
            orderType: {
                elementType: 'select' ,
                elementConfig: {
                   options: [{value: 'fastest' , displayValue: 'Fastest'} ,
                             {value: 'cheapest' , displayValue: 'Cheapest'}]
                } ,
                validation: {} ,
                value: 'fastest',
                valid: true,
                touched: false
            }
        },
        loading: false,
        formIsValid: false
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

    checkValidity = (value , rules) => {
        let isValid = false;
        if (rules.required){
            isValid = value.trim() !== '';
        }

        return isValid;
    }

    onChangeHandler = (event , inputIdentifier) => {
 
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedValueForm = {
            ...updatedForm[inputIdentifier]
        }
        updatedValueForm.value = event.target.value;
        updatedValueForm.valid = this.checkValidity(updatedValueForm.value , updatedValueForm.validation);
        updatedValueForm.touched = true;
        updatedForm[inputIdentifier] = updatedValueForm;
        
        let formValid= true;
        for (let key in updatedForm) {
            formValid = (updatedForm[key].valid && formValid)
        }
        console.log(formValid);

        this.setState({orderForm: updatedForm, formIsValid: formValid});

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
                       valid = {!formElement.config.valid}
                       shouldValidate = {formElement.config.validation}
                       touched = {formElement.config.touched}
                       changed={(event) => this.onChangeHandler(event , formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} >Order now</Button>
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