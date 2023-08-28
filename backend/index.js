var express = require('express');
var router = express.Router();
var Users = require('./user');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    console.log('jwt verification');
    const token = req.headers.authorization; // Extract the token from the header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.secret_key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded._id; // Attach the _id to the request object
        next(); // Move to the next middleware
    });
};

router.post('/', async function (req, res, next) {
	console.log("login");
    const data = await Users.findOne({ username: req.body.username });

    if (data) {
        bcrypt.compare(req.body.password, data.password, function (err, result) {
            if (result === true) {
                const token=jwt.sign({_id:data.username},process.env.secret_key);
                res.cookie("jwt",token);
                res.status(200).send({token, "success": "You are logged in now."})
            } else {
                res.status(401).send({ "success": "Wrong password!" });
            }
        });
    } else {
        res.status(404).send({ "success": "This Email Is not registered!" });
    }
});

router.post('/reg', async function(req, res, next) {
    console.log('register');
	var personInfo = req.body;

	if(!personInfo.email || !personInfo.username || !personInfo.password){
		res.send();
	} else {
			const data = await Users.findOne({username:personInfo.username});
            if(!data){
					
                const hashedPassword = await bcrypt.hash(personInfo.password, 10);

                    var newPerson = new Users({
                        email:personInfo.email,
                        username: personInfo.username,
                        password: hashedPassword,
                        notes : []
                    });

                    const xyz = await newPerson.save();

                res.status(200).send({"Success":"You are regestered,You can login now."});
            }else{
                res.status(409).send({"Success":"username is already used."});
            }
    }
});

router.get('/getnotes', verifyToken ,async function(req, res, next) {

    const username = req.userId;
    const data = await Users.findOne({ username : username });

    res.status(200).send({ notes : data.notes});
});

router.post('/addnewnote', verifyToken ,async function(req, res, next) {
    console.log('addnewnote')
    try {
        const data = req.body;
        const username = req.userId;
    
        const note = {
            id : uuidv4(),
            title : data.title,
            catagory : data.catagory,
            datetime : new Date().toLocaleDateString(),
            content : data.content
        };
    
        await Users.updateOne({
            username : username,
        },
        {
            $push : {
                notes : note
            }
        });
    
        res.status(200).send({success : "note addes successfully"});
    }
    catch(err) {
        console.log(err);
        res.status(500).send({success : "error"});
    }
});

router.post('/modifynote', verifyToken ,async function(req, res, next) {
    console.log('modify note');
    
    try {
        
        const data = req.body;
        const username = req.userId;
        const noteId = data.noteId;
        const newTitle = data.title;
        const newContent = data.content;
        const catagory = data.catagory;

        await Users.updateOne(
            {
                username: username,
                'notes.id': noteId
            },
            {
                $set: {
                    'notes.$.title': newTitle,
                    'notes.$.content': newContent,
                    'notes.$.catagory': catagory
                }
            });
    
        res.status(200).send({success : "note modified successfully"});
    }
    catch(err) {
        console.log(err);
        res.status(500).send({success : "error"});
    }
});

router.post('/deletenote', verifyToken ,async function(req, res, next) {
    console.log('deletenote');
    try {
        const noteId = req.body.noteId;
        const username = req.userId;

        await Users.updateOne(
            { username: username },
            { $pull: { notes: { id: noteId } } });

        res.status(200).send({success : "note deleted successfully"});
    }
    catch(err) {
        console.log(err);
        res.status(500).send({success : "error"});
    }
});

router.post('/deleteuser', verifyToken ,async (req, res) => {
    console.log('deleteuser');
    try {
        const username = req.userId;
        await Users.deleteOne({ username: username });
        res.send({success : "success user deleted"});
    }
    catch {
        console.log(err);
        res.status(500).send({success : "error"});
    }
});

module.exports = router;



