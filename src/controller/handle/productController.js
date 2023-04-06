const fs = require('fs')
const productService = require('../../service/productService');
class ProductController {
    getHtmlProducts = (home, indexHtml) => {
        let productHtml = ''
        home.map(item => {
            productHtml += `
            <tr>
                <th scope="row">${item.ProductName}</th>
                <td><a href="/details"><img style="width: 100px;height: 100px" src="${item.Image}"></a></td>
                <td>${item.Price}</td>
                <td><button style="margin-top: 26px" class="btn btn-outline-info">Thêm vào giỏ hàng</button></td>
            </tr>
            `
        })
        indexHtml = indexHtml.replace('{home}', productHtml);
        return indexHtml;
    }
    showHome = (req, res)=>{
        fs.readFile('./view/product/home.html','utf-8',async (err, homeHtml)=>{
            let home = await productService.findAll();
            homeHtml = this.getHtmlProducts(home, homeHtml);
            res.write(homeHtml);
            res.end();
        })
    }

    showDetails = (req, res, id) => {
        if (req.method === 'GET') {
            fs.readFile('./view/product/details.html', 'utf-8', async (err, detailHtml) => {
                let product = await productService.findById(id);
                let detailsHtml = '';
                product.map(item => {
                    detailsHtml += `
                        <h1>${item.ProductName}</h1>
                        <h1>${item.Price}</h1>
                        <h1>${item.Quanytity}</h1>
                        <h1>${item.Image}</h1>
                        <h1>${item.Details}</h1>
                    `
                })
                detailHtml = detailHtml.replace('{details}', detailHtml);
                res.write(detailHtml);
                res.end();
            })
        } else {

        }

    }
}

module.exports = new ProductController();