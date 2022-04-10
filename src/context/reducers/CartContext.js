import createContext from '../createCartContext'

const CartReducer = (state, action) => {
    switch (action.type) {
        case 'add_to_cart':
            // console.log('add_to_cart: ', action.payload)
            return {...state, cartOrders: action.payload}         
        case 'clear_cart':
            return {...state, cartOrders: null}
        default:
            return state
    }
}
const addOrder = (dispatch) => async (item) => {
    // console.log('CartContext Item------: ', item)
    dispatch({type: 'add_to_cart', payload: item})
  }

const clearOrder =  (dispatch) => async () => {
    dispatch({type: 'clear_cart'})
}

export const {Provider, Context} = createContext(
    CartReducer,
    {addOrder, clearOrder},
    {errorMessage: '', cartOrders: null}
)