import React, {useLayoutEffect, useContext} from 'react'
import { View, Button, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import ProductDetails from '../components/ProductDetails'
import AddItemsToCart from '../components/AddItemsToCart'

const ProductScreen = ({route, navigation}) => {

    const {state} = useContext(AuthContext)

    console.log('route: ', route)
    const itemDetails = route.params.item

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.title,
            headerLeft: () =>(
                <TouchableOpacity  onPress={() => navigation.goBack()} >
                   <View><Text>Back</Text></View>
                </TouchableOpacity>
            )
          })
    }, [route.params.title])
    
    return (
        <>
            <View>
            <ProductDetails item={itemDetails}/>
            </View>
            <View>
                <AddItemsToCart userId={state.userId} item={itemDetails} />
            </View>
        </>
    )

    
}

export default ProductScreen

