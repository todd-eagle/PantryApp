import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from '@react-navigation/compat'
import useProductList from '../hooks/useProductList'

const ProductResults = ({filter, navigation}) => {
    
    const {list} = useProductList()

    const products = list.filter(el=>el.category == filter)

    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={products}
                keyExtractor = {products => `${products.prod_id}`}
                renderItem = {({item}) => {
                    return(
                        <TouchableOpacity onPress={()=>navigation.navigate('Tabs', { screen: 'Product', params:{ screen: 'Product', params:{item,  title: item.title, quantity: true}}})}>
                            <View style={styles.productsContainer}>    
                                <View style={styles.imageContainer}> 
                                    <Image style = {styles.image} source= {{uri: item.image_url}} />        
                                </View>
                                <Text>{item.title}</Text>
                            </View>
                        </TouchableOpacity>    
                    )
                }}
            />  
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 160,
        width: 160
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

export default withNavigation(ProductResults)
