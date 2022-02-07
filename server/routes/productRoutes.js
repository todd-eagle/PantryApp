const fields = ['category', 'type', 'grouping']

module.exports = {
    postProduct: async(req, res) => {
        const db = req.app.get('db')
        const {title, description,
               category, image_url,	upc} = req.body
    try {
            await db.products.insert({title, description,
                                      category, image_url, upc})
            return res.status(200).send("submit successful")                
        } catch (err) {
            return res.status(422).send(err)
        }

    },
    updateProduct: async(req, res) => {
        const db = req.app.get('db')
        try {
            const data = await db.products.update(req.params, req.body)
            return res.status(200).send(data)
        } catch (err) {
            return res.status(422).send(err)
        }
    },
    getProduct: async(req, res) => {
        const db = req.app.get('db')
        try {
            const data = await db.products.findOne(req.params)
            return res.status(200).send(data)
        } catch (err) {
            return res.status(422).send(err)
        }
    },
    getProducts: async(req, res) => {
        const db = req.app.get('db')
        try {
            const data = await db.products.find()
            return res.status(200).send(data)
        } catch (err) {
            return res.status(422).send(err)
        }
    },
    getProductsBy: async(req, res) => {
        const db = req.app.get('db')
        const {term} = req.params
        const fields = {
                            fields: ['category', 'type', 'grouping'],
                            term
                        }
        try {
            const data = await db.products.search(fields)
            return res.status(200).send(data)
        } catch (err) {
            return res.status(422).send(err)
        }
    }

}