import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {


    state = {
        Postal: '' ,
        email: '',
        address: {
            street: '',
            postal: ''
        },
        loading: false

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        alert('you continued');
        const order = {
            ingredients: this.state.ingredients , 
            price: this.props.price ,
            name: 'Amel',
            address:  {
                number: '21' ,
                city: 'Visoko' ,
                zipCode: '23'
            } ,
            orderType: 'Fastest'
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

    render () {
        let form = (
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Enter your Name" />
            <input className={classes.Input} type="email" name="email" placeholder="Enter your Email" />
            <input className={classes.Input} type="text" name="street" placeholder="Enter your Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Enter your Postal" />
            <Button btnType="Success" clicked={this.orderHandler} >Order now</Button>
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