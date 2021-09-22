const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/imagerepo", {});

const imageSchema = {
  name: String,
  filepath: String,
  extension: String,
  date: Number,
  createdAt: Date
};

let Image;

try {
  // Trying to get the existing model to avoid OverwriteModelError
  Image = mongoose.model("Image");
} catch {
  Image = mongoose.model("Image", imageSchema);
}

export {Image, mongoose}