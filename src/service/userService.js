const connection = require('../entity/connection');

class UserService {
    connect;

    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection()
    }

    getUser = (user) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from User where Email = '${user.email}' and Password = '${user.passwords}';`, (err, users) => {
                if (err) {
                    reject(err)
                }else {
                    resolve(users)
                }
            })
        })
    }
    postUser = (userRegister) => {
        return new Promise((resolve, reject) =>{
            this.connect.query(`insert into User (Username, Email, Password, Phone, Address, Roles) values ('${userRegister.username}','${userRegister.email}','${userRegister.password}',${userRegister.phone}, '${userRegister.address}', '${userRegister.roles}');`,(error, userRegisters) =>{
                if (error) {
                    reject(error)
                }else {
                    resolve(userRegisters)
                }
            })
        })
    }
}

module.exports = new UserService();
