// --------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const express = require('express');
const mongoose = require('mongoose');
const mkdirp = require('mkdirp');
const bodyParser = require('body-parser');

const app = express();

const dbconfig = require('./config/db.config.js');
const Client = require('./models/client.model.js');
const clientController = require('./controllers/client.controller.js');
const factureController = require('./controllers/facture.controller.js');
const noteController = require('./controllers/note.controller.js');

const serverPort = 3000;

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// --------------------------------------------------------------------------------------------------------------------------------------------------------------- //

mongoose.connect(dbconfig.url, { useNewUrlParser : true }, (err) => {
    if(err) {
        console.log('[LOG] Database connection failure, see logs for more infos.');
        console.log(err);
    } else {
        console.log('[LOG] Database connection successful.');
    }
});

// server init
app.listen(serverPort, () => {
    console.log(`[LOG] Server listening on port ${serverPort}.`);
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// routes
app.get('/', (req, res) => {
    res.send(`Bienvenue sur votre API de gestion.`);
});

app.get('/createclient', function (req, res) {
    res.sendFile(__dirname + '/views/createClient.html');
});

app.get('/createfacture', function (req, res) {
    res.sendFile(__dirname + '/views/createInvoice.html');
});

app.get('/createnote', function (req, res) {
    res.sendFile(__dirname + '/views/createNote.html');
});

// app.get('/api/products', clientController.getClients);
app.post('/api/client/create', clientController.createClient);
app.post('/api/invoice/create', factureController.createFacture);
app.post('/api/notes/create', noteController.createNote);
app.get('/api/client', clientController.getClient);
app.get('/api/client/:id', clientController.getClientById);
app.put('/api/client/update/:id', clientController.updateClient)
app.get('/api/client/delete/:id', clientController.deleteClient);



// --------------------------------------------------------------------------------------------------------------------------------------------------------------- //
//
// Client.find({}, (err, clients) => {
//     clients.forEach((client) => {
//         mkdirp(`invoice/${client.name}`, function(err) {
//             if(err) {
//                 console.log('[LOG] Client folder creation failed, see logs for more infos.');
//                 console.log(err);
//             } else {
//                 console.log(`[LOG] Client ${client.name} folder created, see logs for more infos.`);
//             }
//         });
//     });
// });
//
// --------------------------------------------------------------------------------------------------------------------------------------------------------------- //