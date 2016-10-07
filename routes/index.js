var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    User        = require("../models/user"),
    passport    = require("passport")


router.get("/",function (req,res) {
    res.render("landing");
    // console.log();
    // res.redirect("/campgrounds");
});


router.get("/login", function(req, res) {
    req.flash("success","You are logged in.");
    res.render("login");
});

    
router.post("/login", function(req, res, next) {
     passport.authenticate("local",function(err,user,info){
         if(err) {
             return next(err)
         }
         if(!user) {
             req.flash("error",info.message);
             return res.redirect("/login");
         }
         req.login(user, function(err){
             if(err){
                 return next(err);
             }
             req.flash("success","Welcome back "+user.username);
             return res.redirect("/campgrounds")
         });
     })(req,res,next);
});

router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged you out");
    res.redirect('/campgrounds');
});

router.get("/register",function(req, res) {
    res.render("register");
});

router.post("/register",function(req, res) {
    User.register(new User({username:req.body.username}),req.body.password, function(err,user){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to YelpCamp "+user.username);
            res.redirect("/campgrounds");
        });
        
    })
});

module.exports = router;