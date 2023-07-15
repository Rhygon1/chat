const mongoose = require('mongoose')
const schema = mongoose.Schema;

const messageSchema = new schema({
    name: String,
    message: String,
})

const message = mongoose.model('Message', messageSchema)

module.exports = message