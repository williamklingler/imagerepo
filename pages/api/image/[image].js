import dbmanager from "../../../include/DBManager"
import fs from 'fs'

export default (req, res) => {
  let fileName = req.query.image;
  dbmanager.retrieveImageInfo(fileName, (imageInfo) => {
    const imageBuffer = fs.readFileSync(imageInfo.filepath);
    res.setHeader('Content-Type', 'image/' + imageInfo.extension)
    res.send(imageBuffer);
  });
}