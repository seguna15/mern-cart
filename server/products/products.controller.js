const products = require('./products.model');

const getProducts = (req, res) => {
    return res.status(200).send(products);
}

module.exports = {
    getProducts,
}