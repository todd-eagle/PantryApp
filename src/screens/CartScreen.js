import React, {useContext,useEffect} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {Context as AuthContext} from '../context/reducers/AuthContext'


const CartScreen = () => {
    const {state} = useContext(AuthContext)

    const orders = state.cartOrders

    const test = JSON.stringify(orders)

    return (
        <View style={styles.viewStyle}>
             <View><Text>Orders</Text></View>
            <FlatList
                 data = {orders}
                 keyExtractor = {orders => orders.id.toString()}
                 renderItem = {({item}) => {
                     return (
                        <Text>
                            {item.title}
                            {item.quantity}
                        </Text>
                     )
                 }}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    viewStyle: {
        // borderWidth: 4,
        // borderColor: 'red',
        // height: 255
    }
})

export default CartScreen
