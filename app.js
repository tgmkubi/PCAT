const PORT = 3000;
require('dotenv').config();
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const connectDatabase = require('./helpers/database/connectDatabase');
const {
  getAllPhotos,
  getSinglePhoto,
  createPhoto,
  editPhoto,
  deletePhoto,
} = require('./controllers/photo');
const {
  getAboutPage,
  getAddPhotoPage,
  getEditPhotoPage,
} = require('./controllers/page');

const app = express();

// Connect DB
connectDatabase();

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // ejs template engine default olarak views klasörü içerisine bakar

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));

// ROUTES
app.get('/', getAllPhotos);
app.get('/photos/:id', getSinglePhoto);
app.post('/photos', createPhoto);
app.put('/photos/:id', editPhoto);
app.delete('/photos/:id', deletePhoto);

app.get('/about', getAboutPage);
app.get('/add', getAddPhotoPage);
app.get('/photos/edit/:id', getEditPhotoPage);

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
