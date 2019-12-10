const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
require('dotenv/config')
const cors = require('cors');

app.use(cors())

//body-parser
app.use(express.json())


//middleware
const userRoute = require('./routes/User');
app.use('/',userRoute)

const postRoute = require('./routes/Posts');
app.use('/posts',postRoute)

const commentRoute = require('./routes/Comments');
app.use('/posts/post',commentRoute)

//db connection
mongoose.connect(process.env.DB_CONNECTION,
                {useNewUrlParser : true},
                () => {console.log('DB Connected !')})

//server port
app.listen(port)