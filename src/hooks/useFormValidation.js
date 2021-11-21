import {useState, useMemo, useCallback} from 'react'
import isEqual from 'lodash/isEqual'

import {EMAIL_ERR, PASSWD_ERR, CONF_PASSWD_ERR, 
    NUM_ONLY_ERR, LETTERS_ONLY_ERR,
    MAX_CHAR_ERR,
    PLEASE_SELECT, DROP_DOWN_SELECT} from '../../server/consts/Forms'

const useValidation = (values, inputs) => {
  
    const [errors, setErrors] = useState({})
    const [requiredFields, setRequiredFields] = useState({})
    let isReqInputsSatisfied = false
    const valid = useMemo(() => {return{}},[])
    let compReqObj = {}
    let isFormValid = false

    // console.log("errors======: ", errors)
    // console.log("INPUTS: +", inputs)

   const validator = (required, id) => {
        typeof required === 'undefined' ? required = false : required = true
      
        if (Object.keys(errors).length === 0){
            if(required && valid[id]){
                compReqObj[id] = true
                isEqual(compReqObj, requiredFields) ? isReqInputsSatisfied = true : isReqInputsSatisfied = false      
            }
        }
        
        isReqInputsSatisfied && Object.keys(errors).length === 0 ? isFormValid = true : isFormValid = false
   }

    const charLength = (charLengthValue, value, id) => {
        if (value.length < charLengthValue.min){
            errors[id] = `At least ${charLengthValue.min} characters are required.` 
            valid[id] = false
            return false
        }
            else if (value.length > charLengthValue.max){
                errors[id] =  MAX_CHAR_ERR
                valid[id] = false 
                return false
            }    
        else {
            valid[id] = true
        }
        return true
    }

    const validateEmail = (email)=> {
        delete errors.email;
        if(email) {
            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                errors.email = EMAIL_ERR
                valid.email=false
            }else {valid.email=true }
        }
    }

    const validatePassword = (value)=>{
        delete errors.password;
        if(value){   
            if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value)){
                    errors.password = PASSWD_ERR
            }else{
                    valid.password=true
            }
        }    
        return value
    }

    const confirmPassword = (pass, value, id)=>{
        pass !== value ? errors[id] = CONF_PASSWD_ERR : valid[id] = true
    }

    const alphaNumeric = (chars, value, id) => {
        switch (chars) {
            case 'num':
                if(!/^[+-]?\d*\.?\d+(?:[Ee][+-]?\d+)?$/.test(value)){
                    errors[id] = NUM_ONLY_ERR
                    valid[id] = false
                }else{
                    valid[id] = true
                }
                break;
            case 'letter':
                if(!/^[a-zA-Z-]+$/.test(value)){
                    errors[id] = LETTERS_ONLY_ERR
                   valid[id] = false
                }else{
                    valid[id] = true
                }
                break;
            case 'alphaNumeric':
                break;           
            default:
                break;
        }
    }

    const validateDropDown = (dropDown, id, value) => {
        if (dropDown){
            if (value === DROP_DOWN_SELECT){
                errors[id] = PLEASE_SELECT
                valid[id] = false
            }
        }else {
            valid[id] = true
        }
    }

    const setRequiredInputs = useCallback(() => {
        let reqObj = {}
        inputs.filter(el => el.required).map(el => reqObj[el.id]= true)
        setRequiredFields(reqObj)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]
    )

    for (let input of inputs) {
        delete errors[input.id];
        delete valid[input.id];
        let pass = values.password
 
        if(input.charLength  && values[input.id] ){
            const minSatisfied = charLength(input.charLength, values[input.id], input.id)    
         
            if(minSatisfied && input.password){
               validatePassword(values[input.id]) 
            }
            charLength(input.charLength, values[input.id], input.id)
        }

        if(input.chars && values[input.id]){
            alphaNumeric(input.chars, values[input.id], input.id)
        }

        if (input.confirm && values[input.id]){
            confirmPassword(pass, values[input.id], input.id)
        }

        if(input.email){
            validateEmail(values[input.id])
        }

        if (input.dropDown){
            validateDropDown(input.dropDown, input.id,  values[input.id])
        }
       
        validator(input.required, input.id)
    }

    useMemo(() => {
        setRequiredInputs()
        setErrors(errors)
    }, [errors, setRequiredInputs])

    return {errors, isReqInputsSatisfied, isFormValid, validateEmail, validatePassword, confirmPassword, alphaNumeric, charLength}
  
}

export default useValidation