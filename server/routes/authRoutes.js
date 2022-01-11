require('dotenv').config()
const RouteErrors = require('../consts/ServerErrors')
// import RouteErrors from '../../consts/ServerErrors'
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = process.env
const {GENERIC, DUPE, SIGNIN} = RouteErrors

module.exports = {
    signup: async(req, res) => {
        const db = req.app.get('db')
        const {user_name, email, password} = req.body
         console.log('authRoute file: ', email, password)
        try{
            const hash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(15))
            const insertUser = await db.accounts.insert({user_name, email, password: hash})
            const token = jwt.sign(insertUser.user_id, JWT_SECRET_KEY)
            res.send({token})
        }catch(err){
            console.log('signup error: ',err)
            const errMsg = err.message.includes(DUPE.emailString) ? DUPE.emailMsg : 
                           err.message.includes(DUPE.userString) ? DUPE.userMsg : GENERIC
            return res.status(422).send(errMsg)
        }    
    },
    signin: async(req, res) => {
        const db = req.app.get('db')
        const {password, email} = req.body
        const user = await db.accounts.findOne({email})

        if(!password || !email){
            return res.status(422).send(SIGNIN.inputMsg)
        }

        if (!user){ 
            return res.status(401).send(SIGNIN.authMsg)
        }else if (bcryptjs.compareSync(password, user.password)){
            const token = jwt.sign(user.user_id, JWT_SECRET_KEY)
            const user_id = user.user_id
            console.log('AuthRoute Token: ', token)
            res.send({ token, user_id })
        } else {
            return res.status(401).send(SIGNIN.authMsg)
        }
    },
    updateDate: async(req, res) => {
        const db = req.app.get('db')
        const {last_login} = req.body
        console.log('last_login: ', req.body)

        try {
            await db.accounts.update(req.params, {last_login})
            return res.status(200).send('Update successful')
        } catch (error) {
            console.log('update error: ', error)
            return res.status(401).send('Update failed')
        }
    }
}