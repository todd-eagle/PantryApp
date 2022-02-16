import authRoute from '../api/route'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import {navigateResetRoot } from "../navigationRef"



const useAuth = () => {

    const {state, dispatchToken, dispatchError, addUserId} = useContext(AuthContext)

    const tryLocalSignIn = async() => {
        const token = await AsyncStorage.getItem('token')
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
            const response = await getResponseData('/signin', {email, password})
            try {
                const last_login = new Date(Date.now()).toISOString()
                await authRoute.put(`/signin/${response.data.user_id}`,  {last_login})
              } catch (error) {
                console.log('authRoute Error: ', error )
                dispatchError(err)
            }

            await dispatchToken(response.data.token)
            await AsyncStorage.setItem('token', response.data.token)
            await AsyncStorage.setItem('user_id', response.data.user_id)     
            await addUserId(response.data.user_id)

            navigateTo('Tabs','Store')
        } catch (err) {
            console.log('Signin Error: ', err )
        }
    }

    const signUp = async({email, password}) => {
        try {
            const response = await getResponseData('/signup/', {email, password})
            console.log('response data: ', response.data)
            await dispatchToken(response.data.token)
            await AsyncStorage.setItem('token', response.data.token)
            await addUserId(response.data.user_id)
            
            navigateTo('Tabs','Store')
        } catch (err) {
            console.log('Signup Error: ', err)
            dispatchError(err)
        }

    }

    const navigateTo = (navigator, screen) => {
        navigateResetRoot(navigator, { screen: screen })
    }

    const getResponseData = async (path, {email, password}) => {
        const response = await authRoute.post(path, {email, password})
        return response
    }

    return{tryLocalSignIn, signIn, signUp}
}

export default useAuth;
