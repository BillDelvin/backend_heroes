const user = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const privateKey = "privateKey"

module.exports = {
  create: (req, res, next) => {
    user
      .create({
        email: req.body.email,
        password: req.body.password,
      })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err
      })
  },
  authentication: (req, res, next) => {
    user
      .findOne({ email: req.body.email })
      .then((response, err) => {
        console.log(response._id)
        if (err) {
          res.status(400).json({message: "Login Failed"})
        } else {
          if (response != null && bcrypt.compareSync(req.body.password, response.password)) {
            jwt.sign(
              {
                id: response._id,
              },
              privateKey,
              { expiresIn: 60 * 60 },
              (err, token) => {
                res.json(token)
              }
            )
          } else {
            res.json({ status: err })
          }
        }
      })
      .catch((err) => {
        res.status(400).json({message: "Login Failed"})

      })
  },
}
