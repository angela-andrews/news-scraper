var mongoose = require("mongoose");

// Schema contstructor to variable
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  body: String
});

//create model from new schema
var Note = mongoose.model("Note", NoteSchema);

// Export the model
module.exports = Note;
