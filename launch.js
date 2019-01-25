// --------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const express = require('express');
const mongoose = require('mongoose');
const mkdirp = require('mkdirp');
const app = express();

const dbconfig = require('./config/db.config.js');
const Client = require('./models/client.model.js');

const serverPort = 3000;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------- //

mongoose.connect(dbconfig.url, { useNewUrlParser : true },(err) => {
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

Client.find({}, (err, clients) => {
    clients.forEach((client) => {
        mkdirp(`invoice/${client.name}`, function(err) {
            if(err) {
                console.log('[LOG] Client folder creation failed, see logs for more infos.');
                console.log(err);
            } else {
                console.log(`[LOG] Client ${client.name} folder created, see logs for more infos.`);
            }
        });
    });
});