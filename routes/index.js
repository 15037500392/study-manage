const router = require("express").Router()

// 用户接口
router.use("/user",require("./user"))

// 登录
router.use("/auth",require("./auth"))

// 上传
router.use("/upload", require("./upload"))

module.exports = router