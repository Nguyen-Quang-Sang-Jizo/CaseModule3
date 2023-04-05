const connection = require('../entity/connection');

class UserService {
    connect;

    constructor() {
        connection.connectToMySQL();
        this.connect = connection.getConnection()
    }

    getUser = (user) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`select * from users where email = '${user.email}' and passwords = '${user.passwords}';`, (err, users) => {
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
            this.connect.query(`insert into users (usename, email, passwords, phone, address, roles) value ('${userRegister.usename}','${userRegister.email}','${userRegister.passwords}',${userRegister.phone}, '${userRegister.address}', '${userRegister.roles}');`,(error, userRegisters) =>{
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
