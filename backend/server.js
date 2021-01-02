'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require("cors");

const sequelize = new Sequelize('test', 'username', 'password', {
	dialect: 'mysql',
	host: '127.0.0.1',
	define: {
		timestamps: false
	}
})

const Products = sequelize.define('products', {
	name: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	description: {
		type: Sequelize.STRING(900)
	},
	brand: {
		type: Sequelize.STRING(100)
	},
	image_list: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image_detail: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	stock: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	age_category: {
		type: Sequelize.STRING(100)
	},
	gender_category: {
		type: Sequelize.STRING(100)
	}
})

const Clients = sequelize.define('clients', {
	firstName: {
		type: Sequelize.STRING(200),
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING(200)
	},
	address: {
		type: Sequelize.STRING(500)
	},
	phone: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	email: {
		type: Sequelize.STRING(200),
		allowNull: false
	}
})

const Order = sequelize.define('order', {
	order_date: {
		type: Sequelize.STRING(100)
	}
})

const Order_row = sequelize.define('order_row', {
	quantity: {
		type: Sequelize.INTEGER
	}
})

Clients.hasMany(Order);
Order.hasMany(Order_row);
Products.hasMany(Order_row);

const app = express()
app.use(bodyParser.json())
app.use(express.static('../simple-app/build'))
app.use(cors());

app.get('/create', async(req, res) => {
	try {
		await sequelize.sync({ force: true })
		res.status(201).json({ message: 'created' })
	}
	catch (e) {
		console.warn(e)
		res.status(500).json({ message: 'server error' })
	}
})

app.get('/products', async(req, res) => {
	try {
		let params = {
			where: {},
			order: [
				['price', 'ASC']
			]
		}
		let students = await Products.findAll(params)
		res.status(200).json(students)
	}
	catch (e) {
		console.warn(e)
		res.status(500).json({ message: 'server error' })
	}
})

app.post('/clients', async(req, res) => {
	try {
		let clients = await Clients.findAll({
			where: {
				firstName: req.body.firstName,
				lastName: req.body.lastName
			}
		});
		if (clients.length > 0) {
			res.status(200).json({ message: 'ok' })
		}
		else {
			await Clients.create(req.body)
			res.status(201).json({ message: 'created' })
		}


	}
	catch (e) {
		console.warn(e)
		res.status(500).json({ message: 'server error' })
	}
})

app.post('/order/:firstName/:lastName', async(req, res) => {
	try {
		let clients = await Clients.findAll({ where: { firstName: req.params.firstName, lastName: req.params.lastName } });

		if (clients && clients[0]) {
			let order = req.body
			order.clientId = clients[0].id;
			await Order.create(order)
			res.status(201).json({ message: 'created' })
		}
		else {
			res.status(404).json({ message: 'not found' })
		}
	}
	catch (e) {
		console.warn(e.stack)
		res.status(500).json({ message: 'server error' })
	}
})

app.post('/orderrow/:firstName/:lastName/:productId/:orderDate', async(req, res) => {
	try {
		let clients = await Clients.findAll({ where: { firstName: req.params.firstName, lastName: req.params.lastName } });
		let products = await Products.findAll({ where: { id: req.params.productId } });
		if (clients && clients[0]) {
			let orders = await Order.findAll({ where: { clientId: clients[0].id, order_date: req.params.orderDate } });
			if (orders && orders[0] && products && products[0]) {
				let order_row = req.body
				order_row.orderId = orders[0].id;
				order_row.productId = req.params.productId;
				await Order_row.create(order_row)
				let p1 = products[0];
				let p2 = products[0];
			    p2.stock = 0;
				await p1.update(p2)
				res.status(201).json({ message: p2 })
			}
			else {
				res.status(404).json({ message: 'not found' })
			}
		}
	}
	catch (e) {
		console.warn(e.stack)
		res.status(500).json({ message: 'server error' })
	}
})

app.listen(3001)