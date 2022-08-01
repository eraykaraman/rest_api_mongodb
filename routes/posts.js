const router = require("express").Router();
const User = require("..//models/User");
const Post = require("..//models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
    const checkUser = await User.findOne({username: req.body.username})
    if(checkUser){
        try {
            const savedPost = await  newPost.save()
            res.status(201).json(savedPost)
    
      } catch (error) {
        res.status(500).json(error);
      }
    }
    else{
        res.status(404).json('Username not exist.')

    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        
            if(post.username === req.body.username){
                try {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new: true})
                    res.status(200).json(updatedPost)
                } catch (error) {
                    res.status(500).json(error)
                }
            }
            else{
                res.status(401).json('You can update only your post')
            }
        
    } catch (error) {
        res.status(500).json(error);

    }

});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
         if(post){
            if(post.username === req.body.username){
                try {
                    await Post.findByIdAndRemove(req.params.id)
                    res.status(200).json('Post deleted')
                } catch (error) {
                    res.status(500).json(error)
                }
            }
            else{
                res.status(401).json('You can delete only your post')
            }
         }
         else{
            res.status(404).json('Post not found')
         }
        
    } catch (error) {
        res.status(500).json(error);

    }



});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json('Post not found')
        }

    } catch (error) {
        res.status(500).json(error);

    }

});


//GET ALLPOSTS
router.get("/", async (req, res) => {
    const username = req.query.username
    const catName = req.query.catName

    try {
       let posts;
       if(username){
        posts = await Post.find({username: username})
       }
       else if(catName){
        catName = await Post.find({categories : {
            $in:[catName]
        }
    })}
        else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
       }

    catch (error) {
        res.status(500).json(error);

    }

});
module.exports = router;
