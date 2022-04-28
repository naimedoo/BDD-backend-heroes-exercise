const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const morgan =require('morgan');
const {HeroesModel} = require("./models/Heroes");

app.use(cors());
app.use(express.json());
app.use(morgan());
 
app.listen(port, ()=> {
    console.log('App is listening on:', port)
});

app.get('/heroes',(req,res,next) => {
    HeroesModel.find({})
    .exec()
    .then(heroe => {
        res.json(heroe)
    })
}); 
app.get('/heroes/:slug',(req,res,next) => {
    let slug = req.params.slug
    // console.log(slug)
    HeroesModel.findOne({slug})
    .exec()
    .then(heroes => {
       res.json(heroes)
   })
});
app.get("/heroes/:slug/power",(req,res,next)=> {
    let slug = req.params.slug;
    // console.log(power)
    HeroesModel.findOne({slug})
    .exec()
    .then(heroes => {
        res.json(heroes.power)
    })
});
app.post('/heroes/',(req,res,next) => {
  console.log('POST /heroes')
  const body = req.body 
  console.log(body)
  const newHeroes = new HeroesModel(body)
  console.log(newHeroes)
  newHeroes.save((err, heroe)=> {
      if (err){
          const response = res.json({
            success: false,
            data: err
          })
          return response
      }
      res.json({
          success: true,
          data: heroe
        })

  })
 
});

app.put('heroes/:slug/powers',(req,res,next) => {
    const result = req.params.slug;
    console.log(result)
    const newPower = new HeroesModel(body);
    console.log(newPower)
    
 
})