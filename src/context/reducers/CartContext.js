import createContext from '../createCartContext'

const CartReducer = (state, action) => {
    switch (action.type) {
        case 'add_to_cart':
            // console.log('add_to_cart: ', action.payload)
            return {...state, cartOrders: action.payload}         
        default:
            return state
    }
}
const addOrder = (dispatch) => async (item) => {
    dispatch({type: 'add_to_cart', payload: item})
  }

export const {Provider, Context} = createContext(
    CartReducer,
    {addOrder},
    {errorMessage: '', cartOrders: null}
)