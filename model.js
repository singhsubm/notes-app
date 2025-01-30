require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI)

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
})

module.exports = mongoose.model('Note', NoteSchema)