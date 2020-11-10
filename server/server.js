const express = require('express');
const uuid = require('uuid');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

let players = [];
let winners = [];
let currentPlayers = [];
let randomNumber = 0;

app.get('/', (req, res) => {
  try {
    startGame();
    console.log(randomNumber);
    res.status(200).json(currentPlayers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

app.post('/', (req, res) => {
  try {
    const { playerId, number } = req.body;
    const result = checkGuessedNumber(playerId, number);
    res.status(200).json({ guess: result });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

function checkGuessedNumber(playerId, number) {
  let result = '';
  const num = parseInt(number);

  if (isNaN(num) || num < 0 || num > 100) {
    throw new Error('Please enter a valid number.');
  }

  if (!playerId || !currentPlayers.find((player) => player === playerId)) {
    throw new Error('Unknown players are not allowed!');
  }

  if (num > randomNumber) {
    result = 'lower';
  } else if (num < randomNumber) {
    result = 'higher';
  } else if (num === randomNumber) {
    result = 'Bingo!!!';
    clearGame(playerId);
  }
  return result;
}

function startGame() {
  randomNumber = Math.floor(Math.random() * 101);

  if (currentPlayers.length > 0) {
    currentPlayers = [];
  }

  for (let i = 0; i < 3; i++) {
    currentPlayers.push(uuid.v4());
  }
  players = players.concat(currentPlayers);
}

function clearGame(playerId) {
  winners.push(playerId);
  currentPlayers = [];
}

app.listen(port);

console.log('Server started on: ' + port);
