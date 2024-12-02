require('dotenv').config();

const express = require('express');
const app = express();
require('./connections/dbConnections');
const port = process.env.PORT;

app.use(express.json());
app.use('/', require('./routes/index'));


app.all('*', (req, res) => {
    res.status(404).send({ status: 404, message: 'Requested route does not exist' });
});


app.listen(port, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log('Server is up and running on port ' + port);
});