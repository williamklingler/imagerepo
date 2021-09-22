import {Image, mongoose} from './images'


class DBManager{
  addImage(name, filePath, fileType){
    const image = new Image({name: name, filepath: filePath, extension: fileType});
    image.save()
  }

  retrieveImageInfo(name, fn){
    Image.findOne({name: name})
    .exec((err, foundItem) => {
      if (err){
        console.log(err);
      } else {
        fn(foundItem);
      }
    })
  }

  queryImages(queryParameters, fn){
    Image.find(queryParameters)
    .exec((err, foundItems) => {
      if (err){
        console.log(err);
      } else {
        fn(foundItems);
      }
    })
  }
}

let dbmanager = new DBManager();

export default dbmanager;