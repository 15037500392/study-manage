// 引入配置文件
const config = require("../config")

// 引入 jwt
const jwt = require("jsonwebtoken")

const mongoose =  require('mongoose')

// 引入joi
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

// 定义user结构
const userSchema = new mongoose.Schema({
    // 邮箱
    email:{
        type: String,
        require: true,
        minlength: 6,
        maxlength: 30,
        unique: true
    },
    // 用户名
    name:{
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20,
    },
    // 密码
    password:{
        type: String,
        require: true,
        minlength: 6,
        maxlength: 1000,
        select: false
    },
    // 隐藏版本信息
    __v:{
        type: Number,
        select: false
    }

})

// 封装生成token的功能
userSchema.methods.generateToken = function() {
    return jwt.sign({
        _id: this._id
    },
    config.secret,
    { expiresIn: '10d'}
    )
}

// 创建model
const User = mongoose.model("user",userSchema)

// 创建内容检验规则对象
function userValidator(data) {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().min(6).max(30).required().messages({
            "any.required": "缺少必选参数 email",
            "string.email": "email格式错误",
            "string.min": "email最少为6个字符",
            "string.max": "email最多为30个字符"
        }),
        name: Joi.string().min(2).max(20).required().messages({
            "any.required": "缺少必选参数 name",
            "string.base": "name格式错误",
            "string.min": "name最少为2个字符",
            "string.max": "name最多为20个字符"
        }),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,16}$/).required().messages ({
            "any.required": "缺少必选参数 password",
            "string.pattern.base": "password格式错误",
            "string.min": "password最少为6个字符",
            "string.max": "password最多为16个字符"
        }),
        _id: Joi.objectId()
    })

    return schema.validate(data)
}

// 创建内容检验规则对象
function updateValidator(data) {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().min(6).max(30).required().messages({
            "any.required": "缺少必选参数 email",
            "string.email": "email格式错误",
            "string.min": "email最少为6个字符",
            "string.max": "email最多为30个字符"
        }),
        name: Joi.string().min(2).max(20).required().messages({
            "any.required": "缺少必选参数 name",
            "string.base": "name格式错误",
            "string.min": "name最少为2个字符",
            "string.max": "name最多为20个字符"
        })
    })

    return schema.validate(data)
}
// 导出model
module.exports = {
    User,
    userValidator,
    updateValidator
}