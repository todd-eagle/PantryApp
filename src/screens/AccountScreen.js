import React, {useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../context/reducers/AuthContext'
import useAuth from '../hooks/useAuth'
import SignoutButton from '../components/FormButton'

const AccountScreen = () => {
    const {signout} = useContext(AuthContext)
    const {signOut} = useAuth()

    return (
        <View style={styles.container}>
            <Text  style={styles.text}>Account Profile</Text>
            <SignoutButton 
                buttonName = {'Sign out'}
                onPress={() => signOut()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: 250,
    },
    text: {
        fontSize: 28
    }
})

export default AccountScreen
