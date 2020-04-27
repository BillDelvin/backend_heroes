const user = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "privatekey";

module.exports = {
	create: (req, res, next) => {
		user
			.create({
				email: req.body.email,
				password: req.body.password,
			})
			.then((result) => res.json(result))
			.catch((err) => {
				throw err;
			});
	},
	// getUserData: (req, res) => {
	// 	user
	// 		.find({})
	// 		.then((response) => {
	// 			res.json(response);
	// 		})
	// 		.catch((err) => {
	// 			res.json(err);
	// 		});
	// },
	// getUserDataById: (req, res) => {
	// 	user
	// 		.findById(req.params.userId)
	// 		.then((response) => {
	// 			res.json(response);
	// 		})
	// 		.catch((err) => {
	// 			res.json(err);
	// 		});
	// },
	authentication: (req, res, next) => {
		user
			.findOne({ email: req.body.email })
			.then((response, err) => {
				// console.log(response);
				if (err) {
					next(err);
				} else {
					if (response != null && bcrypt.compareSync(req.body.password, response.password)) {
						jwt.sign(
							{
								id: response._id,
							},
							privateKey,
							{ expiresIn: "10h" },
							(err, token) => {
								res.json(token);
							},
						);
					} else {
						res.json({ status: err });
					}
				}
			})
			.catch((err) => {
				throw err;
			});
	},
};
