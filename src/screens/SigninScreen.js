import React, {useContext} from 'react'
import {StyleSheet } from 'react-native'
import NavLink from '../components/NavLink'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import SignInForm from '../components/AuthForm'

const SigninScreen = () => {

    const {state} = useContext(AuthContext)

    return (
        <>
        <SignInForm 
            headerText = 'Sign in to your account.' 
            buttonName = 'Sign In'
            errorMessage={state.errorMessage}
        />
        <NavLink
            text="Dont have an account? Sign up instead"
            routeName="Signup"
        />
        </>
    )
}

export default SigninScreen
