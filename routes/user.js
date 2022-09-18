const router = require("express").Router()

//引入 User 模型
const { User, userValidator,updateValidator } = require("../model/user")
const  validator = require("../middleware/validate")

const userController = require("../controller/user")

const auth = require("../middleware/auth")

// 注册用户
router.post("/",validator(userValidator), userController.register)

// 获取所有用户
router.get("/", auth,userController.getUserList)


// 获取指定用户
router.get("/:id",auth, userController.getUserById)


// 编辑/修改指定用户
router.put("/:id", [auth,validator(updateValidator)], userController.updateUser)


// 删除用户
router.delete("/:id", auth, userController.delete)

module.exports = router
