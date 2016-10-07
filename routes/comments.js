var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    Campground      = require("../models/campground"),
    Comment         = require("../models/comment"),
    middlewareObj   = require("../middleware/index")

router.post("/comments",middlewareObj.isLoggedIn, function(req, res){
    var id = req.params.id;
    Campground.findById(id).exec(function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            Comment.create(req.body.comment, function(err,newComment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }else{
                    newComment.author.id        =req.user._id;
                    newComment.author.username  =req.user.username;
                    newComment.save();
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/"+foundCampground._id+"/");
                }
            });
        }
    });
});


router.get("/comments/new",middlewareObj.isLoggedIn,function(req, res) {

    var id = req.params.id;
    Campground.findById(id).exec(function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("./comments/new", {foundCampground:foundCampground});
        }
    });
});

// edit the comment
router.get("/comments/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req,res){
    var campground_id = req.params.id;
    var comment_id = req.params.comment_id;
    Comment.findById(comment_id).exec(function(err, foundComment) {
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            
            res.render("./comments/edit", {campground_id:req.params.id, foundComment:foundComment});
        }
    })
})

// update the comment
router.put("/comments/:comment_id", middlewareObj.checkCommentOwnership, function(req,res){
    var comment_id = req.params.comment_id;
    var id = req.params.id;
    Comment.findByIdAndUpdate(comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success","Successfully edited the comment");
            res.redirect("/campgrounds/"+id);
        }
    })
})

// delete the comment
router.delete("/comments/:comment_id", middlewareObj.checkCommentOwnership, function(req,res){
    var comment_id = req.params.comment_id;
    Comment.findByIdAndRemove(comment_id, function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Successfully delete the comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})




module.exports = router;