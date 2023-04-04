const productController = require('./handle/productController')
const userController = require('./handle/userController');
const router = {
    "home" : productController.showHome,
    "edit" : productController.editProduct,
    "" : userController.login
};

module.exports = router
