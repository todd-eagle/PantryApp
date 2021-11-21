const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = process.env
module.exports = {

    authorize: async(req, res, next) => {
        const {authorization} = req.headers
        const db = req.app.get('db')


        if (!authorization) {
            return res.status(401).send({error: 'You must be logged in.'})
        }

        const token = authorization.replace('Bearer ', '')
        
        jwt.verify(token, JWT_SECRET_KEY, async(err, payload)=>{
            if(err){
                return res.status(401).send({error: 'You must be logged in.'})
            }

            const  user_id  = payload
            const user = await db.accounts.findOne({user_id})
            req.user = user;
            next()
        })
    },
    authorizeApi:  async(req, res, next) => {

    }
}