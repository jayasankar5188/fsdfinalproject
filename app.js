const express= require('express');

//Database Models
const Signupdata = require('./src/model/Signupdata');
const Moviedata = require('./src/model/Moviedata');


const cors = require('cors');
const jwt = require('jsonwebtoken');
var bodyparser= require('body-parser');

var app = new express();
app.use(cors());
app.use(bodyparser.json());

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split('')[1]
    if(token == 'null'){
        return res.status(401).send('Unauthorised Request')

    }
    let payload = jwt.verify(token,'secretKey');
    console.log(payload);
    if(!payload){
        return res.status(401).send('Unauthorised Request');
    }
    req.userId = payload.subject
    next()

}

//Performing Signup data insertion into db
app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // console.log(req.body);
    var user = {
        name : req.body.user.name,
        email : req.body.user.email,
        password: req.body.user.password
    }
    var user1 = new Signupdata(user);
    user1.save();
});

//Performing Movie info insertion into db

app.post('/addmovie',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // console.log(req.body);
    var user = {
        movieName : req.body.user.movieName,
        directorName : req.body.user.directorName,
        producerName: req.body.user.producerName,
        movieRating: req.body.user.movieRating,
        movieGenre: req.body.user.movieGenre,
        mainCast1: req.body.user.mainCast1,
        mainCast2: req.body.user.mainCast2,
        movieReview: req.body.user.movieReview,
        moviePlot: req.body.user.moviePlot,
        imageUrl: req.body.user.imageUrl
    }
    var user1 = new Moviedata(user);
    user1.save();
});


//Retreiving Movie Data for Movie Tile Page
app.get('/showmovie/:genre',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    movieGenre = req.params.genre;
    Moviedata.find({'movieGenre': movieGenre}).
    then(function(movies){
        
        res.send(movies);
    })
    
});

//Retrieving Movie Detail
app.get('/detail/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    Movieid = req.params.id;
    Moviedata.find({'_id': Movieid}).
    then(function(movies){
        
        res.send(movies);
    })
    
});


//Login Authentication

app.post('/login',function(req,res){
    let userData =  req.body;
   

    var email = userData.email;
    var password = userData.password;
    Signupdata.find({'email': email, 'password':password}).
    then(function(user){
        
        if(user[0] == undefined){
           
            res.status(401).send('Invalid Email Id or Password'); 
        }
        else{
            let payload = {subject:email+password};
            let token = jwt.sign(payload,'secretKey');
            
            res.status(200).send({token}); 
        }
        // if(email != user[0].email){
        //     res.status(401).send('Invalid Email Id');
        // }
        // else{
        //     if(password != user[0].password){
        //         res.status(401).send('Invalid Password');
        //     }
        //     else{
                
        //     }
        // }
    })
    
});

    




app.listen(3000,function(){
    console.log('Listening to port 3000');
})