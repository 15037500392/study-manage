// 导入配置文件
const config = require('./config')
const cors = require('cors')
const morgan = require('morgan')

const express = require('express')
const app = express()

// 处理中间件
// 处理json的中间件
app.use(express.json())
// 处理跨域
app.use(cors())
// 处理日志
app.use(morgan('dev'))


app.get('/',(req,res) => {
    res.send('ok')
})

app.post('/',(req,res) => {
    console.log(req.body)
    res.send('HELLO')
})

app.listen(config.app.port,() => [
    console.log(`Running at http://localhost:${config.app.port}`)
])