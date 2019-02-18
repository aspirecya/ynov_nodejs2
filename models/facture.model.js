const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let factureSchema =  new Schema ({
    factNum : String,
    factName : String,
    factPresta : String,
    factHeure : String,
    factCout : String,
    factTVA : String,
    totalHT : String,
    totalTTC : String
});

// export schema to mongodb database
module.exports = mongoose.model('Facture', factureSchema);