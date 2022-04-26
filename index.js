const express = require('express');
const app = express();
const port = 3004;
const cors = require('cors');
const morgan =require('morgan');
const {heroesModel} = require("./models/Heroes")

app.use(cors());
app.use(express.json())
app.use(morgan('combined'))
 
app.listen(port,()=> {
    console.log('App is listening on:', port)
})

app.get('/heroes/',(req,res,next) => {
    heroesModel.find({}).exec().then(heroe => {
        res.json(heroe)
    })
}) 
app.get('/heroes/:slug',(req,res,next) => {
    let slug = req.params.slug
    console.log(slug)
    heroesModel.findOne({slug}).exec().then(heroes => {
       res.json(heroes)
   })
})
app.get("/heroes/:slug/power",(req,res,next)=> {
    let slug = req.params.slug;
    // console.log(power)
    heroesModel.findOne({slug}).exec().then(heroes => {
        res.json(heroes.power)
    })
})
app.post('/heroes',(req,res,next) => {
  const body = req.body
  console.log(body)
  const newHeroes = new heroesModel(body)
  newHeroes.save().then(heroes => {
      res.json(heroes)
  }).catch(err => {
      res.status(500).send(err)
  })
})
