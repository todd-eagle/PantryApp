import React, {useContext, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, FlatList, Image, BackHandler } from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import RemoveFromCartButton from '../components/FormButton'
import CheckOutButton from '../components/FormButton'
import useOrders from '../hooks/useOrders'
import UpdateQuantity from '../components/UpdateQuantity'

const CartScreen = ({navigation}) => {
    const {state, addOrder} = useContext(AuthContext)
    const orders = state.cartOrders
    const {removeOrder, orderList, isRemoved} = useOrders(orders)

   // console.log('Orders: ', orders)
    
useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Store')
        return true // disables normal back button behaviour!  Won't work if not here!
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress); 
      return () =>
        BackHandler.removeEventListener('hardwareBackPress');
    }, [])
  )

    useEffect(() => {
        isRemoved ? addOrder(orderList) : null
    }, [orderList, isRemoved])

    return (
        <View style={styles.viewStyle}>
             <View><Text>Orders</Text></View>
            <FlatList
                 data = {orders}
                 keyExtractor = {orders => orders.id.toString()}
                 renderItem = {({item}) => {
                    return (
                        <View>
                            <View>
                                <TouchableOpacity onPress={()=>navigation.navigate('Tabs', { screen: 'Product', 
                                                                                    params:{ screen: 'Product', 
                                                                                    params:{item,  title: item.title, description: item.description}}})}>    
                                        <Text>
                                            <Image style = {styles.image} source= {{uri: item.image_url}} />
                                            {item.title}
                                            {item.quantity} 
                                        </Text>
                                </TouchableOpacity>  
                                <UpdateQuantity quantity = {item.quantity} item = {item} 
                                                        userId = {item.user_id} orders = {orders} />                      
                                <RemoveFromCartButton 
                                    buttonName = {'Remove'}
                                    onPress = {()=>removeOrder(item.id, orders)}
                                    
                                />     
                            </View>
                           
                     </View>    
                     )
                 }}
            />
                    <CheckOutButton
                        buttonName = {'Check out'}
                        onPress={()=>{navigation.navigate('Tabs', { screen:'Address'})}}
                    />
    
        </View>
    )
}

const styles = StyleSheet.create ({
    viewStyle: {
        // borderWidth: 4,
        // borderColor: 'red',
        // height: 255
    },
    image: {
        flex: 1,
        width: 40,
        height: 40,
        resizeMode: 'contain',
        alignItems: 'center'
    }
})

export default CartScreen
