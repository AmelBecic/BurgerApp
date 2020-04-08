import React , {Component} from 'react';
import {connect} from 'react-redux';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';




class BurgerBuilder extends Component {

    state = {
     
    purchasable: false , 
    purchasing: false ,
    loading: false
    }

    componentDidMount() {
        
      /*  axios.get('https://burger-builder-92e0d.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            });

            */
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce( (sum , el) => {
                return sum + el ;
            }, 0);
        
        return (sum > 0)

    }
    cancelOrderHandler = () => {
        this.setState({purchasing: false});
    }
    


    
        
    

    purchasingHandler = () => {
        this.setState({purchasing: true});

    }

    purchaseContinueHandler = () => {
        /*
        this.setState({loading: true})
        alert('you continued');
        const order = {
            ingredients: this.state.ingredients , 
            price: this.state.totalPrice ,
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
                this.setState({loading: false , purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false , purchasing: false});
            });
            */
           
            this.props.history.push('/checkout');

            
    }

    

   render () {
       const disabledInfo = {...this.props.ings};
       for (let i in disabledInfo){
           disabledInfo[i] = disabledInfo[i] <= 0;
       }
       
       
       let orderSummary = null;
       let burger = <Spinner />
       if(this.props.ings) {
           burger = ( 
               <Auxi>
                   <Burger ingredients={this.props.ings}/>
                <BuildControls  price={this.props.totalPrice} 
                                ordered={this.purchasingHandler} 
                                orderDisable={this.updatePurchaseState(this.props.ings)} 
                                disabled={disabledInfo} 
                                remove={this.props.onIngredientRemoved} 
                                ingredientUpdate= {this.props.onIngredientAdded} />
               </Auxi>
           );
           orderSummary = <OrderSummary price={this.props.totalPrice} 
                                        purchaseCanceled={this.cancelOrderHandler} 
                                        purchaseContinue={this.purchaseContinueHandler} 
                                        ingredients={this.props.ings}/>
           

       }
       if (this.state.loading) {
        orderSummary = <Spinner />
    }




       return (
           <Auxi>
               <Modal ordered={this.state.purchasing} orderCanceled={this.cancelOrderHandler}>
                    {orderSummary}
               </Modal>
               {burger}
           </Auxi>
       )
   }


}

const mapStateToProps = state => {
    return {
        ings: state.ingredients ,
        totalPrice: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ing) => dispatch({type: 'ADD_INGREDIENT' , ingredientType: ing }) ,
        onIngredientRemoved: (ing) => dispatch({type: 'REMOVE_INGREDIENT' , ingredientType: ing })
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);