const fs = require('fs');
const DetailsService = require('../../service/detailsService');

class DetailsController {
    getHtmlDetails = (details, indexHtml) => {
        let detailsHtml = ''
        details.map(item => {
            detailsHtml += `
            <tr>
                <th scope="row">${item.ProductName}</th>
                <td><a href="/${item.ProductName}"><img src="${item.Image}"></a></td>
                <td>${item.Price}</td>
                <td style="margin-top: 50px;border-top: red" type="button" class="btn btn-outline-danger">Thêm vào giỏ hàng</td>
            </tr>
            `
        })
        indexHtml = indexHtml.replace('{details}', detailsHtml);
        return indexHtml;
    }
    showDetails = (req, res)=>{
        fs.readFile('./view/home/detail.html','utf-8',async (err, detailsHtml)=>{
            let details = await DetailsService.Details();
            detailsHtml = this.getHtmlDetails(details, detailsHtml);
            res.write(detailsHtml);
            res.end();
        })
    }

}
module.exports = new DetailsController();