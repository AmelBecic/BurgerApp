import React , {Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENT_PRICES = {
    cheese: 0.7 , 
    meat: 1 , 
    salad: 0.4 , 
    bacon: 0.5
}


class BurgerBuilder extends Component {

    state = {
        ingredients: null ,
    totalPrice: 2,
    purchasable: false , 
    purchasing: false ,
    loading: false
    }

    componentDidMount() {
        
        axios.get('https://burger-builder-92e0d.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            });
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce( (sum , el) => {
                return sum + el ;
            }, 0);
        
        this.setState({purchasable: sum > 0})

    }
    cancelOrderHandler = () => {
        this.setState({purchasing: false});
    }
    


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount+1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        this.setState({ingredients: updatedIngredients , totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0){
            const oldCount = this.state.ingredients[type];
            const newCount = oldCount-1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = newCount;

            const priceAddition = INGREDIENT_PRICES[type];
            const newPrice = this.state.totalPrice - priceAddition;

            this.setState({ingredients: updatedIngredients , totalPrice: newPrice});
            this.updatePurchaseState(updatedIngredients);

        }
        
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
           let queryParams = [];
           for(let i in this.state.ingredients) {
               queryParams.push(encodeURIComponent(i) + '=' +  encodeURIComponent(this.state.ingredients[i]));
           }
           const queryString = queryParams.join('&');

            this.props.history.push({
                pathname: '/checkout' , 
                search: '?' + queryString
            });

            
    }

    

   render () {
       const disabledInfo = {...this.state.ingredients};
       for (let i in disabledInfo){
           disabledInfo[i] = disabledInfo[i] <= 0;
       }
       
       
       let orderSummary = null;
       let burger = <Spinner />
       if(this.state.ingredients) {
           burger = ( 
               <Auxi>
                   <Burger ingredients={this.state.ingredients}/>
                <BuildControls ordered={this.purchasingHandler} orderDisable={this.state.purchasable} price={this.state.totalPrice} disabled={disabledInfo} remove={this.removeIngredientHandler} ingredientUpdate= {this.addIngredientHandler} />
               </Auxi>
           );
           orderSummary = <OrderSummary price={this.state.totalPrice} purchaseCanceled={this.cancelOrderHandler} purchaseContinue={this.purchaseContinueHandler} ingredients={this.state.ingredients}/>
           

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

export default BurgerBuilder;