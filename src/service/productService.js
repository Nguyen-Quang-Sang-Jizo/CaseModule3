const connection = require('../entity/connection');

class ProductService {
    connect;

    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection();
    }

    findAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select p.ProductName, p.Image, p.Price
                                from product p;`, (err, product) => {
                if (err){
                    reject(err)
                }else{
                    resolve(product)
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