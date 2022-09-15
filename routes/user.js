const router = require("express").Router()

// 注册用户
router.post("/user", (req,res,next) =>{
    res.send("注册用户")
})

// 获取所有用户
router.get("/user", (req,res,next) =>{
    res.send("获取所有用户")
})


// 获取指定用户
router.get("/user/:id", (req,res,next) =>{
    res.send("获取指定用户")
})


// 编辑/修改指定用户
router.put("/user/:id", (req,res,next) =>{
    res.send("编辑/修改指定用户")
})


// 删除用户
router.delete("/user/:id", (req,res,next) =>{
    res.send("删除用户")
})

module.exports = router
