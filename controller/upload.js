exports.uploadSingleFile =  (req, res, next) => {
    try {
        // console.log(req,'reqq')
        // res.send('ok')
        // let userList = await User.find()
        res.status(200).json({
            code: 200,
            msg: "操作成功",
            data: "http://localhost:3000/" +"upload/" + req.file.originalname
         })
    } catch (err) {
        next(err)
    }
}