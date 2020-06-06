const express = require('express');
const app = express();
const connectDB = require('./config/db');

// MongoDB Connection
connectDB();

// Body Parser Setup
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: true}));


// Index Route
app.get('/', (req, res) => {
    res.status(200).json({
        msg:'Server is Connected'
    });
});

// Routes
app.use('/admin/api', require('./routes/admins'));


// PORT Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, process.env.IP,() => {
    console.log(`Server started on port ${PORT}`);
});