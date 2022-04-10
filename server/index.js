require('dotenv').config()
const express = require('express')
const massive = require('massive')
const cors = require("cors")
const authRoutes = require('./routes/authRoutes')
const producthRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const accountRoutes = require('./routes/accountRoutes')
const stripeRoutes = require('./routes/stripeRoutes')

const requireAuth = require('./middleware/requireAuth')


const {SERVER_PORT, CONNECTION_STRING, STRIPE_SECURITY_KEY} = process.env

const app = express()

app.use(cors())
app.use(express.json())

massive({
    connectionString: CONNECTION_STRING
}).then( db => {
    app.set('db', db)
    console.log('Connected to db')
    app.listen( SERVER_PORT, () => console.log(`Connected to port ${SERVER_PORT}`))
}).catch(err=>console.log(err))

//apis
app.post('/signup', authRoutes.signup)
app.post('/signin', authRoutes.signin)
app.put ('/signin/:user_id', authRoutes.updateDate)

app.post('/product', producthRoutes.postProduct)
app.put('/product/:prod_id', producthRoutes.updateProduct)
app.get('/product/:prod_id', producthRoutes.getProduct)
app.get('/products/', producthRoutes.getProducts)
app.get('/products/:term', producthRoutes.getProductsBy)

app.post('/cart/', orderRoutes.postToCart)
app.put('/cart/:id', orderRoutes.updateCart)
app.delete('/cart/:id', orderRoutes.deleteFromCart)
app.get('/cart/:user_id', orderRoutes.retrieveCart)

app.post('/account', accountRoutes.insertAddress)
app.put('/account/:user_id', accountRoutes.updateAddress)
app.get('/account/:user_id', accountRoutes.findAddress)

app.post('/pay', stripeRoutes.pay)
// app.get('/publishableKey', stripeRoutes.getKey)