const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gitlab',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=> console.log('MongoDB connected..........'))
.catch(err=>console.log('Refused To connect'));

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.status(200).json({
        msg:'Server is Connected'
    });
});

app.use('/admin/api', require('./routes/admins'));


const PORT = process.env.PORT || 7000;

app.listen(PORT, process.env.IP,() => {
    console.log(`Server started on port ${PORT}`);
});