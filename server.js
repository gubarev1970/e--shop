const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pro parsování JSON dat
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Statické soubory (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Cesta pro načítání profilu
app.get('/api/profile', (req, res) => {
    // Zde můžete načítat údaje z databáze nebo z localStorage
    // Pro ukázku posíláme statické údaje
    const profile = {
        username: 'operator_18',
        email: 'luisganste@gmail.com',
        birthdate: '1990-01-01',
        education: 'Vysoká škola',
        job: 'Programátor',
        eyeColor: 'Modrá',
        hairColor: 'Hnědá',
        orientation: 'Heterosexuál',
        hobbies: 'Sport, Cestování',
        lookingFor: 'Vztah',
        coins: 90,
        photoUrl: 'path_to_photo.jpg' // Cesta k fotce (pokud je)
    };

    res.json(profile);
});

// Cesta pro uložení profilu
app.post('/api/profile', (req, res) => {
    const profileData = req.body;
    
    // Uložení dat na server, např. do souboru nebo databáze
    // Pro ukázku ukládáme data do souboru JSON
    fs.writeFile('profileData.json', JSON.stringify(profileData, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Chyba při ukládání profilu.' });
        }
        res.status(200).json({ message: 'Profil byl úspěšně uložen.' });
    });
});

// Cesta pro zobrazení profilové fotky
app.get('/uploads/:photo', (req, res) => {
    const photoPath = path.join(__dirname, 'uploads', req.params.photo);
    res.sendFile(photoPath);
});

// Spuštění serveru
app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
