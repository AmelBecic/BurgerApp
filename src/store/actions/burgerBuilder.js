


export const add_ingredients = (name) => {

    return {
        type: 'ADD_INGREDIENT' ,
        ingredientType: name
    }

}
export const remove_ingredients = (name) => {

    return {
        type: 'REMOVE_INGREDIENT' ,
        ingredientType: name
    }

}