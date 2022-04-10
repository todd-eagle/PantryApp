import payRoute from '../api/route'
import { Alert } from 'react-native'

import {useState, useEffect} from 'react'
import {useStripe} from '@stripe/stripe-react-native'


const usePay = () => {

    const stripe = useStripe() 
    const [key, setKey] = useState('')    
    const [paymentSheet, setpaymentSheet] = useState('')

    useEffect(() => {
        initStripePay()
    }, [])

    const initStripePay = async () => {
        try {
            const response = await payRoute.post('/pay')
            const {clientSecret, ephemeralKey, customer} = await response.data

            console.log('clientSecret----: ', clientSecret)
            setKey(clientSecret)
            const initSheet = await stripe.initPaymentSheet({
                customerId: customer,
                paymentIntentClientSecret: clientSecret,
                customerEphemeralKeySecret: ephemeralKey,
                merchantDisplayName: 'Mobile Pantry',
            })
        } catch (err) {
            Alert.alert('initSheet.error' + initSheet.error.message)
        }
    }
    
    const stripePay = async() => {
        try {
            const presentSheet = await stripe.presentPaymentSheet({
                clientSecret: key,
            })
            console.log('paymentSheet: ', paymentSheet)
            setpaymentSheet(presentSheet)
            presentSheet.error ? console.error('presentSheet.error: ' + presentSheet.error.message) : Alert.alert("Payment complete, thank you!")
           
        } catch (err) {
            console.error(err.message)
        }
    }

    return {stripePay, paymentSheet}
}

export default usePay