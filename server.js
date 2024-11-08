const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Nastavení middleware pro parsování těla žádosti
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nastavení pro statické soubory (pokud používáte HTML, CSS, obrázky)
app.use(express.static(path.join(__dirname, 'public')));

// Nastavení úložiště pro nahrávání souborů
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Kořenová cesta pro zobrazení úvodní stránky nebo jiných souborů
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Cesta pro nahrání fotografie
app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.send('Fotka byla úspěšně nahrána!');
    } else {
        res.send('Chyba při nahrávání fotografie.');
    }
});

// Spuštění serveru
app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
