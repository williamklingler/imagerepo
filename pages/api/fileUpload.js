var fs = require('fs');
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import Cors from 'cors'
import dbmanager from '../../include/DBManager'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const config = {  //this is Next.js specific
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    var extension = files.userfile.path.split('.').pop();
    console.log(extension);
    var oldpath = files.userfile.path;
    var unique_id = uuidv4();
    var newpath = '/imagerepoFS/' + unique_id ;
    console.log(newpath)
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      let dataBuffer = fs.readFileSync(newpath);
      dbmanager.addImage(unique_id, newpath, extension);
      res.write('File uploaded and moved!');
      res.end();
    });
  });
}