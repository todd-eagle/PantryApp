
import createContext from '../createContext'

const ProductsReducer = (state, action) => {
 
    switch (action.type) {
        case 'get_products':
            return {errorMessage:'', products: action.payload}
        case 'add_error':
            return {...state, errorMessage: action.payload} 
        default:
            return state
    }
}
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' })
}

const getProducts = (dispatch) => async () => {
    try {
        const response = await getResponse('/products')
        console.log('response.data.products}: ', response.data.products)
        dispatch({type: 'get_products', payload: response.data.products})
    } catch (err) {
        dispatch({
            type: 'add_error', payload: 'Can\'t connect. Please try again later.'
        })
    }
}


export const {Provider, Context} = createContext(
    ProductsReducer,
    {getProducts, clearErrorMessage},
    {products: null, errorMessage: ''}
)
