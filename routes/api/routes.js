const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

//GET route
api.get('/notes', (req, res) => {
  //read stored notes
  fs.readFile('./db/db.json', 'utf8', (err, data) =>{
    //send the stored data as an array as a response
    res.json(JSON.parse(data));
    if(err) throw err;
  })
});

//POST route
api.post('/notes', (req, res) => {
  //read stored notes
  fs.readFile('./db/db.json', 'utf8', (err, data) =>{
    //create a temporary array from the stored data
    const tempData = JSON.parse(data);
    //push a new object to the array created with the POST requests title, text, and randomly created ID
    tempData.push({
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    });
    //write the temporary array to storage
    fs.writeFile('./db/db.json', JSON.stringify(tempData), (err) =>{
      if(err) throw err;
      res.json(req.body);
    });
  })
});

//DELETE route
api.delete('/notes/:id', (req, res) => {
  //read stored notes 
  fs.readFile('./db/db.json', 'utf8', (err, data) =>{
    //parse stored notes to create an array
    const tempData = JSON.parse(data);
    //create a filtered array from the stored data, looping through and adding each object that does NOT match the passed
    //id parameter from the route
    const filterData = tempData.filter(note => note.id != req.params.id)
    //write the filtered array back to storage
    fs.writeFile('./db/db.json', JSON.stringify(filterData), (err) =>{
      if(err) throw err;
      res.json(req.body);
    });
  })
});

module.exports = api;