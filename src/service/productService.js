const connection = require('../entity/connection');

class ProductService {
    connect;

    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection();
    }

    findAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select p.*, c.categry from product p  join category c on p.categoryId = c.id`, (err, products) => {
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
            this.connect.query(`select p.*, c.name_category
                                from products p
                                         join categories c on p.id_category = c.id where p.id = ${id}`, (err, product) => {
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