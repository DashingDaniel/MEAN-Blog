const express = require('express');
const connection = require('../database/dataBaseConfig');
const router =  express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+file.originalname)
    }
})
const fileFilter = function(req,res,callback){
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'){
        callback(null, true);
    }else{
        callback(null,false);
    }
}
const upload = multer({ storage: storage, limits:{
    fileSize: 1024*1024*5,
    fileFilter: fileFilter
}});

router.post('/addNewPost',upload.single('post_image'),(req,res)=>{

    // console.log('http://localhost:3000/',req.file);
    
    // console.log('http://localhost:3000/'+req.file.path.slice(7));
    let newPost = {
        post_title: req.body.post_title,
        post_description: req.body.post_description,
        post_content: req.body.post_content,
        post_image: 'http://localhost:3000/'+req.file.path.slice(7)
    }
    connection.query('INSERT INTO post_details SET ?',newPost,function(err,result){
        if(err) throw err;
     })
     res.json({msg: 'New Post Added'});

});

router.get('/getAllPosts',(req,res)=>{
    connection.query('SELECT * from post_details', function(err, result){
        if (err) throw err;
        res.json(result);
    })
});

router.get('/getPostById/:post_id',(req,res)=>{
    console.log(req.params.post_id);
    connection.query('SELECT * FROM post_details where post_id ='+req.params.post_id, function(err, result){
        if(err) throw err;
        // console.log(result);
        res.json(result);
    })
});

router.post('/updatePost/:post_id',(req,res)=>{
    console.log(req.body.post_id);
    const updated = {
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        post_description: req.body.post_description
    }
    connection.query(`UPDATE post_details SET post_title = '${updated.post_title}', post_content = '${updated.post_content}',post_description = '${updated.post_description}' where post_id = ${req.params.post_id}`, function(err, result){
        if(err) throw err;
    })

    res.json({msg: "Post updated successfully"});
})

router.get('/toggleDelete/:post_id',(req,res)=>{
    connection.query('update post_details set isDeleted = !isDeleted where post_id ='+req.params.post_id,function(err, result){
        if(err) throw err;
    })

    res.json({msg:"result updated"})
})

module.exports = router;