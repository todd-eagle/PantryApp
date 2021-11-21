import React, {useContext} from 'react'
import {StyleSheet } from 'react-native'
import NavLink from '../components/NavLink'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import SignUpForm from '../components/AuthForm'

const SignupScreen = () => {
    const {state, signup} = useContext(AuthContext)
    
    console.log('signup: ', signup)
    return (
        <>
        <SignUpForm 
            headerText = 'Sign up for PantryToGo' 
            buttonName = 'Sign Up'
            signup = 'true'
            errorMessage={state.errorMessage}
            onSubmit = {signup}   
        />
        <NavLink
            routeName="Signin"
            text="Already have an account? Sign in instead!"
        />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff'
    }
})

export default SignupScreen
