import React, {useContext, useEffect} from 'react'
import { Text, View } from 'react-native'
import useCount from '../hooks/useCount'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import useOrders from '../hooks/useOrders'
import AddDeleteQuantity from './AddDeleteQuantity'
import AddToCartButton from './FormButton'

const AddItemsToCart = ({item, userId}) => {
    
    const {state, addOrder} = useContext(AuthContext)
    const {number, add, subtract} = useCount(1)
    const {addItem, orderList} = useOrders(state.cartOrders)
// z
    console.log('userId: ', userId)

    useEffect(() => {
        console.log('Returned List: ', orderList)
       addOrder(orderList)
        console.log('state: ', state)
    }, [orderList])

    return (
        <>
            <View>
                <AddDeleteQuantity number = {number} add = {add} subtract = {subtract}/>
            </View>
            <View>
            <AddToCartButton 
                buttonName = {'Add to Cart'} 
                onPress = {()=> addItem(item, userId, number)}    
            />
            </View>
        </>
    )
}
export default AddItemsToCart