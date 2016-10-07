var express                 = require("express"),
    passport                = require("passport"),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    flash                   = require("connect-flash"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    expressSession          = require("express-session"),
    User                    = require("./models/user"),
    app                     = express(),
    seedDB                  = require("./seed")
    
var indexRoutes         = require("./routes/index"),
    campgroundsRoutes   = require("./routes/campgrounds"),
    commentsRoutes      = require("./routes/comments")
    
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://yelpcamp_admin:admin@ds053146.mlab.com:53146/yelpcamp_db");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

// authentication 
app.use(expressSession({secret: "do your best.", resave:false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware let each html page is able to read user.
app.use(function(req,res,next){
    res.locals.currentUser      = req.user;
    res.locals.error_message    = req.flash("error");
    res.locals.success_message  = req.flash("success");
    next();
});

// set up routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id", commentsRoutes);

// clear the db.
// seedDB();

// start serverr
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("YelpCamp server is running...");
});
