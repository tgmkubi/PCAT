const Photo = require('../models/Photo');

const getAboutPage = (req, res) => {
  res.render('about'); // ejs template engine default olarak views klasörü içerisine bakar. bu ayar değiştirilebilir.
};

const getAddPhotoPage = (req, res) => {
  res.render('add');
};

const getEditPhotoPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};

module.exports = {
  getAboutPage,
  getAddPhotoPage,
  getEditPhotoPage,
};
