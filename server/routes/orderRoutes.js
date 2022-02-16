module.exports = {
    postToCart: async(req, res) => {
        const db = req.app.get('db')
        try {
            const response = await db.order_items.insert(req.body)
            return res.status(200).send(response)  
        } catch (err) {
            return res.status(422).send(err)            
        }
    },
    updateCart: async(req, res) => {
        const db = req.app.get('db')
        const {quantity} = req.body
        try {
            const data = await db.order_items.update(req.params, req.body)
            return res.status(200).send(data)
        } catch (err) {
            return res.status(422).send(err)        
        }
    },
    deleteFromCart: async(req, res) => {
        const db = req.app.get('db')
        // console.log('req.params: ', req.params)

        try {
            await db.order_items.destroy(req.params)
            return res.status(200).send('product deleted')
        } catch (err) {
            // console.log('deleteFromCart: ', err)
            return res.status(422).send(err)
        }
    },
    retrieveCart: async(req, res) => {
        const db = req.app.get('db')
        console.log('req.params: ', req.params)
        try {
            const data = await db.order_items.find(req.params)
            return res.status(200).send(data)
        } catch (err) {
            return res.status(422).send(err)        
        }
    }
}