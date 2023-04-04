const fs = require('fs')
const productService = require('../../service/productService');
const categoryService = require('../../service/categoryService');
const cookie = require('cookie');
class ProductController {
    getHtmlProducts = (products, indexHtml) => {
        let productHtml = ''
        products.map(item => {
            productHtml += `
            <tr>
                <th scope="row">${item.id}</th>
                <td>${item.productName}</td>
                <td>${item.price}</td>
                <td>${item.name_category}</td>
                <td><a type="button" class="btn btn-outline-secondary" href="/edit/1">Sửa</a></td>
                <td><a type="button" class="btn btn-outline-danger">Xóa</a></td>
            </tr>
            `
        })
        indexHtml = indexHtml.replace('{products}', productHtml);
        return indexHtml;
    }
    showHome = (req, res) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        if(cookies.user) {
            let user = JSON.parse(cookies.user);
            fs.readFile('./view/index.html', 'utf-8', async (err, indexHtml) => {
                let products = await productService.findAll();
                indexHtml = this.getHtmlProducts(products, indexHtml);
                res.write(indexHtml);
                res.end();
            })
        } else {
            res.writeHead(301, {location: '/'});
            res.end();
        }
    }
    editProduct = (req, res, id) => {
        if (req.method === 'GET') {
            fs.readFile('./view/product/edit.html', 'utf-8', async (err, editHtml) => {
                let product = await productService.findById(id);
                let categories = await categoryService.findAll();
                console.log(categories)
                editHtml = editHtml.replace('{name}', product.name_product);
                editHtml = editHtml.replace('{price}', product.price);
                editHtml = editHtml.replace('{description}', product.description)
                let htmlCategory = '';
                categories.map(item => {
                    htmlCategory += `<option value="${item.id}">${item.name_category}</option>`
                })
                editHtml = editHtml.replace('{categories}', htmlCategory);
                res.write(editHtml);
                res.end();
            })
        } else {

        }
    }
}

module.exports = new ProductController();
