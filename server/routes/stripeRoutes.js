require('dotenv').config()
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
// const publicKey = require('../data/public.json')

module.exports = {
    pay: async(req, res) => {
        const {amount} = req.body

        const tempParams = {
            name: 'Samuel Severy',
            email: 'notafoundingfather@gmail.com',
            description: 'Pantry Purchase',
            address: {
                city: 'New York',
                country: 'USA',
                line1: '458 British Ct',
                postal_code: '10032',
                state: 'New York'
            }
        }

        try {
            const customer = await stripe.customers.create(tempParams)
            const ephemeralKey = await stripe.ephemeralKeys.create(
                {customer: customer.id},
                {apiVersion: '2020-08-27'}
              )
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 1200,
                currency: "USD",
                customer: customer.id,
                payment_method_types: ['card']
            })
            const clientSecret = paymentIntent.client_secret
            // console.log(clientSecret)
            return res.send(
                {
                    clientSecret: paymentIntent.client_secret,
                    ephemeralKey: ephemeralKey.secret,
                    customer: customer.id
                }
            )
        } catch (err) {
            console.error(err)
            return res.status(500).send("Unable to process payment.  Please try again later.")
        }
    },
    stripe: async(req, res) => {
        const signature = req.headers['stripe-signature']
        let event = null

        try {
            event = await stripe.webhooks.ConstructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOKS_SECRET
            )
        } catch (err) {
            console.error(err)
            return res.status(400).send(err.message)
        }

        // Event when a payment is initiated
        if (event.type === "payment_intent.created") {
            console.log(`${event.data.object.metadata.name} initated payment!`);
            console.log(event.data.object)
        }
        // Event when a payment is succeeded
        if (event.type === "payment_intent.succeeded") {
            console.log(`${event.data.object.metadata.name} succeeded payment!`);
            // fulfilment
        }
    }
    // getKey: async (req, res) => {
    //     const publishableKey = publicKey.publishableKey
    //     // console.log(publishableKey)
    //     res.status(200).send(publishableKey)
    // }
}

