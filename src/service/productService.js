const connection = require('../entity/connection');

class ProductService {
    connect;

    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection();
    }

    findAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from product;`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    findById = (id) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from product where product.id = ${id}`, (err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product[0])
                }
            })
        })
    }
}

module.exports = new ProductService();