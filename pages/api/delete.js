import dbmanager from '../../include/DBManager'
import baseUrl from '../../include/url'



export default (req, res) => {
  var urls = req.body.urls;
  urls.forEach((url, i) => {
    dbmanager.deleteImage(url.substring((baseUrl+"/api/image/").length));
  });
  res.write('File deleted and moved!');
  res.end();
}