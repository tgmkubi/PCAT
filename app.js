const PORT = 3000;
require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDatabase = require('./helpers/database/connectDatabase');
const Photo = require('./models/Photo');

const app = express();

// Connect DB
connectDatabase();

const baseURL = path.resolve(__dirname);

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // ejs template engine default olarak views klasörü içerisine bakar

// MIDDLEWARES
// Express Static Files Middleware - Absolute path of the directory that you want to serve - independent from my local computer/server
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find();

  res.render('index', {
    photos: photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let photo = await Photo.findById(id);
    if (!photo) {
      // Fotoğraf bulunamadı
      return res.status(404).send('Fotoğraf bulunamadı');
    }
    // Fotoğraf bulundu, şimdi render işlemi yapabiliriz
    res.render('photo', {
      photo
    });
  } catch (error) {
    console.log(error);
    // Hata oluştuğunda da uygun şekilde yanıt verin
    return res.status(500).send('Sunucu hatası');
  }
});

// Create new photo document from Photo Model
app.post('/photos', async (req, res) => {
  const { title, description, image } = req.body;

  await Photo.create({
    title,
    description,
    image,
  });

  res.redirect('/');
});

app.get('/about', (req, res) => {
  res.render('about'); // ejs template engine default olarak views klasörü içerisine bakar. bu ayar değiştirilebilir.
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
