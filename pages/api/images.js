import dbmanager from '../../include/DBManager'
import url from '../../include/url'

export default (req, res) => {
  var queryParameters = req.body.query;
  dbmanager.queryImages(queryParameters, (images) => {
    res.statusCode = 200
    let urlArr = [];
    images.forEach((image) => {
      urlArr.push(url + "/api/image/" + image.name);
    });
    res.json({images: urlArr})
  })

}
