const bcrypt = require("bcrypt")
const { User, userValidator } = require("../model/user")
// 注册用户
exports.register = async (req, res, next) => {
    try {
       const { email,name } = req.validValue
       let password = req.validValue.password
       // 1.查询邮箱是否已经被注册过
       let user = await User.findOne({ email })

       // 2.检测是否存在获取到的用户信息
       if (user){
            return res.status(400).json({
                code: 400,
                msg: "邮箱已经被注册了,请重新输入",
                data: { email}
            })
       }
       
       // 加密
       const salt = await bcrypt.genSalt(10);
       password = await bcrypt.hash(password,salt)

       // 创建实例
       user =  new User({
        email,
        password,
        name
       })

       await user.save()

        res.status(200).json({
                code: 200,
                msg: "注册成功",
                data: { email}
        })

    } catch (err) {
        next(err)
    }
}

// 获取所有用户
exports.getUserList = async (req, res, next) => {
    try {
        let userList = await User.find()
        res.status(200).json({
            code: 200,
            msg: "操作成功",
            data: userList
    })
    } catch (err) {
        next(err)
    }
}

// 获取指定用户
exports.getUserById = async (req, res, next) => {
    try {
        console.log(req.params.id,'dd')
        const { id } = req.params
        let user= await User.findById(id)
        if(!user){
            return res.status(400).json({
                code: 400,
                msg: "用户不存在",
                data: null
            })
        }

        res.status(200).json({
            code: 200,
            msg: "操作成功",
            data: user
        })
        
    } catch (err) {
        next(err)
    }
}

// 编辑/修改指定用户
exports.updateUser = async (req, res, next) => {
    try {
        let userId = req.params.id
        let body = req.body
        // 1.查询用户
        const data = await User.findByIdAndUpdate(userId,body)
        if (!data) {
           return  res.status(400).json({
                code: 400,
                msg: "更新用户失败",
                data: null
            })
        }
        res.status(200).json({
            code: 200,
            msg: "操作成功",
            data: data
        })
        next()
    } catch (err) {
        next(err)
    }
}

// 删除用户
exports.delete = async (req, res, next) => {
    try {
        const userId = req.params.id
        const data = await User.findByIdAndDelete(userId)
        if (!data) {
            return  res.status(400).json({
                 code: 400,
                 msg: "删除用户失败",
                 data: {
                    id: userId
                 }
             })
         }
         res.status(200).json({
             code: 200,
             msg: "操作成功",
             data:  {
                id: userId
             }
         })
    } catch (err) {
        next(err)
    }
}