const {object,ref,string} = require('yup')

const fields = {
    email:string()
    .max(100,'this field must be at most 100 characters long')
    .required('this field is required'),

    pass:string()
    .min(8, "this field must be at least 8 characters long")
    .required('this field is required'),

    confirmPass:string()
    .oneOf([ref("pass"),null],"pass must match")
    .required('this field is required'),
}


const registerSchema = object().shape(fields)
module.exports.registerSchema = registerSchema