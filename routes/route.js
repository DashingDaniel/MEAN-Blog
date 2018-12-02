const express = require('express');
const connection = require('../database/dataBaseConfig');
const router =  express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const saltRounds = 10;
const checkAuth = require('../config/authConfig');
// Storage config for images using multer starts here
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

// end of multer Config
// Routes for crud operations
// Add also with image that is being configured with multer, Multer works with form data and not the format that is associated with body-parser

router.post('/addNewPost',upload.single('post_image'),checkAuth,(req,res)=>{

    // console.log('http://localhost:3000/',req.file);
    
    // console.log('http://localhost:3000/'+req.file.path.slice(7));
    console.log(req.user);
    let newPost = {
        post_title: req.body.post_title,
        post_description: req.body.post_description,
        post_content: req.body.post_content,
        post_image: 'http://localhost:3000/'+req.file.path.slice(7),
        user_id: req.user.user_id
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
});


router.get('/searchLikeTitle/:search_term',(req,res)=>{
    connection.query(`SELECT * from post_details where post_title like '%${req.params.search_term}%'`, function(err, result){
        if(err) throw err;
        if(result.length){
            res.json(result);
        }else{
            res.json({msg: "No records found"});
        }
    })
});

router.post('/register',(req,res)=>{
    bcrypt.hash(req.body.user_password, saltRounds, function(err, hash) {
    let newUser = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: hash,
        user_phone: req.body.user_phone,
        user_gender: req.body.user_gender
    }
    connection.query('INSERT IGNORE INTO user_details SET ? ', newUser,function (err,result){
        if(err) throw err;
        res.json({msg: 'User added successfully'});
    })
    })
});

router.post('/login',(req,res)=>{
    let query = `select * from user_details where user_email = '${req.body.user_email}'`;
        connection.query(query,(err, result)=>{
            // res.json(result);
            // console.log(result[0].password);
            bcrypt.compare(req.body.user_password, result[0].user_password, function(err, response) {
                // res == true
                if(response){
                    const token = jwt.sign({
                        user_email: result[0].user_email,
                        user_id: result[0].user_id
                    },
                    keys.jwtSecret,{
                        expiresIn: '1h'
                    })
                    res.json({msg: 'Successfull', token: token})
                }else{
                    res.json({msg: 'Check your credentials'})
                }
                
            })
        })
});

router.get('/getUserPosts',checkAuth,(req,res)=>{
    let query = `SELECT * FROM post_details where user_id = ${req.user.user_id}`;
    connection.query(query,(err,result)=>{
        res.json(result);
    })
});

router.post('/addNewComment/:post_id',upload.any(),checkAuth,(req,res)=>{
    const newComment = {
        post_id: req.params.post_id,
        comment_data: req.body.comment_data,
        user_id: req.user.user_id
    }
    console.log(req.body.comment_data);
    console.log(newComment);
    
    // res.send(newComment)
    connection.query( 'INSERT INTO comment_details SET ?',newComment, function(err, result){
        if(err) throw err;
        res.json({msg: "Comment added successfully"})
    })
});

router.get('/getPostComments/:post_id',(req,res)=>{
    let query = `SELECT * from comment_details join user_details where comment_details.post_id = ${req.params.post_id} AND comment_details.user_id = user_details.user_id
    `;
    connection.query(query,(err, results)=>{
        if (err) throw err;
        res.json(results)
    })
});

router.get('/getUserComments',checkAuth,(req,res)=>{
    let query = `SELECT * from comment_details join post_details where comment_details.user_id = ${req.user.user_id} and comment_details.post_id = post_details.post_id`;
    connection.query(query,(err, results)=>{
        if(err) throw err;
        res.json(results);
    })
})

router.post('/updateComment/:comment_id', upload.any(),(req,res)=>{
    console.log(req.body.comment_data);
    let query = `UPDATE comment_details SET comment_data = '${req.body.comment_data}' where comment_id = ${req.params.comment_id}`;
    connection.query(query, (err,result)=>{
        if(err) throw err;
    })
    res.json({msg: "Comment updated successfully"})
})

router.get('/toggleDeleteComment/:comment_id',(req,res)=>{
    connection.query('update comment_details set isDeleted = !isDeleted where comment_id ='+req.params.comment_id,function(err, result){
        if(err) throw err;
    })

    res.json({msg:"result updated"})
});

module.exports = router;