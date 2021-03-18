const { response } = require('express')
const express=require('express')
const app=express()
const request=require('request')
const dotenv=require('dotenv')
dotenv.config()
//Express is used for routing..

app.set('view engine','ejs')
app.use('/public',express.static('public'))

app.get('/',(req,res)=>{
    res.render('startup')
})

app.get('/result',(req,res)=>{
    //res.render(`You are viewing of some student with roll no ${req.query.MovieName}`)
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.Moviename}`
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            res.render("result",{moviesDump:data})
            //res.send(data)
        }
        else{
            res.send('something is wrong.')
        }
    })
})
app.get('/result/:id',(req,res)=>{
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            if(data.Response==='False'){
                res.send('error')
            }
            else{
                res.render("Info",{movie:data})
            }
            
            //res.send(data)
        }
        else{
            res.send('something is wrong.')
        }
    })
})

app.get('*',(req,res)=>{
    res.send('404 not found')
})

app.listen(3000,()=>{
    console.log('Server has started!')
})

