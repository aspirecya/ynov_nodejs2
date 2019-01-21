const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let factureSchema =  new Schema ({
    factNum : Number,
    totalTTC : String
});

// export schema to mongodb database
module.exports = mongoose.model('Facture', factureSchema);