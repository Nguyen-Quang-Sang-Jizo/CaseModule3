const productController = require('./handle/productController')
const userController = require('./handle/userController');

const router = {
    "home" : productController.showHome,
    "detail" : productController.showDetails,
    "" : userController.login,
    "register": userController.register,
};

module.exports = router;