import authRoute from '../api/route'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import {navigateResetRoot } from "../navigationRef"
import {SERVER} from '../../server/consts/Messages'

const useAuth = () => {

    const {dispatchToken, dispatchItem, addUserId} = useContext(AuthContext)

    const tryLocalSignIn = async() => {
        const token = await AsyncStorage.getItem('token')
        console.log("local token: ", token)
        if(token) {
            await dispatchToken(token)
            try {
                const user_id = await AsyncStorage.getItem('user_id')
                await addUserId(user_id)
                
                navigateTo('Tabs','Store')
            } catch (err) {
                console.log('Token retrieval error: ', err)
            }
        } else {navigateTo('Auth','Signin')}
    }

    const signIn = async({email, password}) => {
 
        try {
            const response = await getResponseData('/signin/', {email, password})
            try {
                const last_login = new Date(Date.now()).toISOString()
                await authRoute.put(`/signin/${response.data.user_id}`,  {last_login})
              } catch (err) {
                console.log('authRoute Error: ', error )
            }
            setAuthData(response.data)

            navigateTo('Tabs','Store')
        } catch (err) {
            console.log('Signin Error: ', err )
            dispatchItem('add_error', SERVER.loginErr)
        }
    }

    const signUp = async({email, password}) => {
        try {
            const response = await getResponseData('/signup/', {email, password})
            console.log('response data: ', response.data)
            setAuthData(response.data)
            navigateTo('Tabs','Store')
        } catch (err) {
            console.log('Signup Error: ', err)
            dispatchItem('add_error', SERVER.signupErr)
        }
    }

    const signOut = async() => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user_id')
        dispatchItem('signout')
        navigateTo('Auth', 'Signin')
    }

    const navigateTo = (navigator, screen) => {
        navigateResetRoot(navigator, { screen: screen })
    }

    const getResponseData = async (path, {email, password}) => {
        const response = await authRoute.post(path, {email, password})
        return response
    }

    const setAuthData = async(data) => {
        await dispatchToken(data.token)
        await AsyncStorage.setItem('token', data.token)
        await AsyncStorage.setItem('user_id', data.user_id)     
        await addUserId(data.user_id)
    }

    return{tryLocalSignIn, signIn, signUp, signOut}
}

export default useAuth;
