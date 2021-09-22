# imagrepo 📷
### *react, mongoDB, next.js*
Little web app that allows anyone to upload and delete images.

Link: [imagerepo](http://spaceballcookie.hopto.org:3002)

## Structure
- `pages` contains the next.js app with API routes and react pages. All of the
images are stored on the filesystem of my ubuntu machine which is hosting the website.
The database stores the path to these files instead of storing the files themselves.

 `API routes:`
-[http://spaceballcookie.hopto.org:3002/api/fileUpload](http://spaceballcookie.hopto.org:3002/api/fileUpload) can accept multiple images.
-[http://spaceballcookie.hopto.org:3002/api/images](http://spaceballcookie.hopto.org:3002/api/images) is used for querying. It accepts a JSON query parameter in its body.
-[http://spaceballcookie.hopto.org:3002/api/image/[image] (http://spaceballcookie.hopto.org:3002/api/image/) is used for actually serving the images, where [image] is the uuid that identifies the image.
-[http://spaceballcookie.hopto.org:3002/api/delete](http://spaceballcookie.hopto.org:3002/api/delete) accepts a list of image names in its body and deletes the corresponding images. 

