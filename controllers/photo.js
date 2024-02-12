const path = require('path');
const fs = require('fs');
const Photo = require('../models/Photo');

const getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const totalPhotoDocument = await Photo.countDocuments();

  const totalPage = Math.ceil(totalPhotoDocument / limit);

  const photos = await Photo.find().sort('-date').skip((page - 1) * limit).limit(limit);

  res.render('index', {
    photos,
    page,
    totalPage,
  });
};

const getSinglePhoto = async (req, res) => {
  const { id } = req.params;

  try {
    let photo = await Photo.findById(id);
    if (!photo) {
      return res.status(404).send('Fotoğraf bulunamadı');
    }

    res.render('photo', {
      photo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Sunucu hatası');
  }
};

const createPhoto = async (req, res) => {
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

const editPhoto = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const photo = await Photo.findById(id);

  photo.title = title;
  photo.description = description;

  await photo.save();

  //res.redirect(`/photos/${req.params.id}`);
  photo.title = res.render('photo', {
    photo,
  });
};

const deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  const photoPath = path.posix.join(__dirname, '..', 'public', photo.image);
  fs.unlinkSync(photoPath);
  await Photo.findByIdAndDelete(photo._id);
  res.redirect('/');
};

module.exports = {
  getAllPhotos,
  getSinglePhoto,
  createPhoto,
  editPhoto,
  deletePhoto,
};
