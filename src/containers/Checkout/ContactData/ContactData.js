import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';


class ContactData extends Component {


    state = {
        Postal: '' ,
        email: '',
        address: {
            street: '',
            postal: ''
        }
    }

    render () {
        return (
            <div className={classes.ContactData}>
                <form>
                    <h4>Please enter your information</h4>
                    <input className={classes.Input} type="text" name="name" placeholder="Enter your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Enter your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Enter your Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Enter your Postal" />
                    <Button btnType="Success" >Order now</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;