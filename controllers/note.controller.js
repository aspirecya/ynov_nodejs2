const Note = require("../models/notes.model.js");
const fs = require('fs');
var dateFormat = require('dateformat');
var now = new Date();
const mkdirp = require('mkdirp');
mkdirp('logs');

exports.createNote = function(req, res) {
    var note = new Note ({
            noteName: req.body.name,
            note: req.body.note,
        }
    );

    console.log(note);

    note.save((err)=> {
        if(err) {
            console.log('[LOG] Note creation failure, see logs for more infos.');
            console.log(err);
        }  else {
            console.log('[LOG] Note created.');
            console.log(note);
        }

        res.send("Note créée avec succès.");
    })

    mkdirp(`notes/${req.body.name}`, function(err) {
        if(err) {
            console.log('[LOG] Note folder creation failed, see logs for more infos.');
            console.log(err);
        } else {
            console.log(`[LOG] Note ${req.body.name} folder created, see logs for more infos.`);
        }
    });


    var log = "NOTE FOR: " + note.noteName + "\r\n";
    log += "NOTE: " + note.note + "\r\n";

    fs.appendFile("./logs/notes.txt", `${dateFormat(now, "dS mmmm yyyy - h:MM:ss TT")} - NOTE FOR ${note.noteName}\r\n`, (error) => {
        if(error) {
            console.log('[LOG] Note logging failure, see logs for more infos.');
            console.log(error);
        } else {
            console.log("[LOG] Note logged, check /logs/invoices.txt.");
        }
    });

    fs.appendFile(`notes/${req.body.name}/notes.txt`, log, (error) => {
        if(error) {
            console.log('[LOG] Note creation failure, see logs for more infos.');
            console.log(error);
        } else {
            console.log("[LOG] Note created.");
        }
    });
};