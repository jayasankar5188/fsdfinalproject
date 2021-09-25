const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Cinefacts');
const Schema = mongoose.Schema;

var MovieSchema = new Schema({
    
    movieName: String,
    producerName: String,
    directorName: String,
    movieGenre: String,
    mainCast1: String,
    mainCast2: String,
    movieRating: String,
    movieReview: String,
    moviePlot: String,
    imageUrl: String

});
var Moviedata = mongoose.model('moviedetail', MovieSchema);
module.exports = Moviedata;
