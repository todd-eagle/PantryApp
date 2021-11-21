import React, {useContext} from 'react'
import { Text, View } from 'react-native'
import useCount from '../hooks/useCount'
import {Context as CartContext} from '../context/reducers/CartContext'

import AddDeleteQuantity from './AddDeleteQuantity'
import AddToCartButton from './FormButton'

const AddItemsToCart = ({item, userId}) => {
    
    const {addOrder} = useContext(CartContext)
    
    const {number, add, subtract} = useCount(1)

    console.log('userId: ', userId)

    return (
        <>
            <View>
                <AddDeleteQuantity number = {number} add = {add} subtract = {subtract}/>
            </View>
            <View>
            <AddToCartButton 
                buttonName = {'Add to Cart'} 
                onPress = {()=> addOrder(item, number, userId)}    
            />
            </View>
        </>
    )
}
export default AddItemsToCart