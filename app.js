const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// MIDDLEWARES
// Express Static Files Middleware - Absolute path of the directory that you want to serve - independent from my local computer/server
app.use(express.static(path.join(__dirname, 'public')));

// Absolute path of the directory that you want to serve - independent from my local computer/server
const baseURL = path.resolve(__dirname);

// ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(baseURL, 'temp/index.html'));
});
app.get('/video-page', (req, res) => {
  res.sendFile(path.join(baseURL, 'temp/video-page.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(baseURL, 'temp/about.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(baseURL, 'temp/contact.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
