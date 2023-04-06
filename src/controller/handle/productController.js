const fs = require('fs')
const productService = require('../../service/productService');
const categoryService = require('../../service/categoryService');
class ProductController {
    getHtmlProducts = (home, indexHtml) => {
        let productHtml = ''
        home.map(item => {
            productHtml += `
            <tr>
                <th scope="row">${item.ProductName}</th>
                <td><a href="/${item.ProductName}"><img style="width: 100px;height: 100px" src="${item.Image}"></a></td>
                <td>${item.Price}</td>
                <td><button style="margin-top: 50px" class="btn btn-outline-info">Thêm vào giỏ hàng</button></td>
            </tr>
            `
        })
        indexHtml = indexHtml.replace('{home}', productHtml);
        return indexHtml;
    }
    showHome = (req, res)=>{
        fs.readFile('./view/home/home.html','utf-8',async (err, homeHtml)=>{
            let home = await productService.findAll();
            homeHtml = this.getHtmlProducts(home, homeHtml);
            res.write(homeHtml);
            res.end();
        })
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