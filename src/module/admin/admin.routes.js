module.exports = function admin(app) {
    const path = require('path')
    const {adminSignup} = require('./admin.controller')
    const {adminLogin} = require('./admin.controller')
    const {adminProfile} = require('./admin.controller')
    const {logOut} = require('./admin.controller')
    
    const { validate } = require(path.join(process.cwd(), '/src/middlewares/middleware.validate'))
    const { registerSchema } = require(path.join(process.cwd(), '/src/schma/registerShema'))
    

    app.post('/api/admin/signup', validate (registerSchema), adminSignup)
    app.post('/api/admin/login',adminLogin)
    app.get('/api/admin/profile',adminProfile)
    app.post('/api/admin/logout',logOut)
}
