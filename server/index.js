// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// CREATE OUR SERVER
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express()

/* Access-Control-Allow-Origin: * */
app.use(cors({

    origin: ["http://localhost:3000","https://storybrook.netlify.app"],        //http://localhost:3000

    credentials: true
}))


// SETUP THE MIDDLEWARE
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const storybrookRouter = require('./routes/storybrook-router')

app.use('/api', storybrookRouter)


// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Heroku Dep
// if (process.env.NODE_ENV === 'production') 
//     {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => { 
//         res.sendFile('/app/client/build/index.html');
//         })
//     }


app.get('/', function getHello(req, res, next) {
    res.send('Hello World!');
});

