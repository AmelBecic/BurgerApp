import React , {Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    cheese: 0.7 , 
    meat: 1 , 
    salad: 0.4 , 
    bacon: 0.5
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
        cheese: 0,
        bacon: 0,
        salad: 0,
        meat: 0
    } ,
    totalPrice: 2,
    purchasable: false , 
    purchasing: false
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
        alert('you continued');
    }

    

   render () {
       const disabledInfo = {...this.state.ingredients};
       for (let i in disabledInfo){
           disabledInfo[i] = disabledInfo[i] <= 0;
       }
       console.log(this.state.purchasable);
       return (
           <Auxi>
               <Modal ordered={this.state.purchasing} orderCanceled={this.cancelOrderHandler}>
                    <OrderSummary price={this.state.totalPrice} purchaseCanceled={this.cancelOrderHandler} purchaseContinue={this.purchaseContinueHandler} ingredients={this.state.ingredients}/>
               </Modal>
               <Burger ingredients={this.state.ingredients}/>
                <BuildControls ordered={this.purchasingHandler} orderDisable={this.state.purchasable} price={this.state.totalPrice} disabled={disabledInfo} remove={this.removeIngredientHandler} ingredientUpdate= {this.addIngredientHandler} />
           </Auxi>
       )
   }


}

export default BurgerBuilder;