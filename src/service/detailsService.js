const conections = require('../entity/connection');

class DetailsService {
    connect;

    constructor() {
        conections.connectToMySQL();
        this.connect = conections.getConnection();
    }

    Details = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select p.ProductName, p.Image, p.Price, p.Details, c.CategoryName
                                from product p join category c on p.CategoryId = c.Id;`, (err, product) => {
                if (err){
                    reject(err)
                }else{
                    resolve(product)
                }
            })
        })
    }
}
module.exports = new DetailsService();
