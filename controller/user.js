const User = require('../model/user');

module.exports.getAllUser = (req, res) => {
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	User.find()
		.select(['-_id'])
		.limit(limit)
		.sort({
			id: sort,
		})
		.then((users) => {
			res.json({ users: users });
		})
		.catch((err) => console.log(err));
};

module.exports.getUser = (req, res) => {
	const id = req.params.id;

	User.findOne({
		id,
	})
		.select(['-_id'])
		.then((user) => {
			res.json({ user: user });
		})
		.catch((err) => console.log(err));
};

  module.exports.addUser =  (req, res)  => {
	if (typeof req.body == undefined) {
		res.json({
			status: 'error',
			message: 'data is undefined',
		});
	} else {
		let user1 = new User();
		 User.findOne({ id: req.body.id })
			.then((user) => {
				user1 = user;
		
		if (user1 != null) {
			user1.id = (user1.id==req.body.id && req.body.id!="")? user1.id : req.body.id;
			user1.email = user1.email==req.body.email? user1.email : req.body.email;
			user1.username = user1.username==req.body.username? user1.username : req.body.username;
			user1.password = user1.password==req.body.password? user1.password : req.body.password;
			user1.name.firstname = user1.name.firstname==req.body.name.firstname? user1.name.firstname : req.body.name.firstname;
			user1.address.city = user1.address.city==req.body.address.city? user1.address.city : req.body.address.city;
			user1.address.street = user1.address.street==req.body.address.street? user1.address.street : req.body.address.street;
			user1.address.doornumber = user1.address.doornumber==req.body.address.doornumber? user1.address.doornumber : req.body.address.doornumber;
			user1.address.zipcode = user1.address.zipcode==req.body.address.zipcode? user1.address.zipcode : req.body.address.zipcode;
			user1.address.geolocation.lat = user1.address.geolocation.lat==req.body.address.geolocation.lat? user1.address.geolocation.lat : req.body.address.geolocation.lat;
			user1.address.geolocation.long = user1.address.geolocation.long==req.body.address.geolocation.long? user1.address.geolocation.long : req.body.address.geolocation.long;
			user1.phone = user1.phone==req.body.phone? user1.phone : req.body.phone;
			
			user1.save()
				.then(user => res.json({ user: user }))
				.catch(err => console.log(err))
		}
		else {
			let userCount = 0;
			User.find()
				.countDocuments(function (err, count) {
					userCount = count;
				})
				.then(() => {
					const user = new User({
						id: req.body.id,
						email: req.body.email,
						username: req.body.username,
						password: req.body.password,
						name: {
							firstname: req.body.name.firstname,
							lastname: req.body.name.lastname,
						},
						address: {
							city: req.body.address.city,
							street: req.body.address.street,
							doornumber: req.body.address.doornumber,
							zipcode: req.body.address.zipcode,
							geolocation: {
								lat: req.body.address.geolocation.lat,
								long: req.body.address.geolocation.long,
							},
						},
						phone: req.body.phone,
					});
					user.save()
						.then(user => res.json({ user: user }))
						.catch(err => console.log(err))

					// res.json(user);
				})}
			})
			.catch((e) =>console.log(e));

			//res.json({id:User.find().count()+1,...req.body})
		}
	};

module.exports.editUser =  (req, res) => {
	if (typeof req.body == undefined || req.params.id == null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {
		res.json({
			user: {
				id: parseInt(req.params.id),
				email: req.body.email,
				username: req.body.username,
				password: req.body.password,
				name: {
					firstname: req.body.name.firstname,
					lastname: req.body.name.lastname,
				},
				address: {
					city: req.body.address.city,
					street: req.body.address.street,
					doornumber: req.body.address.doornumber,
					zipcode: req.body.address.zipcode,
					geolocation: {
						lat: req.body.address.geolocation.lat,
						long: req.body.address.geolocation.long,
					},
				},
				phone: req.body.phone,
			}
		});
	}
};

module.exports.deleteUser = (req, res) => {
	if (req.params.id == null) {
		res.json({
			status: 'error',
			message: 'cart id should be provided',
		});
	} else {
		User.findOne({ id: req.params.id })
			.select(['-_id'])
			.then((user) => {
				res.json({ user: user });
			})
			.catch((err) => console.log(err));
	}
};
