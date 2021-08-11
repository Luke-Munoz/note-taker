const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT = 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/api/notes', (req, res) => {
    let dataBase = fs.readFileSync('db/db.json');
    dataBase = JSON.parse(dataBase);
    res.json(dataBase);

})

app.post('/api/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };
    let dataBase = fs.readFileSync('db/db.json');
    dataBase = JSON.parse(dataBase);
    dataBase.push(newNote);
    dataBase = JSON.stringify(dataBase);
    fs.writeFileSync('db/db.json', dataBase);
    res.json(dataBase);
});

app.delete("/api/notes/:id", (req, res) => {
    let dataBase = fs.readFileSync('db/db.json');
    dataBase = JSON.parse(dataBase);
    dataBase = dataBase.filter((note) => note.id !== req.params.id)
    console.log(dataBase);
    dataBase = JSON.stringify(dataBase);
    fs.writeFileSync('db/db.json', dataBase);
    res.json(dataBase);
})


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});