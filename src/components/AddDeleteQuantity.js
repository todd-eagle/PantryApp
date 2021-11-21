
import React from 'react'
import { View, Text } from 'react-native'
import AddButton from './FormButton'
import SubButton from './FormButton'

const AddDeleteQuantity = ({add, subtract, number}) => {
    return (
        <View>
            <SubButton buttonName = {'-'}  onPress = {() => subtract(1)}/>
                <Text>{number}</Text>
            <AddButton buttonName = {'+'}  onPress = {() => add(1)}/>  
        </View>
    )
}

export default AddDeleteQuantity
