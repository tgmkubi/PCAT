const PORT = 3000;
require('dotenv').config();
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const connectDatabase = require('./helpers/database/connectDatabase');
const Photo = require('./models/Photo');
const { getPhotos, getSinglePhoto, addPhoto } = require('./controllers/photo');

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
app.use(fileUpload());

// ROUTES
app.get('/', getPhotos);
app.get('/photos/:id', getSinglePhoto);
app.post('/photos', addPhoto);

app.get('/about', (req, res) => {
  res.render('about'); // ejs template engine default olarak views klasörü içerisine bakar. bu ayar değiştirilebilir.
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
