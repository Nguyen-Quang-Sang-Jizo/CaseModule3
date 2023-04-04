const fs = require('fs');
const qs = require('qs')
const userService = require('../../service/userService');
const cookie = require('cookie');


class UserController{
    login = (req, res) =>{
        if(req.method === 'GET'){
            fs.readFile('./view/user/login.html','utf-8',(err, loginHtml)=>{
                res.write(loginHtml);
                res.end()
            })
        }else {
            let data = '';
            req.on('data', chuck =>{
                data += chuck
            })
            req.on('end', async () =>{
                let user = qs.parse(data);
                let account = await userService.getUser(user);
                if(account.length === 0){
                    res.writeHead(301, {'location': '/'});
                    res.end()
                }else {
                    res.setHeader('Set-Cookie', cookie.serialize('user', JSON.stringify(account[0]),{
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7
                    }));
                    res.writeHead(301,{'location': '/home'});
                    res.end()
                }
            })
        }
    }
}

module.exports = new UserController();
