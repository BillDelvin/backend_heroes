var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
var logger = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const privateKey = "privateKey"
const cors = require("cors")

var indexRouter = require("./routes/index")
const heroesRouter = require("./routes/heroesRouter")
const userRouter = require("./routes/User")

var app = express()
const mongodConnect = process.env.DB_LOCAL
mongoose.connect(mongodConnect, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/user", userRouter)


app.use("/heroes", validateUser, heroesRouter)


// Middleware
function validateUser(req, res, next) {
  const token = req.headers["authorization"]
  jwt.verify(token, privateKey, (err, decoded) => {
    console.log(req.headers)
    if (err) {
      res.status(400).json(err)
      // res.json(err)
      console.log(err)
    } else {
      // req.body.userId = decoded.id
      next()
    }
  })
}

module.exports = app
