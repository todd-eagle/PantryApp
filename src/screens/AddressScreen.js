import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import AddressForm from '../components/AddressForm'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import VirtualizedContainer from '../components/VirtualizedContainer'


const AddressScreen = () => {

    const {state} = useContext(AuthContext)

    return (  
            <VirtualizedContainer>
                <AddressForm 
                    headerText={'Address Information'}
                    buttonName = 'Go to payment'
                    errorMessage={state.errorMessage}
                />
            </VirtualizedContainer>     
    )
}

export default AddressScreen
