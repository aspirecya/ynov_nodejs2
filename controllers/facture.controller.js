const Facture = require('../models/facture.model.js');
const Client = require('../controllers/client.controller.js');
const fs = require('fs');
var dateFormat = require('dateformat');
var now = new Date();
const mkdirp = require('mkdirp');

exports.createFacture = function(req, res) {
    var facture = new Facture ({
            factNum: req.body.num,
            factName: req.body.name,
            factPresta: req.body.presta,
            factHeure: req.body.heure,
            factCout: req.body.cout,
            factTVA: req.body.tva,
            totalHT: req.body.heure * req.body.cout,
            totalTTC: req.body.heure * req.body.cout + ((req.body.heure * req.body.cout) * (req.body.tva / 100))
        }
    );

    console.log(facture);

    facture.save((err)=> {
        if(err) {
            console.log('[LOG] Invoice creation failure, see logs for more infos.');
            console.log(err);
        }  else {
            console.log('[LOG] Invoice created.');
            console.log(facture);
        }

            res.send("Facture créée avec succès.");
    })

    mkdirp(`invoice/${req.body.name}`, function(err) {
        if(err) {
                 console.log('[LOG] Invoice folder creation failed, see logs for more infos.');
                 console.log(err);
        } else {
            console.log(`[LOG] Invoice ${req.body.name} folder created, see logs for more infos.`);
        }
    });


    var log = "FACTURE NB" + facture.factNum + "\r\n";
    log += "NOM: " + facture.factName + "\r\n";
    log += "PRESTATION: " + facture.factPresta + "\r\n";
    log += "HEURES FACTURÉES: " + facture.factHeure + "\r\n";
    log += "COÛT HORAIRE: " + facture.factCout + "\r\n";
    log += "TAUX DE TVA APPLICABLE: " + facture.factTVA + "\r\n";
    log += "TOTAL HT: " + facture.totalHT + "€\r\n";
    log += "TOTAL TTC: " + facture.totalTTC + "€\r\n";

    fs.appendFile("./logs/invoices.txt", `${dateFormat(now, "dS mmmm yyyy - h:MM:ss TT")} - (INVOICE ID ${facture.factNum} FOR ${facture.factName}\r\n`, (error) => {
        if(error) {
            console.log('[LOG] Invoice logging failure, see logs for more infos.');
            console.log(error);
        } else {
            console.log("[LOG] Invoice logged, check /logs/invoices.txt.");
        }
    });

    fs.appendFile(`invoice/${req.body.name}/${req.body.num}.txt`, log, (error) => {
        if(error) {
            console.log('[LOG] Invoice calculation failure, see logs for more infos.');
            console.log(error);
        } else {
            console.log("[LOG] Invoice created.");
        }
    });
};