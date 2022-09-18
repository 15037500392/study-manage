module.exports = {
    app: {
        port: process.env.PORT || 3000
    },

    // 数据库配置
    db:{
        url: process.env.MONGODB_URL || "mongodb://localhost:27017/zxx"
    },

    // jwt 密钥
    secret: "d5df8f5d-5dd4-4e70-8763-33877c953298"
}