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

const tryLocalSignin = (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      dispatch({ type: 'signin', payload: token })
      const user_id = await AsyncStorage.getItem('user_id')
      dispatchUserId(dispatch, user_id)
      navigateTo('Tabs','Store')
    } else {
      navigateTo('Auth','Signin')
    }
  }

const signin = (dispatch) => async ({ email, password }) => {
    try {
      const response = await getResponseData('/signin', {email, password}, dispatch)
      try {
        const last_login = new Date(Date.now()).toISOString()
        await authRoute.put(`/signin/${response.data.user_id}`,  {last_login})
      } catch (error) {
        console.log('authRoute Error: ', error )
      }
      dispatch({ type: 'signin', payload: response.data.token })
       //console.log('Token: ', response.data.token)
      navigateTo('Tabs','Store')
    } catch (err) {
        console.log('Signin Error: ', err )
      dispatch({
        type: 'add_error',
        payload: FORM.loginErr,
      })
    }
  }

const signup = (dispatch) => async({email, password}) => {
   try {
      const response = await getResponseData('/signin', {email, password}, dispatch)
      dispatch({type: 'signin', payload: response.data.token})
      navigateTo('Tabs','Store')
   } catch (err) {
       console.log('Sign Up Error: ', err)
       dispatch({
           type: 'add_error', payload: FORM_ERR.emailErr
       })
   }
}

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token')
    dispatch({type: 'signout'})
    navigateResetRoot('Auth', { screen: 'Signin' })
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' })
}

const navigateTo = (navigator, screen) => {
    navigateResetRoot(navigator, { screen: screen })
}

const getResponse = async (path, {email, password}) => {
    const response = await authRoute.post(path, {email, password})
    await AsyncStorage.setItem('token', response.data.token)
    console.log('AsyncStorage.setItem to :', response.data.token)
    return response
}

const dispatchUserId  =  (dispatch, user_id) => {
  console.log('Dispatched UserId is: ', user_id)
  dispatch({type: 'add_userid', payload: user_id})
  
}

const getResponseData = async (path, {email, password}, dispatch) => {
  const responseData = await getResponse(path, {email, password}) 
  await AsyncStorage.setItem('user_id', responseData.data.user_id)
  dispatchUserId(dispatch, responseData.data.user_id)
  return responseData
}

//////// Temporary additions /////////////
const addOrder = (dispatch) => async (item) => {
 
  // console.log('order: ', item)
  // const response = await getResponse({item, number, user_id})
  dispatch({type: 'add_to_cart', payload: item})
}

export const {Provider, Context} = createContext(
    AuthReducer,
    {signin, signup, signout, tryLocalSignin, clearErrorMessage, addOrder},
    {token: null, errorMessage: '', userId: null, cartOrders: null}
)
