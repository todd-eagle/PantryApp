import AsyncStorage from '@react-native-async-storage/async-storage'
import authRoute from '../../api/route'
import createContext from '../createContext'
import {FORM_ERR, FORM} from '../../../server/consts/Messages'
import {navigateResetRoot } from "../../navigationRef"

const AuthReducer = (state, action) => {
   // console.log("Action payload: ",action.payload)
    switch (action.type) {
        case 'signin':
            return {...state, errorMessage:"", token: action.payload}
        case 'signout':
            return { token: null, errorMessage: '' }
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'add_userid':
            return {...state, userId: action.payload} 
        ////// temporary addition ///////      
        case 'add_to_cart':
          // console.log('add_to_cart: ', action.payload)
          return {...state, cartOrders: action.payload}    
        default:
            return state
    }
}


const dispatchToken = (dispatch) => async(token) => {
    dispatch({ type: 'signin', payload: token })
} 

const addUserId = (dispatch) => async (userId) => {
    dispatchUserId(dispatch, userId)
}

const dispatchItem = (dispatch) => (type, payload = '') => {
  dispatch({
    type: type,
    payload: payload
  })
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' })
}

const dispatchUserId  =  (dispatch, user_id) => {
  // console.log('Dispatched UserId is: ', user_id)
  dispatch({type: 'add_userid', payload: user_id})
  
}

//////// Temporary additions /////////////
const addOrder = (dispatch) => async (item) => {
  dispatch({type: 'add_to_cart', payload: item})
}

export const {Provider, Context} = createContext(
    AuthReducer,
    {dispatchToken, addUserId, dispatchItem, clearErrorMessage, addOrder},
    {token: null, errorMessage: '', userId: null, cartOrders: null}
)
