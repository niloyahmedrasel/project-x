module.exports.validate = function validate (schema) {
    return async function registerSchema (req,res,next) {

        try {
            await schema.validate( req.body, {abortEarly:false});
            next()
        }
        catch (err) {
            const errors = []
            err.inner.forEach(e =>{
                errors.push({path:e.path, message:e.message})
            } )
            res.send(errors)
        }
    }
}