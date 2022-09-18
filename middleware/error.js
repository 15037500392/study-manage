module.exports = (err, req, res,next) => {
    res.status(500).json({
        code: 500,
        msg: "服务器错误！"
    })

    // 在服务端输出错误消息
    console.log(err)
}