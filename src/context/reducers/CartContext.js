import createContext from '../createContext'
import cartRoute from '../../api/route'

const CartReducer = (state, action) => {
 
    switch (action.type) {
        case 'add_to_cart':
            return {...state, cart_orders: action.payload}
        case 'remove_from_cart':
            return {...state, errorMessage: action.payload}
        case 'update_cart':
            return {...state, errorMessage: action.payload}     
        default:
            return state
    }
}
const addOrder = (dispatch) => async (item, number, user_id) => {
    const response = await getResponse(item, number, user_id)
    dispatch({type: 'add_to_cart'})
}

const getResponse = async (path, {user_id}) => {
    const response = await cartRoute.post(path, {user_id})
    return response
}


export const {Provider, Context} = createContext(
    CartReducer,
    {addOrder},
    // {token: null, errorMessage: '', userId: null}
)