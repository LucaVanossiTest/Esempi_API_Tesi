const express = require('express');
const app = express();

app.use(express.json()); 

// Dati in memoria per i film
let films = [
  { id: 1, titolo: "2001: Odissea nello spazio", regista: "Stanley Kubrick", anno: 1968 },
  { id: 2, titolo: "Avatar", regista: "James Cameron", anno: 2009 },
  { id: 3, titolo: "Pulp Fiction", regista: "Quentin Tarantino", anno: 1994 }
];

// Endpoint per ottenere tutti i film
app.get('/api/films', (req, res) => {
  res.json(films);
});

//Risposta json a GET/api/films
[
    {"id": 1, "titolo": "2001: Odissea nello spazio", "regista": "Stanley Kubrick", "anno": 1968},
    {"id": 2, "titolo": "Avatar", "regista": "James Cameron", "anno": 2009},
    {"id": 3, "titolo": "Pulp Fiction", "regista": "Quentin Tarantino", "anno": 1994}
]

// Endpoint per ottenere un singolo film
app.get('/api/films/:id', (req, res) => {
  const film = films.find(m => m.id === parseInt(req.params.id));
  if (!film) return res.status(404).send('film non trovato');
  res.json(film);
});

//Risposta json a GET/api/films/{id=1}
[
    {"id": 1, "titolo": "2001: Odissea nello spazio", "regista": "Stanley Kubrick", "anno": 1968}
]

// Endpoint per creare un nuovo film
app.post('/api/films', (req, res) => {
  const { titolo, regista, anno } = req.body;
  const nuovoFilm = {
    id: films.length + 1,
    titolo,
    regista,
    anno
  };
  films.push(nuovoFilm);
  res.status(201).json(nuovoFilm);
});

//Richiesta json a POST/api/films
[
    {
      "titolo": "Quei bravi ragazzi",
      "regista": "Martin Scorsese",
      "anno": 1990
    }
]
//Risposta json
[
    {"id": 4, "titolo": "Quei bravi ragazzi", "regista": "Martin Scorsese", "anno": 1990}
]

// Endpoint per aggiornare un film esistente
app.put('/api/films/:id', (req, res) => {
  const film = films.find(m => m.id === parseInt(req.params.id));
  if (!film) return res.status(404).send('film non trovato');

  const { titolo, regista, anno } = req.body;
  film.titolo = titolo;
  film.regista = regista;
  film.anno = anno;

  res.json(film);
});

//Richiesta json a PUT/api/films/{id=4}
[
    {
        "titolo": "Taxi Driver",
        "regista": "Martin Scorsese",
        "anno": 1976
      }
]
//Risposta json
[
    {"id": 4, "titolo": "Taxi Driver", "regista": "Martin Scorsese", "anno": 1976}
]

// Endpoint per eliminare un film
app.delete('/api/films/:id', (req, res) => {
  const filmIndex = films.findIndex(m => m.id === parseInt(req.params.id));
  if (filmIndex === -1) return res.status(404).send('film non trovato');

  films.splice(filmIndex, 1);
  res.json({ message: 'film eliminato correttamente' });
});

//Risposta json a DELETE/api/films/{id=4}
[
    {"message": "film eliminato correttamente"}
]

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Il Server è attivo sulla porta ${PORT}`);
});
