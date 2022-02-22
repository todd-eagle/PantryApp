import React, {useContext, useEffect, useCallback} from 'react'
import { Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import useCount from '../hooks/useCount'
// import {Context as AuthContext} from '../context/reducers/AuthContext'
import { Context as CartContext } from '../context/reducers/CartContext'
import useOrders from '../hooks/useOrders'
import AddDeleteQuantity from './AddDeleteQuantity'
import AddToCartButton from './FormButton'

const AddItemsToCart = ({item, userId}) => {
    
    // const {state, addOrder} = useContext(AuthContext)
    const {state, addOrder} = useContext(CartContext)
    const {number, add, subtract, reset} = useCount(1)
    const {addItem, orderList} = useOrders(state.cartOrders)

    // console.log('userId: ', userId)

    useFocusEffect(
        useCallback(() => {   
              return () => {
                //resets item quantity to 1 on exit screen  
                reset()
              }
            },[])
    )   

    useEffect(() => {
        // console.log('Returned List: ', orderList)
       addOrder(orderList)
         console.log('addOrder state: ++++++ ', state)
    }, [orderList, number])

    return (
        <>
            <View>
                <AddDeleteQuantity number = {number} add = {add} subtract = {subtract}/>
            </View>
            <View>
            <AddToCartButton 
                buttonName = {'Add to Cart'} 
                onPress = {()=> addItem(item, userId, number, isModified = false)}    
            />
            </View>
        </>
    )
}
export default AddItemsToCart