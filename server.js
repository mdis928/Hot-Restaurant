// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Table Reservation (DATA)
const tableReservation = [
  {
    // routeName: 'reservation',
    name: undefined,
    phoneNumber: undefined,
    email: undefined ,
    uniqueID: undefined,
  },
];

// Routes

// Basic routes that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/make', (req, res) => res.sendFile(path.join(__dirname, 'make.html')));
app.get('/view', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// When I click on view tables button, I see current reservation
app.get('/api/tables', (req, res) => res.json(tableReservation));

// When I click on view tables button, I see Waiting list
app.get('/api/waitlist', (req, res) => res.json(tableReservation));


// Displays a single character, or returns false
app.get('/api/tableReservation/:tableResveration', (req, res) => {
  const chosen = req.params.tableReservation;

  console.log(chosen);

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

  for (let i = 0; i < tableReservation.length; i++) {
    if (chosen === tableReservation[i].routeName) {
      return res.json(tableReservation[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post('/api/tableReservation', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newReservation.routeName = newReservation.name.replace(/\s+/g, '').toLowerCase();
  console.log(newReservation);

  tableReservation.push(newReservation);
  res.json(newReservation);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));