
import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import AddButton from './FormButton'
import SubButton from './FormButton'
import useCount from '../hooks/useCount'
import useOrders from '../hooks/useOrders'


const UpdateQuantity = ({quantity, item, userId, orders}) => {

    const [amount, setAmount] = useState(quantity)
    const {addItem} = useOrders(orders)
    const {number, add, subtract} = useCount(amount)
    let [isModified, setIsModified] = useState(false)

    useEffect(() => {
      setAmount(quantity)
      writeToDb(number)
    }, [quantity, number])

    const writeToDb = (num) => {
        if (isModified){
            try {
                addItem(item, userId, num, isModified)
            } catch (err) {
                console.log('There was an error. ', err)
            }
        }
    } 

   
    return (
        <View>
            <SubButton buttonName = {'-'}  onPress = {() => {subtract(1); setIsModified(true) }}/>
                <Text>{number}</Text>
            <AddButton buttonName = {'+'}  onPress = {() =>{ add(1); setIsModified(true)}}/>  
        </View>
    )
}

export default UpdateQuantity
