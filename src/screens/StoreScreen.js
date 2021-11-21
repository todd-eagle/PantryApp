import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Products from '../components/ProductResults'

const StoreScreen = () => {

    const categories = {
        cat1: 'Meat',
        cat2: 'Produce',
        cat3: 'Seafood'
    }

    return (
        <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.h2}>{categories.cat1}</Text>
                        <Products filter = {categories.cat1}/>
                        <Text style={styles.h2}>{categories.cat2}</Text>
                        <Products filter = {categories.cat2}/>
                        <Text style={styles.h2}>{categories.cat3}</Text>
                        <Products filter = {categories.cat3}/>
                    </ScrollView>
            </View>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>Store Screen</Text>
        // </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
        fontSize: 28
    },
    h2: {
        fontSize: 18
    }
})

export default StoreScreen
