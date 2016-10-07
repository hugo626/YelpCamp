var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user")

var data = [{
                name: "Lake 1",
                image: "http://www.photosforclass.com/download/8139023736",
                description:"beautiful lake. NO.6 七天长假，约女神出去玩，女神给我秒回了一只鸽子和一个温度计图片。嗯，鸽子代表和平，温度计是说我们今后的日子温馨。没错，段友们，祝福我吧，看来哥的春天要来了！NO.7 一天爸爸语重心长的对我说：儿子，你能来到这个世上多亏了你王叔啊！ 我心里一惊，难道我是王叔的儿子。 这时爸爸继续说到：当年我和你王叔出去旅游，被人绑架，说要割掉我们其中一个的蛋蛋才能放我们走，你想你王叔那个暴脾气能受得了吗，当时就一拍桌子说到：格老子的……",
                comments:[]
    
            },{
                name: "华山",
                image: "http://www.photosforclass.com/download/11478373965",
                description:"我的家乡. NO.6 七天长假，约女神出去玩，女神给我秒回了一只鸽子和一个温度计图片。嗯，鸽子代表和平，温度计是说我们今后的日子温馨。没错，段友们，祝福我吧，看来哥的春天要来了！NO.7 一天爸爸语重心长的对我说：儿子，你能来到这个世上多亏了你王叔啊！ 我心里一惊，难道我是王叔的儿子。 这时爸爸继续说到：当年我和你王叔出去旅游，被人绑架，说要割掉我们其中一个的蛋蛋才能放我们走，你想你王叔那个暴脾气能受得了吗，当时就一拍桌子说到：格老子的……",
                comments:[]
    
            },{
                name: "Wu yi shan",
                image: "https://farm8.staticflickr.com/7456/14184767395_91ab8ae82e.jpg",
                description:"Love it. NO.6 七天长假，约女神出去玩，女神给我秒回了一只鸽子和一个温度计图片。嗯，鸽子代表和平，温度计是说我们今后的日子温馨。没错，段友们，祝福我吧，看来哥的春天要来了！NO.7 一天爸爸语重心长的对我说：儿子，你能来到这个世上多亏了你王叔啊！ 我心里一惊，难道我是王叔的儿子。 这时爸爸继续说到：当年我和你王叔出去旅游，被人绑架，说要割掉我们其中一个的蛋蛋才能放我们走，你想你王叔那个暴脾气能受得了吗，当时就一拍桌子说到：格老子的……",
                comments:[]
    
            }];


function seedDB(){
    //
    User.remove({}, function(err){
        if(err){
           console.log(err); 
        }else{
            console.log("Users were removed.");
            // remove all comments
            Comment.remove({},function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Comments were removed.");
                    // remove all campgrounds
                    Campground.remove({},function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Campgrounds were removed.");
                            // add a few campgrounds;
                            // data.forEach(function (seed) {
                            //     Campground.create(seed, function(err, campground){
                            //         if(err){
                            //             console.log(err);
                            //         }else{
                            //             console.log("test campground saved");
                            //             Comment.create({
                            //                 author  :"madmoon",
                            //                 body    :"This is a good place, but the price is to high.",
                            //             }, function(err, comment){
                            //                 if(err){
                            //                     console.log(err);
                            //                 }else{
                            //                     campground.comments.push(comment);
                            //                     campground.save();
                            //                 }
                            //             });
                            //         }
                            //     });
                            // })
                        }
                    });
                }
            })
        }
        
    })
    
    
    
    // add a few comments;
    
}

module.exports = seedDB;