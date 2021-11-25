require('dotenv').config()
const express = require('express')
const massive = require('massive')
const authRoutes = require('./routes/authRoutes')
const producthRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const requireAuth = require('./middleware/requireAuth')


const {SERVER_PORT, CONNECTION_STRING} = process.env

const app = express()

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
app.delete('/cart/:user_id', orderRoutes.deleteFromCart)