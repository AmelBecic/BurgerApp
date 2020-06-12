

const initialState = {
    ingredients: {
        salad: 0 ,
        meat: 0 ,
        cheese: 0 ,
        bacon: 0
    } ,
    totalPrice: 2
}

const INGREDIENT_PRICES = {
    cheese: 0.7 , 
    meat: 1 , 
    salad: 0.4 , 
    bacon: 0.5
}

const reducer = (state=initialState , action) => {

    switch(action.type) {

        case 'ADD_INGREDIENT' :
            return {
                ...state , 
                ingredients: {
                    ...state.ingredients , 
                    [action.ingredientType] : state.ingredients[action.ingredientType] + 1 
                    
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
            };
        case 'REMOVE_INGREDIENT':
            return {
                ...state , 
                ingredients: {
                    ...state.ingredients , 
                    [action.ingredientType] : state.ingredients[action.ingredientType] - 1 
                   
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
            };
        default:
            return state;




    }
}

export default reducer;