const productController = require('./handle/productController')
const userController = require('./handle/userController');
const homeController = require('./handle/homeController')
const detailsController = require('./handle/detailsController')

const router = {
    "home" : homeController.showHome,
    "edit" : productController.editProduct,
    "" : userController.login,
    "register": userController.register,
    "1": detailsController.showDetails
};

module.exports = router;