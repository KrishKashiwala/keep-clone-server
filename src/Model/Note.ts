const mon = require('mongoose')
const noteSchema = new mon.Schema({
	title: String,
	des: String
})
module.exports = mon.model('notedata', noteSchema)