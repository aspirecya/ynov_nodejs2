const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let clientSchema =  new Schema ({
    nom : Number,
    adresse : String,
    cp : String,
    ville : Number,
    referentId : Number,
    tel : Number,
    mail : String,
    prospect : Boolean
});

//export schema to mongodb database
module.exports = mongoose.model('Client', clientSchema);