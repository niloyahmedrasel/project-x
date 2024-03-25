const Admin = require('./admin.model')
const jwt = require('jsonwebtoken')
const  adminSignup = async(req,res) => {
    
    const { email, pass, confirmPass } = req.body
    const admin = {
       email,
       pass

    }
    if(confirmPass === pass) {
        const createdAdmin = await Admin.create(admin)
        res.status(201).send(createdAdmin)
    }
    else {
        res.send('Pass must match')
    }
}

const adminLogin = async(req,res) =>{
    try{
        const {email,pass} =req.body
        const user = {
            email,
            pass
        }
    
        const admin = await Admin.findOne({
            where:{
                email:user.email,
                pass:user.pass
            }
        })
    
        if(admin)
        {
            

            const accessToken = jwt.sign({id:admin.id},'jwt-secret',{
                expiresIn:'1hr',
                issuer:admin.id.toString()
            })

            res.cookie('access_token',accessToken,{
                httpOnly: true,
                signed:true
            })
            res.send(admin)

        }
        else {
            res.send('invalid credentials')
        }
    }

    catch(err) {
        res.send('Internal server error')
    }
}

async function adminProfile(req, res) {
    try {
        const token = req.signedCookies['access_token']

        if(!token) {
           return res.send('bad request')
         }
        
        const payload = jwt.verify(token,'jwt-secret')
        const {id} = payload
    
        const admin = await Admin.findOne({
            where: {
                id: id,
            }
        })
    
        if (admin) {
            res.send(admin)
        }
        else {
            res.send('user not found')
        }
    }
    catch(err) {
        res.send(err)
    }
}
function logOut(req, res) {
    res.clearCookie('access_token')
    res.send('log out')
}

module.exports.adminSignup = adminSignup
module.exports.adminLogin = adminLogin
module.exports.adminProfile = adminProfile
module.exports.logOut = logOut