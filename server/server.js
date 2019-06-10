// const { Router } = require('express');
const shortId = require('shortid');
const posts = require('./data/posts');
// const router = Router();
const url = `http://localhost:8080`;
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var cors = require('cors')
const card = require('./models/card');
const mongoose = require('mongoose');
const password = encodeURIComponent("DmitryGoronkov")
mongoose.connect(`mongodb+srv://DmitryGoronkov:${password}@cluster0-nss4b.mongodb.net/test?retryWrites=true&w=majority`,  { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static('assets'));

const getAllPosts = async (req, res) => {
    const cards = await card.find();
    res.json(cards);
}
const createNewPost = async (req, res) => {
    const newCard = req.body;
    const newCardWId = await card.create(newCard);
    
    
    res.json(newCardWId);
}

app.get('/', getAllPosts);
app.post('/', createNewPost)

app.post('/upload', function(req, res) {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    console.log(req.files.file);
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`./assets/${sampleFile.name}`, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});