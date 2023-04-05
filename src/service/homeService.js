const conection = require('../entity/connection');

class HomeService {
    connect;

    constructor() {
        conection.connectToMySQL();
        this.connect = conection.getConnection();
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
    /* findById = (id) =>{
         return new Promise((resolve,reject)=>{
             this.connect.query(`select * from product where product.id= ${id};`,(err, product)=>{
                 if (err){
                     reject(err)
                 }else{
                     resolve(product[0])
                 }
             })
         })
     }
 */
}
 module.exports = new HomeService()
