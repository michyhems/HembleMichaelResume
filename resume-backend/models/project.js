const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    repo: String,
    description: [String],
    thumbnail: String,
    readmeHtml: String,
    lastUpdated: Date,
});
module.exports = mongoose.model("Model", projectSchema);
