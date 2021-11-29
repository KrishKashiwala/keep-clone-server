const mongoose = require('mongoose')
require('dotenv').config()
require('./Model/Note')
const connection = mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log('Database connected!'));
mongoose.connection.on('error', (err: any) => console.log(err));
module.exports = connection;