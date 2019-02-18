const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let referentSchema =  new Schema ({
    nom : String,
    prenom : String,
    poste : String
});

// export schema to mongodb database
module.exports = mongoose.model('Referent', referentSchema);