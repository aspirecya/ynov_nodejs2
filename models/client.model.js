const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let clientSchema =  new Schema ({
    nom : String,
    adresse : String,
    cp : String,
    ville : String,
    referent : String,
    tel : String,
    mail : String,
    prospect : String
});

//export schema to mongodb database
module.exports = mongoose.model('Client', clientSchema);