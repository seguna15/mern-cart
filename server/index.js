const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const products = require('./products/products.routes');
const users = require('./users/users.routes');
const payments = require('./payments/payments.routes');
const dbConnection = require('./utils/dbConnect');
//const secretKey = require('./utils/randomStringGen');

const app = express();
dotenv.config();

if (!process.env.PORT || !process.env.MONGOBD_URL)  process.exit(1);

const port = process.env.PORT || 5000;
const apiUrl = process.env.API_URL;
app.use(`${apiUrl}/payments/webhook`, express.raw({ type: '*/*' }));
app.use(express.json());
app.use(cors());

app.use(`${apiUrl}/products`, products);
app.use(`${apiUrl}/auth`, users)
app.use(`${apiUrl}/payments`, payments)

app.get(`${apiUrl}/`, (req, res) => {
    return res.send("Welcome to web shop API....");
});

app.listen(port,async () => {
    console.log(`Server running on http://localhost:${port}`);
    await dbConnection();
    //console.log(secretKey);
})


 