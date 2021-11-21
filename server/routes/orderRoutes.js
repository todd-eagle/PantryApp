module.exports = {
    postToCart: async(req, res) => {
        const db = req.app.get('db')
        const {user_id, prod_id, 
               quantity, title} = req.body

        try {
            await db.order_items.insert({user_id, prod_id, 
                                         quantity, title})
            return res.status(200).send("insert successful")  
        } catch (err) {
            return res.status(422).send(err)            
        }
    },
    updateCart: async(req, res) => {
        const db = req.app.get('db')
        try {
            const data = await db.order_items.update(req.params, req.body)
            return res.status(200).send(data)
        } catch (err) {
            return res.status(422).send(err)        
        }
    },
    deleteFromCart: async(req, res) => {
        const db = req.app.get('db')
        try {
            await db.order_items.destroy(req.params)
            return res.status.status(200).send('product deleted')
        } catch (err) {
            return res.status(422).send(err)
        }
    }
}