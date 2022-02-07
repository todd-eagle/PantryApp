import React, {useContext, useEffect, useState} from 'react'
import { View, Text} from 'react-native'
import useAccounts from '../hooks/useAccounts'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import CheckOutButton from '../components/FormButton'



const CheckoutNavRoutes = ({navigation}) => {

    const {state} = useContext(AuthContext)

    const {checkAddress} = useAccounts()
    const [navRoute, setNavRoute] = useState(null)

    console.log('state: ', state)

    useEffect(() => {
       renderButtonRoute()
    }, [navRoute])
  
    const renderButtonRoute = async () => {
    
        console.log('renderButtonRoute activated/')
        const address = await checkAddress('/account/', state.userId)
        console.log('address: ',JSON.stringify(address))

        if(Object.keys(address)===0){
            setNavRoute('Address')
        } else {
            setNavRoute('Payment')
        }
    }

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
