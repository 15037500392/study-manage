const bcrypt = require("bcrypt")
// 引入用户模块
const { User } = require("../model/user")
exports.login = async (req, res, next) => {
    try {
        // 获取到校验后的数据
        const validValue = req.validValue

        // 1.检测用户是否存在
        let user = await User.findOne({ email: validValue.email}).select("+password")
        console.log(user,'user')
        // 2. 如果用户不存在,那就直接返回失败的响应
        if (!user) {
            return res.status(400).json({
                code: 400,
                mag: "用户名或者密码错误",
                data: null
            })
        }
      
       let compareResult =  await bcrypt.compare(validValue.password,user.password)
        if(!compareResult){
            return res.status(400).json({
                code: 400,
                mag: "用户名或者密码错误",
                data: null
            })
        }
        
        res.status(200).json({
            code: 200,
            mag: "登录成功",
            data: {
                token: user.generateToken()
            }
        })
    } catch (err) {
        next(err)
    }
}