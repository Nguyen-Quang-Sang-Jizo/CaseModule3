const fs = require('fs');
const qs = require('qs');
const productService = require('../../service/productService');
class ProductController {
    getHtmlProducts = (home, indexHtml) => {
        let productHtml = ''
        home.map(item => {
            productHtml += `
            <tr>
                <th scope="row">${item.ProductName}</th>
                <td><a href="/detail/${item.Id}"><img style="width: 100px;height: 100px" src="${item.Image}"></a></td>
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
            fs.readFile('./view/product/details.html', 'utf-8', async (err, detailsHtml) => {
                let product = await productService.findById(id);
                console.log(product)
                detailsHtml = detailsHtml.replace('{ProductName}', product.ProductName);
                detailsHtml = detailsHtml.replace('{Price}', product.Price);
                detailsHtml = detailsHtml.replace('{Quantity}', product.Quantity);
                detailsHtml = detailsHtml.replace('{Image}', product.Image);
                detailsHtml = detailsHtml.replace('{Details}', product.Details);
                detailsHtml = detailsHtml.replace('{CategoryName}', product.CategoryName);
                res.write(detailsHtml);
                res.end();
            })
        } else {

        }
    }
    Search = (req, res)=>{
        let data = '';
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', async () => {
            let dataForm = qs.parse(data);
            let param = dataForm.search;
            console.log("param", param)
            let sql = `SELECT * FROM Product WHERE ProductName  like '%${param}%'`;
            console.log("sql", sql)

            let html = await this.getTemplate('./views/search.html');
            let Book =  await this.querySQL(sql);
            let newHTML = '';
            Book.forEach((item, index) => {
                newHTML += `<tr>
                    <th scope="row">${item.ProductName}</th>
                    <td><a href="/detail/${item.Id}"><img style="width: 100px;height: 100px" src="${item.Image}"></a>
                    </td>
                    <td>${item.Price}</td>
                    <td>
                        <button style="margin-top: 26px" className="btn btn-outline-info">Thêm vào giỏ hàng</button>
                    </td>
                </tr>`
            });

            html = html.replace('{search}', newHTML)
            res.write(html)
            res.end();
        })
    }
}

module.exports = new ProductController();