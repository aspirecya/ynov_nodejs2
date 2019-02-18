const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let noteSchema =  new Schema ({
    noteName : String,
    note : String
});

// export schema to mongodb database
module.exports = mongoose.model('Note', noteSchema);