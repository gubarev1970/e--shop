const express = require('express');
const path = require('path');
const app = express();

// Nastavení statických souborů
app.use(express.static(path.join(__dirname, 'public')));

// Směrování na index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(10000, () => {
    console.log('Server běží na http://localhost:10000');
});
