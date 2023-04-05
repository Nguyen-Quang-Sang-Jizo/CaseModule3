const fs = require('fs');
const homeService = require('../../service/homeService');

class HomeController {
    getHtmlProducts = (home, indexHtml) => {
        let productHtml = ''
        home.map(item => {
            productHtml += `
            <tr >
                <th scope="row">${item.productName}</th>
                <td><a href="/${item.productName}"><img src="${item.image}"></a></td>
                <td>${item.price}</td>
                <td style="margin-top: 50px;border-top: red" type="button" class="btn btn-outline-danger">Thêm vào giỏ hàng</td>
            </tr>
            `
        })
        indexHtml = indexHtml.replace('{home}', productHtml);
        return indexHtml;
    }
    showHome = (req, res)=>{
        fs.readFile('./view/home/home.html','utf-8',async (err, homeHtml)=>{
            let home = await homeService.findAll();
            homeHtml = this.getHtmlProducts(home, homeHtml);
            res.write(homeHtml);
            res.end();
        })
    }

}
module.exports = new HomeController();