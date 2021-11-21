import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

const ProductDetails = ({item}) => {
    return (
        <View>
            <Text>{item.title}</Text> 
            <View style = {styles.imageContainer}>
                <Image style = {styles.image} source= {{uri: item.image_url}} />
            </View>
            <Text>Description:</Text>
            <Text>{item.description}</Text>
        </View>    
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        height: 200,
        width: 200
    },
    productsContainer: {
        width: 160,
        marginHorizontal : 10
    },
    textContainer: {
        width: 185,
        fontSize: 14
    },
    h2: {
        fontSize: 18
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        alignItems: 'center'
    }
})
export default ProductDetails
