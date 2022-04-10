import { View, Text, Button } from 'react-native'
import React from 'react'
import usePay from '../hooks/usePay'

const PaymentScreen = ({navigation}) => {

  const {stripePay} = usePay()

  const payNow = () => {
     stripePay()
  }

  return (
    <View>
      <Text>Payment</Text>
      <Button title = "Pay Now" onPress={payNow}/>
    </View>
  )
}

export default PaymentScreen