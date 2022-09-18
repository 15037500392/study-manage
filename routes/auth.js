const router = require("express").Router()
const validator = require("../middleware/validate")
const authController = require("../controller/auth") 
const { userValidator } = require("../model/user")

router.post("/", validator(userValidator), authController.login)

module.exports = router