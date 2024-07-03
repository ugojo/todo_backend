const User = require("../model/authModel")
const jwt = require("jsonwebtoken")

const createToken = (_id)=>{

  return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '2d'})
}
const loginUser = async(req, res)=>{

 const {email, password} = req.body
 
 try {
  
  const user = await User.login(email, password)

  // CREATE TOKEN
  const token = createToken(user._id)

  res.status(200).json({email, token})

} catch (error) {

  return res.status(400).json({ error: error.message })
}

}

async function signupUser(req, res) {

  try {
    const { fullName, email, password } = req.body

    const user = await User.signup(fullName, email, password)

    // CREATE TOKEN
    const token = createToken(user._id)

    res.status(200).json({email, token})

  } catch (error) {

    return res.status(400).json({ error: error.message })
  }

}


module.exports = {
    signupUser,
    loginUser
}