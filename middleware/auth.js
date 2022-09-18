// 引入 jwt
const jwt = require("jsonwebtoken")
const config = require("../config")

module.exports = function(req, res, next){
    // 前端在请求接口的时候，需要在header,带上我们后端生成的token
    // 1保存数据（token）
    const token = req.header("authorization")
    if (!token) {
        return res.status(401).json({
            code: 400,
            msg:"请先登录"
        })
    }

    try {
        const userData = jwt.verify(token,config.secret)
        req.userData = userData
        console.log(userData,'userData')
        next()
    } catch(err) {
        return res.status(401).json({
            code: 401,
            msg:"请先登录"
        })
    }
}