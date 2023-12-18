const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const port = 3000;

mongoose.connect('mongodb+srv://omgavhane:30113849@cluster0.vvlze8w.mongodb.net/?retryWrites=true&w=majority')
.then(() => { 
    console.log("connected to DB!")
    console.log("Listening on 3000")
})
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1);
});


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
//app.use(cookieParser());


// app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes'));
app.listen(port);