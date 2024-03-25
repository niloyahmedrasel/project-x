module.exports.start = function () {
    const app = require('./express')()
    const port = process.env.PORT || 5000

    app.listen(port, function() {
    console.log('listening on port',port)
})
}