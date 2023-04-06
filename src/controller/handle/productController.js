const fs = require('fs')
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
}

module.exports = new ProductController();