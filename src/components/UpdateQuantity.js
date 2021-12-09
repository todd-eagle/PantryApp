
import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import AddButton from './FormButton'
import SubButton from './FormButton'
import useCount from '../hooks/useCount'

const UpdateQuantity = ({quantity}) => {

    const [amount, setAmount] = useState(quantity)

    useEffect(() => {
      setAmount(quantity)
    }, [quantity])

    const {number, add, subtract} = useCount(amount)
    return (
        <View>
            <SubButton buttonName = {'-'}  onPress = {() => subtract(1)}/>
                <Text>{number}</Text>
            <AddButton buttonName = {'+'}  onPress = {() => add(1)}/>  
        </View>
    )
}

export default UpdateQuantity
