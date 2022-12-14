// 导入配置文件
const config = require("./config")
const cors = require("cors")
const morgan = require("morgan")

const express = require("express")
const app = express()

// 处理中间件
// 处理json的中间件
app.use(express.json())
// 处理跨域
app.use(cors())
// 处理日志
app.use(morgan("dev"))

// 静态资源托管
app.use(express.static("public"))

// 引入数据库
require("./model")
// 引入路由中间件
app.use("/api",require("./routes"))

// 引入错误处理中间键
app.use(require("./middleware/error"))

app.listen(config.app.port,() => [
    console.log(`Running at http://localhost:${config.app.port}`)
])