import createContext from '../createContext'

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

export const {Provider, Context} = createContext(
    AuthReducer,
    {dispatchToken, addUserId, dispatchItem, clearErrorMessage},
    {token: null, errorMessage: '', userId: null, cartOrders: null}
)
