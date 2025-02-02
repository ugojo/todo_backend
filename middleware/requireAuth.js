const jwt = require("jsonwebtoken")
const User = require("../model/authModel")

const requireAuth = async (req, res, next)=>{

    const {authorization} = req.headers

    if (!authorization) {
        
        return res.status(401).json({Error: "User must be Authenticated requires authorization"})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findOne({_id}).select('_id')
        next()

    } catch(error) {
        console.log({'Verify Error':error});
        return res.status(401).json({error: "Request is not authorized"});
    }

}

module.exports = requireAuth