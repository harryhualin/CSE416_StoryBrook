
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();


//mongodb+srv://CSE416:StoryBrook@cse416.r919d.mongodb.net/CSE416?retryWrites=true&w=majority
mongoose
    .connect('mongodb+srv://harryhualin:Aa83907934+@book-editor.c9yol.mongodb.net/?retryWrites=true&w=majority&appName=book-editor', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

