import React, {useState, useEffect, useCallback} from 'react'
import {  View, Text } from 'react-native'
import AddressView from './BaseForm'
import FormButton from './FormButton'
import useValidation from '../hooks/useFormValidation'


const AddressForm = ({headerText, buttonName, errorMessage, onSubmit}) => {
    
    //////// Make seperate hook or functional component ///////
    
    const [values, setValues] = useState({})
    const [formValid, setFormValid] = useState(false)

    const onChangeInputs = (item, value) => {
        setValues(values => ({ ...values, [item] : value.trim()}))
    }

    const Submit = () => {
        // const {email, password} = values
        // console.log(values)
        // onSubmit( {email, password})
    }

//////////////////////////////////////////////////////////////

const inputInfo = 
[   {label: 'First Name:', id: 'first_name',  required: true, value: values.first_name},
    {label: 'Last Name:', id: 'last_name',  required: true, value: values.last_name},
    {label: 'Address:', id: 'address', placeholder: 'ex. 123 Stapleton Ave.',  required: true, value: values.address},
    {label: 'City:', id: 'city', placeholder: 'ex. Newberry',  required: true, value: values.city},
    {label: 'State:', id: 'state',  required: true, value: values.state},
    {label: 'Zip:', id: 'zip', placeholder: 'ex. 29108.',  required: true, value: values.zip},
]

const {errors, isReqInputsSatisfied, isFormValid} = useValidation(values, inputInfo)

const formIsValidated = useCallback((reqInputs) => {
    isFormValid ? setFormValid(true) : setFormValid(false)
},[isFormValid])    

useEffect(() => {  
   formIsValidated(isReqInputsSatisfied)
},[formIsValidated, isReqInputsSatisfied] )


return (
        <View>
            <Text>{headerText}</Text>
            <AddressView 
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

export default AddressForm
