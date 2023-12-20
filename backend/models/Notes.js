const mongoose = require('mongoose');


const NotesSchema = new Schema({
    
    titel: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    }
    
  });

  module.exports = mongoose.model('notes', NotesSchema);