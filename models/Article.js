var mongoose = require("mongoose")

// Schema contstructor to variable
var Schema = mongoose.Schema;
//create schema
var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    }, 
    link: {
        type:String,
        required: true
    }, 
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }

});
//create model from new schema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;