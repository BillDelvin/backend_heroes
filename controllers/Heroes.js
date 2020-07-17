const heroes = require("../models/Heroes");

module.exports = {
	// create: (req, res, next) => {
	// 	heroes.create(
	// 		{
	// 			name: req.body.name,
	// 			born: req.body.born,
	// 			dead: req.body.dead,
	// 			description: req.body.description,
	// 			establishment: req.body.establishment,
	// 		},
	// 		(err, result) => {
	// 			if (err) {
	// 				next(err);
	// 			} else {
	// 				res.json({ status: "success", data: result });
	// 			}
	// 		},
	// 	);
	// },
	createData: (req, res, next) => {
		heroes
			.create({
				name: req.body.name,
				born: req.body.born,
				dead: req.body.dead,
				description: req.body.description,
				establishment: req.body.establishment,
			})
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	// getAlldata: (req, res, next) => {
	// 	heroes.find({}, (err, result) => {
	// 		if (err) {
	// 			next(err);
	// 		} else {
	// 			res.json({
	// 				status: "success",
	// 				data: result,
	// 			});
	// 		}
	// 	});
	// },
	getData: (req, res, next) => {
		heroes
			.find({})
			.then((result) => {
				res.json({
					status: "success",
					data: result,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	},
	getDataById: (req, res) => {
		heroes
			.findById(req.params.heroesId)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	deleteDataById: (req, res) => {
		heroes
			.findByIdAndRemove(req.params.heroesId)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	editDataById: (req, res) => {
		heroes
			.findByIdAndUpdate(req.params.heroesId, {
				name: req.body.name,
				born: req.body.born,
				dead: req.body.dead,
				description: req.body.description,
				establishment: req.body.establishment,
			})
			.then((result) => res.json(result))
			.catch((err) => res.json(err));
	},
};
