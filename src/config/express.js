const express = require('express')
const admin = require('../module/admin/admin.routes')
const cookieParser = require('cookie-parser')

module.exports = function() {
    const app = express()
    app.use(express.json())
    app.use(cookieParser('cookie-secret'))
    admin(app)

    return app;
}
