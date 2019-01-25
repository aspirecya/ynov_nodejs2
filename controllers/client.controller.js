const Client = require('../models/client.model.js');

exports.createClient = function(req, res) {
    var client = new Client ({
            nom: req.body.nom,
            adresse: req.body.adresse,
            cp: req.body.cp,
            ville: req.body.ville,
            referentId: req.body.referentId,
            tel: req.body.tel,
            mail: req.body.mail,
            prospect: req.body.prospect
        }
    );

    console.log(client);

    client.save((err)=> {
        if(err) {
            console.log('[LOG] Client creation faioure, see logs for more infos.');
            console.log(err);
        }  else {
            console.log('[LOG] Client created.');
            console.log(client);
        }

        res.send(client);
    })
};