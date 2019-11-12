const express = require('express');

const router = express.Router();

const Post = require('../models/Post');
const crypto = require('crypto');
const multer = require('multer');
const mime = require('mime');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
      });
    }
  });
const upload = multer({
  storage: storage
}); 


router.post('/',upload.single('fileselect[]'), async (req,res)=>{
    console.log("in post");
    try{
        res.redirect('/');
       
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:postId', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }

})

router.delete('/:postId', async (req, res)=>{
    try{
        const removePost = await Post.remove({_id:req.params.postId});
        res.json(removePost);
    }catch(err){
        res.json({message: err});
    }
});

router.patch('/:postId', async (req, res)=>{
    try{
        const updatePost = await Post.updateOne(
            {_id: req.params.postId},
            {$set:{title: req.body.title}});
            res.json(updatePost);
    }catch(err){
        res.json({message: err});
    }
})
module.exports = router;