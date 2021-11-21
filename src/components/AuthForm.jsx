import React, {useState, useEffect, useCallback} from 'react'
import {Text, View} from 'react-native'
import AuthView from '../components/BaseForm'
import FormButton from '../components/FormButton'
import useValidation from '../hooks/useFormValidation'


const AuthForm = ({headerText, buttonName, signup, errorMessage, onSubmit}) => {

    const [values, setValues] = useState({})
    const [formValid, setFormValid] = useState(false)

    const onChangeInputs = (item, value) => {
        setValues(values => ({ ...values, [item] : value.trim()}))
    }

    const Submit = () => {
        const {email, password} = values
        console.log(values)
        onSubmit( {email, password})
    }

    const inputInfo = 
        [
            {label: 'Email:', id: 'email', placeholder: 'email@address.com',  required: true, email: true, value: values.email},
            {label: 'Password:', id: 'password', password: true, hidePassword: true, required: true, charLength: {min: 8}, value: values.password},
        ]
    
    const confirmInput = {label: 'Confirm password', id: 'confirm', hidePassword: true, required: true, confirm: true, value: values.confirm}    

    if (signup)
        inputInfo.push(confirmInput)    

    const {errors, isReqInputsSatisfied, isFormValid} = useValidation(values, inputInfo)

    const formIsValidated = useCallback((reqInputs) => {
        isFormValid ? setFormValid(true) : setFormValid(false)
    },[isFormValid])    

    useEffect(() => {  
       formIsValidated(isReqInputsSatisfied)
    },[formIsValidated, isReqInputsSatisfied] )

    return (
        <View>
            <Text> {headerText} </Text>
            <AuthView 
                inputInfo = {inputInfo}
                onChangeInputs = {onChangeInputs}
                autoCapitalize="none"
                autoCorrect={false}
                errors = {errors}
                serverErrors = {errorMessage}
            />
            <FormButton 
                buttonName = {buttonName}
                onPress={() => Submit()}
            />
        </View>

    )
}

export default AuthForm
