var express         = require("express"),
    router          = express.Router(),
    Campground      = require("../models/campground"),
    middlewareObj   = require("../middleware/index")

router.get("/", function(req,res){
    console.log(req.user);
    //retrive campgrounds from mongodb.
    Campground.find().exec(function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            console.log("All campgrounds !");
            res.render("campgrounds/index", {campgrounds : campgrounds});
        }
    });
});

router.post("/", middlewareObj.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    Campground.create({name:name, image: image, description:description}, function(err, campground){
        if(err){
            console.log(err);
        }else{
            campground.author.id        = req.user._id;
            campground.author.username  = req.user.username;
            campground.save();
            console.log("New campground is added");
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", middlewareObj.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id",function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("campgrounds/show", {foundCampground:foundCampground});
        }
    });
});

// edit the campground
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req,res){
    var id = req.params.id;
    console.log("edit is executed");
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("campgrounds/edit", {foundCampground:foundCampground});
        }
    });
})

// update the campground
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req,res){
    var id = req.params.id;
    Campground.findByIdAndUpdate(id,req.body.campground,function(err,updatedCampground){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+id);
        }
    })
})

// delete the campground
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req,res){
    var id = req.params.id;
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/campgrounds/");
    })
})




module.exports = router;