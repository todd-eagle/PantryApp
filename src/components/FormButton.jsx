import React from 'react'
import {View, Button} from 'react-native'

const FormButton = ({buttonName, onPress}) => {
    return (
        <View>
            <Button 
                title = {buttonName}
                onPress = {onPress}
            />
        </View>
      
            
       
    )
}

export default FormButton
