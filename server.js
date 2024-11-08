const express = require('express');
const path = require('path');
const app = express();

// Nastavení složky pro statické soubory (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Směrování pro hlavní stránku
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

// Poslouchání na portu 10000
app.listen(10000, () => {
  console.log('Server běží na http://localhost:10000');
});

