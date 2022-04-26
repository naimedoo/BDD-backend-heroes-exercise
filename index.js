const express = require('express');
const app = express();
const port = 3004;
const cors = require('cors');
const morgan =require('morgan');
app.use('cors');
app.use(express.json())
app.use(morgan('combined'))
 
app.listen(port,()=> {
    console.log('App is listening on:', port)
})

app.get('/',function(req,res,next){
    res.send('hello')
})