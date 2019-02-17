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
            console.log('[LOG] Client creation failure, see logs for more infos.');
            console.log(err);
        }  else {
            console.log('[LOG] Client created.');
            console.log(client);
        }

        res.send(client);
    })
};

exports.getClient = (req,res) => {
    Client.find((err, client)=> {
      if (err){
        console.log(err);
      }
      res.send(client);
    })
  }

  exports.updateClient = (req,res) => {
    Client.findByIdAndUpdate(req.params.id,req.body, function(err, client){
      if(err){
        console.log(err);
      }
      else {
        res.send(client);
      }
    })
  }

  exports.deleteClient = (req,res) => {
    Client.findOneAndDelete({ _id : req.params.id }, (err, client) => {
      if(err) {
        console.log(err);
      } else { 
        console.log("CLIENT DELETE SUCCESSFUL");
        res.redirect('/api/client');
      }
    })
  }

