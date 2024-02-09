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
app.get('/video-page', (req, res) => {
  // res.sendFile(path.join(baseURL, 'views/video-page.ejs'));
  res.render('video-page'); // ejs template engine default olarak views klasörü içerisine bakar. bu ayar değiştirilebilir.
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  // Create new photo document from Photo Model
  const { title, description, image } = req.body;

  await Photo.create({
    title,
    description,
    image,
  });

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
