const productController = require('./handle/productController')
const userController = require('./handle/userController');
const homeController = require('./handle/homeController')

const router = {
    "home" : homeController.showHome,
    "edit" : productController.editProduct,
    "" : userController.login,
    "register": userController.register,
};

module.exports = router;