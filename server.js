const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.json());

app.use('/api', routes);

const PORT = 3000;


app.listen(PORT, ()=>{
    console.log(`server is on on port ${PORT}`);
});

module.exports = app;