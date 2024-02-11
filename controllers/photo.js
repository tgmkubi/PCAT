const path = require('path');
const fs = require('fs');
const Photo = require('../models/Photo');

const getPhotos = async (req, res) => {
  const photos = await Photo.find().sort('-date');

  res.render('index', {
    photos: photos,
  });
};

const getSinglePhoto = async (req, res) => {
  const { id } = req.params;

  try {
    let photo = await Photo.findById(id);
    if (!photo) {
      // Fotoğraf bulunamadı
      return res.status(404).send('Fotoğraf bulunamadı');
    }
    // Fotoğraf bulundu, şimdi render işlemi yapabiliriz

    res.render('photo', {
      photo,
    });
  } catch (error) {
    console.log(error);
    // Hata oluştuğunda da uygun şekilde yanıt verin
    return res.status(500).send('Sunucu hatası');
  }
};

const addPhoto = async (req, res) => {
  const uploadDir = path.posix.join(__dirname, '..', 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
    } catch (err) {
      console.error('Klasör oluşturulurken bir hata oluştu:', err);
    }
  }

  const { title, description } = req.body;

  let imageFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  imageFile = req.files.image;

  uploadPath = path.posix.join(
    __dirname,
    '..',
    'public',
    'uploads',
    imageFile.name
  );

  imageFile.mv(uploadPath, async (err) => {
    if (err) return res.status(500).send(err);

    const imagePath = '/uploads/' + imageFile.name;

    await Photo.create({
      title,
      description,
      image: imagePath,
    });

    res.redirect('/');
  });
};

module.exports = {
  getPhotos,
  getSinglePhoto,
  addPhoto,
};
