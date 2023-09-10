const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Blog = require('../models/Blog');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallblogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addblog', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag,urltoimage } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const savedblog = await Blog.create({
                title:req.body.title,
                description:req.body.description,
                tag:req.body.tag,
                urltoimage:req.body.urltoimage
            })

            res.json(savedblog)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const { title, description, tag,urltoimage } = req.body;
    try {
        // Create a newNote object
        const newBlog = {};
        if (title) { newBlog.title = title };
        if (description) { newBlog.description = description };
        if (tag) { newBlog.tag = tag };
        if(urltoimage){newBlog.urltoimage=urltoimage}

        // Find the note to be updated and update it
        let blog = await Blog.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        
        blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true })
        res.json({ blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteblog/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let blog = await Blog.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        
        

        blog = await Blog.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", blog: blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

models = ["Blog","Event"]
model_constants = {}
for(x in models)
{
    model_constants[x] = require('../models/'+x);
}
for(x in models)
{

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchall'+x+'s', async (req, res) => {
    try {
        const m = await model_constants[x].find();
        res.json(m)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/update'+x+'/:id', fetchuser, async (req, res) => {
    
    try {
        // Find the note to be updated and update it
        let m = await model_constants[x].findById(req.params.id);
        if (!m) { return res.status(404).send("Not Found") }
        m_ = await model_constants[x].findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.json({ blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

    // ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/delete'+x+'/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let m = await model_constants[x].findById(req.params.id);
        if (!m) { return res.status(404).send("Not Found") }

        m = await model_constants[x].findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", x: m });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


}



module.exports = router