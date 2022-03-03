import React, {useContext, useEffect, useState, useCallback} from 'react'
import { View, Text} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import useAccounts from '../hooks/useAccounts'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import CheckOutButton from '../components/FormButton'



const CheckoutNavRoutes = ({navigation}) => {

    const {state} = useContext(AuthContext)

    const {checkAddress} = useAccounts()
    const [navRoute, setNavRoute] = useState(null)
    const [isSetAddress, setIsSetAddress] = useState(false)

    console.log('state: ', state)
    console.log('isSetAddress: ', isSetAddress)

    useFocusEffect(
    useCallback(()=> {
        const renderButtonRoute = async () => {

            console.log('renderButtonRoute activated/')
            const address = await checkAddress('/account/', state.userId)
            console.log('address: ',address.city)

            if(!address.city){
                setNavRoute('Address')
                setIsSetAddress(false)
                } else {
                    setNavRoute('Payment')
                    setIsSetAddress(true)
                }
            }
            renderButtonRoute()
        }, [isSetAddress] )
    )

    const renderButton = () =>{
        // const navRoute = renderButton()

         console.log('NavRoute: ', navRoute)
            return (<Text>
            <CheckOutButton
            buttonName = {'Check out'}
            onPress={()=>{navigation.navigate('Tabs', { screen:`${navRoute}`})}}
            />
            </Text>)
       
    }
  
    return (
        <View>
            {renderButton()}
        </View>
        )
};
export default CheckoutNavRoutes;
