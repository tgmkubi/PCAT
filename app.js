const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // ejs template engine default olarak views klasörü içerisine bakar

// MIDDLEWARES
// Express Static Files Middleware - Absolute path of the directory that you want to serve - independent from my local computer/server
app.use(express.static(path.join(__dirname, 'public')));
const baseURL = path.resolve(__dirname);

// ROUTES
app.get('/', (req, res) => {
  // res.sendFile(path.join(baseURL, 'views/index.ejs'));
  res.render("index"); // ejs template engine default olarak views klasörü içerisine bakar. bu ayar değiştirilebilir.
});
app.get('/video-page', (req, res) => {
  res.render("video-page");
});
app.get('/about', (req, res) => {
  res.render("about");
});
app.get('/add', (req, res) => {
  res.render("add");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
