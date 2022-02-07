module.exports = {
    insertAddress: async(req, res) => {
        const db = req.app.get('db')

        try {
            const response = await db.addresses.insert(req.body)
            return res.status(200).send(response)
        } catch (err) {
            return res.status(422).send(err)
        }
    },
    updateAddress: async(req, res) => {
        const db = req.app.get('db')
     
        try {
            const response = await db.addresses.update(req.params, req.body)
            return res.status(200).send(response)            
        } catch (err) {
            return res.status(422).send(err)  
        }
    },
    findAddress: async(req, res) => {
        const db = req.app.get('db')
        
        try {
            const response = await db.addresses.findOne(req.params)
            return res.status(200).send(response)
        } catch (err) {
            return res.status(422).send(err)
        }
    }
}